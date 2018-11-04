package ca2re.backend.persistencia.mongo.entidades;

import java.util.List;

public class EntidadRamaDelConocimiento {
	private String nombre;
	private List<EntidadSubprueba> subpruebas;
	private int puntuacionTotal;
	private int puntuacionCompuesta;
	private double rangoPercentil;
	private String intervaloConfianza;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<EntidadSubprueba> getSubpruebas() {
		return subpruebas;
	}

	public void setSubpruebas(List<EntidadSubprueba> subpruebas) {
		this.subpruebas = subpruebas;
	}

	public int getPuntuacionTotal() {
		return puntuacionTotal;
	}

	public void setPuntuacionTotal(int puntuacionTotal) {
		this.puntuacionTotal = puntuacionTotal;
	}

	public int getPuntuacionCompuesta() {
		return puntuacionCompuesta;
	}

	public void setPuntuacionCompuesta(int puntuacionCompuesta) {
		this.puntuacionCompuesta = puntuacionCompuesta;
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
