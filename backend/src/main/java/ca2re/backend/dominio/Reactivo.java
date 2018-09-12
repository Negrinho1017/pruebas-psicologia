package ca2re.backend.dominio;

public class Reactivo {
	private int puntuacion;
	private String respuesta;
	
	public Reactivo() {}
	public Reactivo(int puntuacion, String respuesta) {
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
