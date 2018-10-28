package ca2re.backend.dominio;

public class PuntuacionCompuestaWAIS {
	private String idIndice;
	private int[] puntuacionCompuesta;
	private double[] percentil;
	private String[] intervaloConfianza;
	
	public PuntuacionCompuestaWAIS() {}
	public PuntuacionCompuestaWAIS(String idIndice, int[] puntuacionCompuesta, double[] percentil,
			String[] intervaloConfianza) {
		super();
		this.idIndice = idIndice;
		this.puntuacionCompuesta = puntuacionCompuesta;
		this.percentil = percentil;
		this.intervaloConfianza = intervaloConfianza;
	}
	public String getIdIndice() {
		return idIndice;
	}
	public void setIdIndice(String id) {
		this.idIndice = id;
	}
	public int[] getPuntuacionCompuesta() {
		return puntuacionCompuesta;
	}
	public void setPuntuacionCompuesta(int[] puntuacionCompuesta) {
		this.puntuacionCompuesta = puntuacionCompuesta;
	}
	public double[] getPercentil() {
		return percentil;
	}
	public void setPercentil(double[] percentil) {
		this.percentil = percentil;
	}
	public String[] getIntervaloConfianza() {
		return intervaloConfianza;
	}
	public void setIntervaloConfianza(String[] intervaloConfianza) {
		this.intervaloConfianza = intervaloConfianza;
	}
	
}
