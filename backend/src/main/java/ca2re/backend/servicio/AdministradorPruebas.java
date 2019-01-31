package ca2re.backend.servicio;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.RamaDelConocimiento;
import ca2re.backend.dominio.Reactivo;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.dominio.SubpruebasAnalisisProceso;
import ca2re.backend.dominio.ValorCritico;
import ca2re.backend.dominio.constantes.RamasDelConocimiento;
import ca2re.backend.dominio.constantes.RetencionDeDigitos;
import ca2re.backend.dominio.constantes.TiposPrueba;
import ca2re.backend.dominio.excepciones.PruebasPsicologiaException;
import ca2re.backend.persistencia.CalificacionAnalisisProcesoDAO;
import ca2re.backend.persistencia.CalificacionPuntuacionCompuestaDAO;
import ca2re.backend.persistencia.CalificacionValoresCriticosDAO;
import ca2re.backend.persistencia.CalificacionWAISDAO;
import ca2re.backend.persistencia.UsuarioDAO;
import ca2re.backend.persistencia.mongo.PruebaWaisMongoDAO;
import ca2re.backend.util.CalculadoraDePuntuaciones;
import ca2re.backend.util.EdadUtil;
import ca2re.backend.util.VerificadorPruebas;

public class AdministradorPruebas {

	private static final int PUNTUACION_MAXIMA_CLAVES = 135;

	private static final int PUNTUACION_MAXIMA_BUSQUEDA_SIMBOLOS = 60;

	private static final int RETENCION_DIGITOS = 6;
	
	private static final int DISENO_CUBOS = 3;
	
	@Autowired
	private CalificacionWAISDAO calificacionWaisDAO;
	
	@Autowired
	private CalificacionValoresCriticosDAO calificacionValoresCriticosDAO;
	
	@Autowired
	CalificacionPuntuacionCompuestaDAO calificacionPuntuacionCompuestaDAO;
	
	@Autowired
	CalificacionAnalisisProcesoDAO calificacionAnalisisProcesoDAO;
	
	@Autowired
	private PruebaWaisMongoDAO pruebaWaisDAO;
	
	@Autowired
	private UsuarioDAO usuarioDAO;

	public Prueba ingresarSubprueba(Subprueba subprueba, String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		List<RamaDelConocimiento> ramasDelConocimiento = prueba.getRamaDelConocimiento();
		int ramaDelConocimiento = obtenerRamaDelConocimiento(subprueba.getNumeroSubprueba(), prueba.getTipoPrueba());
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
	
	public int obtenerRamaDelConocimiento(int numeroSubprueba, String tipoSubprueba) {
		if(tipoSubprueba.equals(TiposPrueba.WAIS.getValue())) {
			return buscarRamaDelConocimiento(numeroSubprueba);
		}else {
			return buscarRamaDelConocimientoWisc(numeroSubprueba);
		}
	}

	public Prueba ingresarPuntuacionCompuesta(String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		String tipoPrueba = prueba.getTipoPrueba();
		List<RamaDelConocimiento> ramasDelConocimiento = prueba.getRamaDelConocimiento();
		List<RamaDelConocimiento> ramasDelConocimientoActualizadas = new ArrayList<>();
		int contador = 0;
		for (RamaDelConocimiento ramaDelConocimiento : ramasDelConocimiento) {
			ramaDelConocimiento.setIntervaloConfianza(
					obtenerIntervaloConfianza(buscarIdIndice(contador, tipoPrueba), ramaDelConocimiento.getPuntuacionTotal()));
			ramaDelConocimiento.setRangoPercentil(
					obtenerPercentil(buscarIdIndice(contador, tipoPrueba), ramaDelConocimiento.getPuntuacionTotal()));
			ramaDelConocimiento.setPuntuacionCompuesta(
					obtenerPuntuacionCompuesta(buscarIdIndice(contador, tipoPrueba), ramaDelConocimiento.getPuntuacionTotal()));
			ramasDelConocimientoActualizadas.add(ramaDelConocimiento);
			contador++;
		}
		prueba.setRamaDelConocimiento(ramasDelConocimientoActualizadas);
		return prueba;
	}

	public String buscarIdIndice(int ramaDelConocimiento, String tipoPrueba) {
		if(tipoPrueba.equals("WISC")) {
			return buscarIdIndiceWISC(ramaDelConocimiento);
		} else if (ramaDelConocimiento == RamasDelConocimiento.COMPRENSION_VERBAL.getValue()) {
			return "ICV";
		} else if (ramaDelConocimiento == RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue()) {
			return "IRP";
		} else if (ramaDelConocimiento == RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue()) {
			return "IMT";
		} else {
			return "IVP";
		}
	}
	
	public String buscarIdIndiceWISC(int ramaDelConocimiento) {
		if (ramaDelConocimiento == RamasDelConocimiento.COMPRENSION_VERBAL.getValue()) {
			return "ICV-WISC";
		} else if (ramaDelConocimiento == RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue()) {
			return "IRP-WISC";
		} else if (ramaDelConocimiento == RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue()) {
			return "IMT-WISC";
		} else {
			return "IVP-WISC";
		}
	}
	
	public int buscarRamaDelConocimientoWisc(int numeroSubprueba) {
		if (VerificadorPruebas.esSubpruebaDeComprensionVerbalWisc(numeroSubprueba)) {
			return RamasDelConocimiento.COMPRENSION_VERBAL.getValue();
		} else if (VerificadorPruebas.esSubpruebaDeRazonamientoPerceptualWisc(numeroSubprueba)) {
			return RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue();
		} else if (VerificadorPruebas.esSubpruebaDeMemoriaDeTrabajoWisc(numeroSubprueba)) {
			return RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue();
		} else {
			return RamasDelConocimiento.VELOCIDAD_DE_PROCESAMIENTO.getValue();
		}
	}

	public int buscarRamaDelConocimiento(int numeroSubprueba) {
		if (VerificadorPruebas.esSubpruebaDeComprensionVerbal(numeroSubprueba)) {
			return RamasDelConocimiento.COMPRENSION_VERBAL.getValue();
		} else if (VerificadorPruebas.esSubpruebaDeRazonamientoPerceptual(numeroSubprueba)) {
			return RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue();
		} else if (VerificadorPruebas.esSubpruebaDeMemoriaDeTrabajo(numeroSubprueba)) {
			return RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue();
		} else {
			return RamasDelConocimiento.VELOCIDAD_DE_PROCESAMIENTO.getValue();
		}
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
	
	public int obtenerPuntuacionEscalarPesoFigurado(String idEdad, int puntuacionNatural) {		
		String[] rangosPesoFigurado = calificacionWaisDAO.obtenerPesoFiguradoPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosPesoFigurado, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarComprension(String idEdad, int puntuacionNatural) {		
		String[] rangosComprension = calificacionWaisDAO.obtenerComprensionPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosComprension, puntuacionNatural);
	}
	
	public int obtenerPuntuacionCancelacion(String idEdad, int puntuacionNatural) {
		String[] rangosCancelacion = calificacionWaisDAO.obtenerCancelacionPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosCancelacion, puntuacionNatural);
	}
	
	public int obtenerPuntuacionFigurasIncompletas(String idEdad, int puntuacionNatural) {
		String[] rangosFigurasIncompletas = calificacionWaisDAO.obtenerFigurasIncompletasPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosFigurasIncompletas, puntuacionNatural);
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
	
	public ValorCritico obtenerValoresCriticos(int edad, String tipoPrueba) {
		if(tipoPrueba.equals(TiposPrueba.WAIS.getValue())) {
			int idRangoEdad = EdadUtil.obtenerRangoEdad(edad);
			return calificacionValoresCriticosDAO.obtenerValoresCriticosWAIS(idRangoEdad);
		}
		return calificacionValoresCriticosDAO.obtenerValoresCriticosWISC(edad);
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
		String tipoPrueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getTipoPrueba();
		int anios = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getEdadEvaluado().getAnios();
		int meses = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getEdadEvaluado().getMeses();
		String idEdad = tipoPrueba.equals("WAIS") ? EdadUtil.obtenerIdEdad(anios) : EdadUtil.obtenerIdEdadWISC(anios, meses);
		String[] puntuacionesEscalares = calificacionAnalisisProcesoDAO.obtenerDisenoCubosSinBonificacionPorTiempo(idEdad);
		int puntuacionNatural = CalculadoraDePuntuaciones.obtenerDisenoCubosSinBonificacionTiempo(reactivos);
		int puntuacionEscalar = CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(puntuacionesEscalares, puntuacionNatural);
		return new Subprueba(puntuacionNatural,puntuacionEscalar);
	}
	
	public Subprueba obtenerRetencionDeDigitos(int numeroRetencionDigitos, int numeroSubprueba, String idEvaluado) {
		List<Reactivo> reactivos = obtenerListaReactivosPorSubprueba(numeroSubprueba, idEvaluado);
		String[] puntuacionesEscalares;
		String tipoPrueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getTipoPrueba();
		int anios = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getEdadEvaluado().getAnios();
		int meses = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getEdadEvaluado().getMeses();
		String idEdad = tipoPrueba.equals("WAIS") ? EdadUtil.obtenerIdEdad(anios) : EdadUtil.obtenerIdEdadWISC(anios, meses);
		if(numeroRetencionDigitos == RetencionDeDigitos.RDD.getValue()) {
			puntuacionesEscalares = calificacionAnalisisProcesoDAO.obtenerRDD(idEdad);
		}else if(numeroRetencionDigitos == RetencionDeDigitos.RDI.getValue()) {
			puntuacionesEscalares = calificacionAnalisisProcesoDAO.obtenerRDI(idEdad);
		}else {
			puntuacionesEscalares = calificacionAnalisisProcesoDAO.obtenerRDS(idEdad);
		}
		int puntuacionNatural = CalculadoraDePuntuaciones.obtenerRetencionDeDigitos(reactivos, numeroRetencionDigitos);
		int puntuacionEscalar = CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(puntuacionesEscalares, puntuacionNatural);
		return new Subprueba(puntuacionNatural,puntuacionEscalar);
	}
	
	public Subprueba obtenerRegistros(int numeroRegistros, int numeroSubprueba, String idEvaluado) {
		List<Reactivo> reactivos = obtenerListaReactivosPorSubprueba(numeroSubprueba, idEvaluado);
		String[] puntuacionesEscalares;
		int meses = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getEdadEvaluado().getMeses();
		int anios = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0).getEdadEvaluado().getAnios();
		String idEdad = EdadUtil.obtenerIdEdadWISC(anios,meses);
		if(numeroRegistros == 1) {
			puntuacionesEscalares = calificacionAnalisisProcesoDAO.obtenerRegistrosAleatorio(idEdad);
		}else {
			puntuacionesEscalares = calificacionAnalisisProcesoDAO.obtenerRegistrosEstructurado(idEdad);
		}
		int puntuacionNatural = 0;
		int puntuacionEscalar = 0;
		if(reactivos.size()>0) {
			puntuacionNatural = numeroRegistros == 1 ? reactivos.get(0).getPuntuacion() : reactivos.get(1).getPuntuacion();
			puntuacionEscalar = CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(puntuacionesEscalares, puntuacionNatural);
		}
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
	
	public boolean elUsuarioCumpleConLaEdad(int anios, String tipoPrueba) {
		if(tipoPrueba.equals(TiposPrueba.WAIS.getValue())) {
			return(anios>=16)? true : false;
		}else if(tipoPrueba.equals(TiposPrueba.WISC.getValue())) {
			return(anios<17)? true : false;
		}
		return false;
	}
	
	public Prueba guardarPrueba(Prueba prueba) {
		if(elUsuarioNoHaSidoEvaluado(prueba.getEvaluado().getId())
				&& elUsuarioCumpleConLaEdad(prueba.getEdadEvaluado().getAnios(), prueba.getTipoPrueba())) {
			return guardarPruebaCorrespondiente(prueba);
		}
		throw new PruebasPsicologiaException("El usuario ya fue evaluado o no cumple con la edad");
	}
	
	public Prueba guardarPruebaCorrespondiente(Prueba prueba) {
		if(prueba.getTipoPrueba().equals(TiposPrueba.WAIS.getValue())) {
			return pruebaWaisDAO.guardarPruebaWais(prueba);
		}
		else if(prueba.getTipoPrueba().equals(TiposPrueba.WISC.getValue())) {
			return pruebaWaisDAO.guardarPruebaWisc(prueba);
		}
		throw new PruebasPsicologiaException("Tipo de prueba inválido");
	}
	public boolean esPermitidoElUsuario(String idUsuario) {
		if(!usuarioDAO.esPermitidoElUsuario(idUsuario)) {
			throw new PruebasPsicologiaException("Este usuario no tiene permisos, intente nuevamente");
		}
		return true;
	}
	
	public Prueba actualizarPrueba(Prueba prueba, String idEvaluado) {
		String coleccion = VerificadorPruebas.obtenerColeccionEnBD(prueba.getTipoPrueba());
		return pruebaWaisDAO.actualizarPrueba(prueba, idEvaluado, coleccion);
	}
	
	public SubpruebasAnalisisProceso obtenerSubpruebasAnalisisProceso(String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		if(prueba.getTipoPrueba().equals("WAIS")) {
			return obtenerSubpruebasAnalisisProcesoWAIS(idEvaluado);
		}else if(prueba.getTipoPrueba().equals("WISC")) {
			return obtenerSubpruebasAnalisisProcesoWISC(idEvaluado);
		}
		throw new PruebasPsicologiaException("Prueba no encontrada");
	}
	
	public SubpruebasAnalisisProceso obtenerSubpruebasAnalisisProcesoWAIS(String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		if(VerificadorPruebas.estaDisenoDeCubos(prueba) && VerificadorPruebas.estaRetencionDeDigitos(prueba)){
			Subprueba disenoCubos = prueba.getRamaDelConocimiento().get(1).getSubpruebas().get(0);
			return new SubpruebasAnalisisProceso(obtenerRetencionDeDigitos(RetencionDeDigitos.RDD.getValue(), RETENCION_DIGITOS, idEvaluado),
					obtenerRetencionDeDigitos(RetencionDeDigitos.RDI.getValue(), RETENCION_DIGITOS, idEvaluado),
					obtenerRetencionDeDigitos(RetencionDeDigitos.RDS.getValue(), RETENCION_DIGITOS, idEvaluado), 
					disenoCubos, 
					obtenerDisenoCubosSinBonificacionDeTiempo(DISENO_CUBOS, idEvaluado));
		}
		throw new PruebasPsicologiaException("No se encontraron pruebas de diseño de cubos o de retención de dígitos");
	}
	
	public SubpruebasAnalisisProceso obtenerSubpruebasAnalisisProcesoWISC(String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		int verificadorNumeroRegistros = prueba.getRamaDelConocimiento().get(RamasDelConocimiento.VELOCIDAD_DE_PROCESAMIENTO.getValue()).getSubpruebas().get(0).getNumeroSubprueba();
		if(VerificadorPruebas.estaDisenoDeCubos(prueba) && VerificadorPruebas.estaRetencionDeDigitos(prueba)){
			Subprueba disenoCubos = prueba.getRamaDelConocimiento().get(1).getSubpruebas().get(0);
			return new SubpruebasAnalisisProceso(obtenerRetencionDeDigitos(RetencionDeDigitos.RDD.getValue(), RETENCION_DIGITOS, idEvaluado),
					obtenerRetencionDeDigitos(RetencionDeDigitos.RDI.getValue(), RETENCION_DIGITOS, idEvaluado), 
					disenoCubos, 
					obtenerDisenoCubosSinBonificacionDeTiempo(DISENO_CUBOS, idEvaluado),
					obtenerRegistros(1, verificadorNumeroRegistros == 12 ? 8 : 9, idEvaluado),
					obtenerRegistros(2, verificadorNumeroRegistros == 12 ? 8 : 9, idEvaluado));
		}
		throw new PruebasPsicologiaException("No se encontraron pruebas de diseño de cubos o de retención de dígitos");
	}
	
	public Prueba eliminarPrueba(String idEvaluado) {
		return pruebaWaisDAO.eliminarPrueba(idEvaluado);
	}
	
	public List<Prueba> obtenerTodasLasPruebas(String tipoPrueba) {
		return pruebaWaisDAO.obtenerTodasLasPruebas(tipoPrueba);
	}
}
