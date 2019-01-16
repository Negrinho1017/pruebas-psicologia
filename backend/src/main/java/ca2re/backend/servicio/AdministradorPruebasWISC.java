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
	
	public int obtenerPuntuacionEscalarComprension(String idEdad, int puntuacionNatural) {
		String[] rangosComprension = calificacionWISCDAO.obtenerComprensionPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosComprension, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarBusquedaSimbolos(String idEdad, int puntuacionNatural) {
		String[] rangosBusquedaSimbolos = calificacionWISCDAO.obtenerBusquedaSimbolosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosBusquedaSimbolos, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarFigurasIncompletas(String idEdad, int puntuacionNatural) {
		String[] rangosFigurasIncompletas = calificacionWISCDAO.obtenerFigurasIncompletasPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosFigurasIncompletas, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarRegistros(String idEdad, int puntuacionNatural) {
		String[] rangosRegistros = calificacionWISCDAO.obtenerRegistrosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosRegistros, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarInformacion(String idEdad, int puntuacionNatural) {
		String[] rangosInformacion = calificacionWISCDAO.obtenerInformacionPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosInformacion, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarAritmetica(String idEdad, int puntuacionNatural) {
		String[] rangosAritmetica = calificacionWISCDAO.obtenerAritmeticaPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosAritmetica, puntuacionNatural);
	}
	
	public int obtenerPuntuacionEscalarPistas(String idEdad, int puntuacionNatural) {
		String[] rangosPistas = calificacionWISCDAO.obtenerPistasPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosPistas, puntuacionNatural);
	}
}
