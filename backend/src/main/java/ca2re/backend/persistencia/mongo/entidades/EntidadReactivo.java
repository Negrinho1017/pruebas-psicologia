package ca2re.backend.persistencia.mongo.entidades;

public class EntidadReactivo {
	private int puntuacion;
	private String respuesta;

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
