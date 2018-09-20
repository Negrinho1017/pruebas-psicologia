package ca2re.backend.dominio;

public class PuntuacionCompuesta {
	private int puntuacion;
	private double rangoPercentil;
	private String intervaloConfianza;
	public PuntuacionCompuesta(int puntuacion, double rangoPercentil, String intervaloConfianza) {
		super();
		this.puntuacion = puntuacion;
		this.rangoPercentil = rangoPercentil;
		this.intervaloConfianza = intervaloConfianza;
	}
	
	public int getPuntuacion() {
		return puntuacion;
	}
	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}
	public double getRangoPercentil() {
		return rangoPercentil;
	}
	public void setRangoPercentil(double rangoPercentil) {
		this.rangoPercentil = rangoPercentil;
	}
	public String getIntervaloConfianza() {
		return intervaloConfianza;
	}
	public void setIntervaloConfianza(String intervaloConfianza) {
		this.intervaloConfianza = intervaloConfianza;
	}
}
