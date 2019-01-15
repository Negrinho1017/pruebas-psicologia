package ca2re.backend.servicio;

import org.springframework.beans.factory.annotation.Autowired;

import ca2re.backend.persistencia.CalificacionWISCDAO;
import ca2re.backend.util.CalculadoraDePuntuaciones;

public class AdministradorPruebasWISC {
	
	@Autowired
	private CalificacionWISCDAO calificacionWISCDAO;
	
	public int obtenerPuntuacionEscalarDisenioCubos(String idEdad, int puntuacionNatural) {
		String[] rangosDisenioCubos = calificacionWISCDAO.obtenerDisenioDeCubosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosDisenioCubos, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarSemejanzas(String idEdad, int puntuacionNatural) {
		String[] rangosSemejanzas = calificacionWISCDAO.obtenerSemejanzasPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosSemejanzas, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarRetencionDigitos(String idEdad, int puntuacionNatural) {
		String[] rangosDigitos = calificacionWISCDAO.obtenerRetencionDigitosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosDigitos, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarConceptosConDibujos(String idEdad, int puntuacionNatural) {
		String[] rangosConceptosConDibujos = calificacionWISCDAO.obtenerConceptosConDibujosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosConceptosConDibujos, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarClaves(String idEdad, int puntuacionNatural) {
		String[] rangosClaves = calificacionWISCDAO.obtenerClavesPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosClaves, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarVocabulario(String idEdad, int puntuacionNatural) {
		String[] rangosVocabulario = calificacionWISCDAO.obtenerVocabularioPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosVocabulario, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarNumerosLetras(String idEdad, int puntuacionNatural) {
		String[] rangosNumerosLetras = calificacionWISCDAO.obtenerNumerosLetrasPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosNumerosLetras, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarMatrices(String idEdad, int puntuacionNatural) {
		String[] rangosMatrices = calificacionWISCDAO.obtenerMatricesPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosMatrices, puntuacionNatural);
	}
}
