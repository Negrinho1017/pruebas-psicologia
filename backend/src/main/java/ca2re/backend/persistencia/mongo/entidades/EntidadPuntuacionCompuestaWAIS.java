package ca2re.backend.persistencia.mongo.entidades;

public class EntidadPuntuacionCompuestaWAIS {
	private String idIndice;
	private int[] puntuacionCompuesta;
	private double[] percentil;
	private String[] intervaloConfianza;

	public String getIdIndice() {
		return idIndice;
	}

	public void setIdIndice(String idIndice) {
		this.idIndice = idIndice;
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
