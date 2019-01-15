package ca2re.backend.persistencia;

public interface CalificacionWISCDAO {
	String[] obtenerDisenioDeCubosPorIdEdad(String idEdad);

	String[] obtenerSemejanzasPorIdEdad(String idEdad);

	String[] obtenerRetencionDigitosPorIdEdad(String idEdad);

	String[] obtenerConceptosConDibujosPorIdEdad(String idEdad);

	String[] obtenerClavesPorIdEdad(String idEdad);

	String[] obtenerVocabularioPorIdEdad(String idEdad);

	String[] obtenerNumerosLetrasPorIdEdad(String idEdad);

	String[] obtenerMatricesPorIdEdad(String idEdad);

	String[] obtenerComprensionPorIdEdad(String idEdad);

	String[] obtenerBusquedaSimbolosPorIdEdad(String idEdad);
	
	String[] obtenerFigurasIncompletasPorIdEdad(String idEdad);
	
	String[] obtenerRegistrosPorIdEdad(String idEdad);
	
	String[] obtenerInformacionPorIdEdad(String idEdad);
	
	String[] obtenerAritmeticaPorIdEdad(String idEdad);
	
	String[] obtenerPistasPorIdEdad(String idEdad);
}
