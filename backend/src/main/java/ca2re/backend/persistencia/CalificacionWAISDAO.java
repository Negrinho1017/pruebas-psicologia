package ca2re.backend.persistencia;

import ca2re.backend.dominio.ValorCriticoWAIS;

public interface CalificacionWAISDAO {
	String[] obtenerDisenioDeCubosPorIdEdad(String idEdad);

	String[] obtenerSemejanzasPorIdEdad(String idEdad);

	String[] obtenerRetencionDigitosPorIdEdad(String idEdad);

	String[] obtenerMatricesPorIdEdad(String idEdad);

	String[] obtenerVocabularioPorIdEdad(String idEdad);

	String[] obtenerAritmeticaPorIdEdad(String idEdad);

	String[] obtenerBusquedaDeSimbolosPorIdEdad(String idEdad);

	String[] obtenerRompecabezasVisualPorIdEdad(String idEdad);

	String[] obtenerInformacionPorIdEdad(String idEdad);

	String[] obtenerClavesPorIdEdad(String idEdad);
	
	String[] obtenerNumerosLetrasPorIdEdad(String idEdad);

	int[] obtenerPuntuacionCompuesta(String idIndice);

	double[] obtenerPercentil(String idIndice);

	String[] obtenerIntervaloDeConfianza(String idIndice);
	
	ValorCriticoWAIS obtenerValoresCriticos(int idRangoEdad);
}
