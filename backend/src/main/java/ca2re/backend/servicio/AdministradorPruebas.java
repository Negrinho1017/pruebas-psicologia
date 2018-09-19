package ca2re.backend.servicio;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import ca2re.backend.controller.MainController;
import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.RamaDelConocimiento;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.dominio.constantes.RamasDelConocimiento;
import ca2re.backend.dominio.constantes.Subpruebas;
import ca2re.backend.persistencia.CalificacionWaisDAO;
import ca2re.backend.persistencia.PruebaWaisDAO;
import ca2re.backend.util.CalculadorDePuntuacionEscalar;

public class AdministradorPruebas {
	
	@Autowired
	private CalificacionWaisDAO calificacionWaisDAO;
	
	@Autowired
	private PruebaWaisDAO pruebaWaisDAO;
	
	public Prueba ingresarSubprueba(Subprueba subprueba, String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		List<RamaDelConocimiento> ramasDelConocimiento = prueba.getRamaDelConocimiento();
		int ramaDelConocimiento = buscarRamaDelConocimiento(subprueba.getNumeroSubprueba());
		if(ramasDelConocimiento.get(ramaDelConocimiento).getSubpruebas()==null) {
			ramasDelConocimiento.get(ramaDelConocimiento).setSubpruebas(
					new ArrayList<Subprueba>());
			ramasDelConocimiento.get(ramaDelConocimiento).setPuntuacion(0);
		}
		List<Subprueba> subpruebas = ramasDelConocimiento.get(ramaDelConocimiento).getSubpruebas();
		subpruebas.add(subprueba);
		ramasDelConocimiento.get(ramaDelConocimiento).setSubpruebas(subpruebas);
		ramasDelConocimiento.get(ramaDelConocimiento).setPuntuacion(
				ramasDelConocimiento.get(ramaDelConocimiento).getPuntuacion()+subprueba.getPuntuacionEscalar());
		System.out.println(ramasDelConocimiento.get(ramaDelConocimiento).getPuntuacion());
		prueba.setRamaDelConocimiento(ramasDelConocimiento);
		return prueba;
	}
	
	public int buscarRamaDelConocimiento(int numeroSubprueba) {
		if(esSubpruebaDeComprensionVerbal(numeroSubprueba)) {
			return RamasDelConocimiento.COMPRENSION_VERBAL.getValue();
		}else if(esSubpruebaDeRazonamientoPerceptual(numeroSubprueba)){
			return RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue();
		}else if(esSubpruebaDeMemoriaDeTrabajo(numeroSubprueba)) {
			return RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue();
		} else {
			return RamasDelConocimiento.VELOCIDAD_DE_PROCESAMIENTO.getValue();
		}
	}

	private boolean esSubpruebaDeMemoriaDeTrabajo(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.RETENCION_DE_DIGITOS.getValue() 
				|| numeroSubprueba == Subpruebas.ARITMETICA.getValue() ||
				numeroSubprueba == Subpruebas.SUCESION_NUMEROS_LETRAS.getValue();
	}

	private boolean esSubpruebaDeRazonamientoPerceptual(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.DISENO_DE_CUBOS.getValue() ||
				numeroSubprueba == Subpruebas.MATRICES.getValue() || numeroSubprueba == Subpruebas.ROMPECABEZAS_VISUAL.getValue()
				|| numeroSubprueba == Subpruebas.PESO_FIGURADO.getValue() || numeroSubprueba == Subpruebas.FIGURAS_INCOMPLETAS.getValue();
	}

	private boolean esSubpruebaDeComprensionVerbal(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.SEMEJANZAS.getValue() || numeroSubprueba == Subpruebas.VOCABULARIO.getValue()
				|| numeroSubprueba == Subpruebas.INFORMACION.getValue() || numeroSubprueba == Subpruebas.COMPRENSION.getValue();
	}
	
	public int obtenerPuntuacionEscalarDisenioCubos(String idEdad, int puntuacionNatural) {
		String[] rangosDisenioCubos =  calificacionWaisDAO.obtenerDisenioDeCubosPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosDisenioCubos, puntuacionNatural);		
	}
	
	public int obtenerPuntuacionEscalarSemejanzas(String idEdad, int puntuacionNatural) {
		String[] rangosSemejanzas =  calificacionWaisDAO.obtenerSemejanzasPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosSemejanzas, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarRetencionDigitos(String idEdad, int puntuacionNatural) {
		String[] rangosRetencionDigitos =  calificacionWaisDAO.obtenerRetencionDigitosPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosRetencionDigitos, puntuacionNatural);		
	}
	
	public int obtenerPuntuacionEscalarMatrices(String idEdad, int puntuacionNatural) {
		String[] rangosMatrices =  calificacionWaisDAO.obtenerMatricesPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosMatrices, puntuacionNatural);		
	}
	
	public int obtenerPuntuacionEscalarVocabulario(String idEdad, int puntuacionNatural) {
		String[] rangosVocabulario =  calificacionWaisDAO.obtenerVocabularioPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosVocabulario, puntuacionNatural);		
	}
	
	public int obtenerPuntuacionEscalarAritmetica(String idEdad, int puntuacionNatural) {
		String[] rangosAritmetica =  calificacionWaisDAO.obtenerAritmeticaPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosAritmetica, puntuacionNatural);		
	}
	
	public int obtenerPuntuacionEscalarBusquedaSimbolos(String idEdad, int puntuacionNatural) {
		String[] rangosBusquedaSimbolos =  calificacionWaisDAO.obtenerBusquedaDeSimbolosPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosBusquedaSimbolos, puntuacionNatural);		
	}
	
	public int obtenerPuntuacionEscalarRompecabezasVisual(String idEdad, int puntuacionNatural) {
		String[] rangosRompecabezasVisual =  calificacionWaisDAO.obtenerRompecabezasVisualPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosRompecabezasVisual, puntuacionNatural);		
	}
	
	public int obtenerPuntuacionEscalarInformacion(String idEdad, int puntuacionNatural) {
		String[] rangosInformacion =  calificacionWaisDAO.obtenerInformacionPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosInformacion, puntuacionNatural);		
	}
	
	public int obtenerPuntuacionEscalarClaves(String idEdad, int puntuacionNatural) {
		String[] rangosClaves =  calificacionWaisDAO.obtenerClavesPorIdEdad(idEdad);
		return CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangosClaves, puntuacionNatural);		
	}
}
