package ca2re.backend.persistencia;

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
	
	String[] obtenerPesoFiguradoPorIdEdad(String idEdad);
	
	String[] obtenerCancelacionPorIdEdad(String idEdad);
	
	String[] obtenerComprensionPorIdEdad(String idEdad);
	
	String[] obtenerFigurasIncompletasPorIdEdad(String idEdad);
}
