package ca2re.backend.persistencia;

public interface CalificacionPuntuacionCompuestaDAO {
	int[] obtenerPuntuacionCompuesta(String idIndice);

	double[] obtenerPercentil(String idIndice);

	String[] obtenerIntervaloDeConfianza(String idIndice);
}
