package ca2re.backend.servicio;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;

import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.RamaDelConocimiento;
import ca2re.backend.dominio.Reactivo;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.dominio.ValorCriticoWAIS;
import ca2re.backend.dominio.constantes.RamasDelConocimiento;
import ca2re.backend.dominio.constantes.RetencionDeDigitos;
import ca2re.backend.dominio.constantes.Subpruebas;
import ca2re.backend.dominio.excepciones.PruebasPsicologiaException;
import ca2re.backend.persistencia.CalificacionPuntuacionCompuestaDAO;
import ca2re.backend.persistencia.mongo.CalificacionPuntuacionCompuestaMongoDAO;
import ca2re.backend.persistencia.mongo.CalificacionWaisMongoDAO;
import ca2re.backend.persistencia.mongo.PruebaWaisMongoDAO;
import ca2re.backend.util.CalculadoraDePuntuaciones;
import ca2re.backend.util.EdadUtil;
import ca2re.backend.util.Operaciones;
import ca2re.backend.util.VerificadorPruebas;

public class AdministradorPruebas {

	private static final int PUNTUACION_MAXIMA_CLAVES = 135;

	private static final int PUNTUACION_MAXIMA_BUSQUEDA_SIMBOLOS = 60;

	@Autowired
	private CalificacionWaisMongoDAO calificacionWaisDAO;
	
	@Autowired
	CalificacionPuntuacionCompuestaDAO calificacionPuntuacionCompuestaDAO;
	
	@Autowired
	private PruebaWaisMongoDAO pruebaWaisDAO;

	public Prueba ingresarSubprueba(Subprueba subprueba, String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		List<RamaDelConocimiento> ramasDelConocimiento = prueba.getRamaDelConocimiento();
		int ramaDelConocimiento = buscarRamaDelConocimiento(subprueba.getNumeroSubprueba());
		if (ramasDelConocimiento.get(ramaDelConocimiento).getSubpruebas() == null) {
			ramasDelConocimiento.get(ramaDelConocimiento).setSubpruebas(new ArrayList<Subprueba>());
			ramasDelConocimiento.get(ramaDelConocimiento).setPuntuacionTotal(0);
		}
		List<Subprueba> subpruebas = ramasDelConocimiento.get(ramaDelConocimiento).getSubpruebas();
		subpruebas.add(subprueba);
		ramasDelConocimiento.get(ramaDelConocimiento).setSubpruebas(subpruebas);
		ramasDelConocimiento.get(ramaDelConocimiento).setPuntuacionTotal(
				ramasDelConocimiento.get(ramaDelConocimiento).getPuntuacionTotal() + subprueba.getPuntuacionEscalar());
		prueba.setRamaDelConocimiento(ramasDelConocimiento);
		return prueba;
	}

	public Prueba ingresarPuntuacionCompuesta(String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		List<RamaDelConocimiento> ramasDelConocimiento = prueba.getRamaDelConocimiento();
		List<RamaDelConocimiento> ramasDelConocimientoActualizadas = new ArrayList<>();
		int contador = 0;
		for (RamaDelConocimiento ramaDelConocimiento : ramasDelConocimiento) {
			ramaDelConocimiento.setIntervaloConfianza(
					obtenerIntervaloConfianza(buscarIdIndice(contador), ramaDelConocimiento.getPuntuacionTotal()));
			ramaDelConocimiento.setRangoPercentil(
					obtenerPercentil(buscarIdIndice(contador), ramaDelConocimiento.getPuntuacionTotal()));
			ramaDelConocimiento.setPuntuacionCompuesta(
					obtenerPuntuacionCompuesta(buscarIdIndice(contador), ramaDelConocimiento.getPuntuacionTotal()));
			ramasDelConocimientoActualizadas.add(ramaDelConocimiento);
			contador++;
		}
		prueba.setRamaDelConocimiento(ramasDelConocimientoActualizadas);
		return prueba;
	}

	public String buscarIdIndice(int ramaDelConocimiento) {
		if (ramaDelConocimiento == RamasDelConocimiento.COMPRENSION_VERBAL.getValue()) {
			return "ICV";
		} else if (ramaDelConocimiento == RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue()) {
			return "IRP";
		} else if (ramaDelConocimiento == RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue()) {
			return "IMT";
		} else {
			return "IVP";
		}
	}

	public int buscarRamaDelConocimiento(int numeroSubprueba) {
		if (esSubpruebaDeComprensionVerbal(numeroSubprueba)) {
			return RamasDelConocimiento.COMPRENSION_VERBAL.getValue();
		} else if (esSubpruebaDeRazonamientoPerceptual(numeroSubprueba)) {
			return RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue();
		} else if (esSubpruebaDeMemoriaDeTrabajo(numeroSubprueba)) {
			return RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue();
		} else {
			return RamasDelConocimiento.VELOCIDAD_DE_PROCESAMIENTO.getValue();
		}
	}

	private boolean esSubpruebaDeMemoriaDeTrabajo(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.RETENCION_DE_DIGITOS.getValue()
				|| numeroSubprueba == Subpruebas.ARITMETICA.getValue()
				|| numeroSubprueba == Subpruebas.SUCESION_NUMEROS_LETRAS.getValue();
	}

	private boolean esSubpruebaDeRazonamientoPerceptual(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.DISENO_DE_CUBOS.getValue()
				|| numeroSubprueba == Subpruebas.MATRICES.getValue()
				|| numeroSubprueba == Subpruebas.ROMPECABEZAS_VISUAL.getValue()
				|| numeroSubprueba == Subpruebas.PESO_FIGURADO.getValue()
				|| numeroSubprueba == Subpruebas.FIGURAS_INCOMPLETAS.getValue();
	}

	private boolean esSubpruebaDeComprensionVerbal(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.SEMEJANZAS.getValue()
				|| numeroSubprueba == Subpruebas.VOCABULARIO.getValue()
				|| numeroSubprueba == Subpruebas.INFORMACION.getValue()
				|| numeroSubprueba == Subpruebas.COMPRENSION.getValue();
	}

	public int obtenerPuntuacionEscalarDisenioCubos(String idEdad, int puntuacionNatural) {
		String[] rangosDisenioCubos = calificacionWaisDAO.obtenerDisenioDeCubosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosDisenioCubos, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarSemejanzas(String idEdad, int puntuacionNatural) {
		String[] rangosSemejanzas = calificacionWaisDAO.obtenerSemejanzasPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosSemejanzas, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarRetencionDigitos(String idEdad, int puntuacionNatural) {
		String[] rangosRetencionDigitos = calificacionWaisDAO.obtenerRetencionDigitosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosRetencionDigitos, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarMatrices(String idEdad, int puntuacionNatural) {
		String[] rangosMatrices = calificacionWaisDAO.obtenerMatricesPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosMatrices, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarVocabulario(String idEdad, int puntuacionNatural) {
		String[] rangosVocabulario = calificacionWaisDAO.obtenerVocabularioPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosVocabulario, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarAritmetica(String idEdad, int puntuacionNatural) {
		String[] rangosAritmetica = calificacionWaisDAO.obtenerAritmeticaPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosAritmetica, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarBusquedaSimbolos(String idEdad, int puntuacionNatural) {
		if(puntuacionNatural > PUNTUACION_MAXIMA_BUSQUEDA_SIMBOLOS) {
			throw new PruebasPsicologiaException("Puntuación por fuera del rango, intente de nuevo");
		}
		String[] rangosBusquedaSimbolos = calificacionWaisDAO.obtenerBusquedaDeSimbolosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosBusquedaSimbolos, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarRompecabezasVisual(String idEdad, int puntuacionNatural) {
		String[] rangosRompecabezasVisual = calificacionWaisDAO.obtenerRompecabezasVisualPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosRompecabezasVisual, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarInformacion(String idEdad, int puntuacionNatural) {
		String[] rangosInformacion = calificacionWaisDAO.obtenerInformacionPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosInformacion, puntuacionNatural);
	}

	public int obtenerPuntuacionEscalarClaves(String idEdad, int puntuacionNatural) {
		if(puntuacionNatural > PUNTUACION_MAXIMA_CLAVES) {
			throw new PruebasPsicologiaException("Puntuación por fuera del rango, intente de nuevo");
		}
		String[] rangosClaves = calificacionWaisDAO.obtenerClavesPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosClaves, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarNumerosLetras(String idEdad, int puntuacionNatural) {		
		String[] rangosNumerosLetras = calificacionWaisDAO.obtenerNumerosLetrasPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosNumerosLetras, puntuacionNatural);
	}
	
	public int obtenerPuntuacionCompuesta(String id, int puntuacionTotal) {
		return calificacionPuntuacionCompuestaDAO.obtenerPuntuacionCompuesta(id)[puntuacionTotal];
	}

	public double obtenerPercentil(String id, int puntuacionTotal) {
		return calificacionPuntuacionCompuestaDAO.obtenerPercentil(id)[puntuacionTotal];
	}

	public String obtenerIntervaloConfianza(String id, int puntuacionTotal) {
		return calificacionPuntuacionCompuestaDAO.obtenerIntervaloDeConfianza(id)[puntuacionTotal];
	}
	
	public ValorCriticoWAIS obtenerValoresCriticos(int edad) {
		int idRangoEdad = EdadUtil.obtenerRangoEdad(edad);
		return calificacionWaisDAO.obtenerValoresCriticos(idRangoEdad);
	}
	
	public List<Subprueba> obtenerTodasLasSubpruebasPorIdentificacion(String id){
		List<Subprueba> subpruebas = new ArrayList<>();
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(id).get(0);
		subpruebas.addAll(prueba.getRamaDelConocimiento().get(RamasDelConocimiento.COMPRENSION_VERBAL.getValue())
				.getSubpruebas());
		subpruebas.addAll(prueba.getRamaDelConocimiento().get(RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue())
				.getSubpruebas());
		subpruebas.addAll(prueba.getRamaDelConocimiento().get(RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue())
				.getSubpruebas());
		subpruebas.addAll(prueba.getRamaDelConocimiento().get(RamasDelConocimiento.VELOCIDAD_DE_PROCESAMIENTO.getValue())
				.getSubpruebas());
		return subpruebas;
	}
	
	public List<Reactivo> obtenerListaReactivosPorSubprueba(int numeroSubprueba, String idEvaluado){
		return obtenerTodasLasSubpruebasPorIdentificacion(idEvaluado).get(numeroSubprueba).getReactivos();
	}
	
	public Subprueba obtenerDisenoCubosSinBonificacionDeTiempo(int numeroSubprueba, String idEvaluado) {
		List<Reactivo> reactivos = obtenerListaReactivosPorSubprueba(numeroSubprueba, idEvaluado);
		String[] puntuacionesEscalares = calificacionWaisDAO.obtenerDisenoCubosSinBonificacionPorTiempo("20:0-24:11");
		int puntuacionNatural = CalculadoraDePuntuaciones.obtenerDisenoCubosSinBonificacionTiempo(reactivos);
		int puntuacionEscalar = CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(puntuacionesEscalares, puntuacionNatural);
		return new Subprueba(puntuacionNatural,puntuacionEscalar);
	}
	
	public Subprueba obtenerRetencionDeDigitos(int numeroRetencionDigitos, int numeroSubprueba, String idEvaluado) {
		List<Reactivo> reactivos = obtenerListaReactivosPorSubprueba(numeroSubprueba, idEvaluado);
		String[] puntuacionesEscalares;
		if(numeroRetencionDigitos == RetencionDeDigitos.RDD.getValue()) {
			puntuacionesEscalares = calificacionWaisDAO.obtenerRDD("20:0-24:11");
		}else if(numeroRetencionDigitos == RetencionDeDigitos.RDI.getValue()) {
			puntuacionesEscalares = calificacionWaisDAO.obtenerRDI("20:0-24:11");
		}else {
			puntuacionesEscalares = calificacionWaisDAO.obtenerRDS("20:0-24:11");
		}
		int puntuacionNatural = CalculadoraDePuntuaciones.obtenerRetencionDeDigitos(reactivos, numeroRetencionDigitos);
		int puntuacionEscalar = CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(puntuacionesEscalares, puntuacionNatural);
		return new Subprueba(puntuacionNatural,puntuacionEscalar);
	}
	
	public boolean verificarSiSonLas10SubpruebasPrincipales(String idEvaluado) {
		List<Subprueba> subpruebas = obtenerTodasLasSubpruebasPorIdentificacion(idEvaluado);
		return VerificadorPruebas.sonLas10SubpruebasPrincipales(subpruebas);
	}
	
	public int obtenerEdadEvaluado(String idEvaluado) {
		return pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getEdadEvaluado().getAnios();
	}
	
	public boolean verificarDisenoCubosYRetencionDigitos(String idEvaluado) {
		List<Subprueba> subpruebas = obtenerTodasLasSubpruebasPorIdentificacion(idEvaluado);
		return VerificadorPruebas.seHizoDisenoCubos(subpruebas)
				&& VerificadorPruebas.seHizoRetencionDigitos(subpruebas);
	}
	
	public Prueba obtenerPruebaPorIdEvaluado(String idEvaluado) {
		if(pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).size()==0) {
			throw new PruebasPsicologiaException("Prueba no encontrada, intente de nuevo");
		}
		return pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
	}
	
	public boolean elUsuarioNoHaSidoEvaluado(String idEvaluado) {
		return (pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).size()==0)? true : false;
	}
	
	public boolean elUsuarioCumpleConLaEdad(int anios) {
		return(anios>=16)? true : false;
	}
	
	public Prueba guardarPruebaWais(Prueba prueba) {
		if(elUsuarioNoHaSidoEvaluado(prueba.getEvaluado().getId())
				&& elUsuarioCumpleConLaEdad(prueba.getEdadEvaluado().getAnios())) {
			return pruebaWaisDAO.guardarPruebaWais(prueba);
		}
		throw new PruebasPsicologiaException("El usuario ya fue evaluado o no cumple con la edad");
	}

}
