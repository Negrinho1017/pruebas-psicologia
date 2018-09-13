package ca2re.backend.persistencia.entidad;

public class ReactivoEntidad {
	private int puntuacion;
	private String respuesta;
	
	public ReactivoEntidad() {}
	public ReactivoEntidad(int puntuacion, String respuesta) {
		super();
		this.puntuacion = puntuacion;
		this.respuesta = respuesta;
	}

	public int getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}

	public String getRespuesta() {
		return respuesta;
	}

	public void setRespuesta(String respuesta) {
		this.respuesta = respuesta;
	}
}
