package ca2re.backend.persistencia;

public interface CalificacionAnalisisProcesoDAO {
	public String[] obtenerDisenoCubosSinBonificacionPorTiempo(String idEdad);
	
	public String[] obtenerRDD(String idEdad);

	public String[] obtenerRDI(String idEdad);

	public String[] obtenerRDS(String idEdad);
}
