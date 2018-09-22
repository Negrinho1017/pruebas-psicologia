package ca2re.backend.dominio;

import java.util.List;

public class RamaDelConocimiento {
	private String nombre;
	private List<Subprueba> subpruebas;
	private int puntuacionTotal;
	private int puntuacionCompuesta;
	private double rangoPercentil;
	private String intervaloConfianza;

	public RamaDelConocimiento(String nombre, List<Subprueba> subpruebas, int puntuacionTotal, int puntuacionCompuesta,
			double rangoPercentil, String intervaloConfianza) {
		super();
		this.nombre = nombre;
		this.subpruebas = subpruebas;
		this.puntuacionTotal = puntuacionTotal;
		this.puntuacionCompuesta = puntuacionCompuesta;
		this.rangoPercentil = rangoPercentil;
		this.intervaloConfianza = intervaloConfianza;
	}

	public RamaDelConocimiento() {}
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Subprueba> getSubpruebas() {
		return subpruebas;
	}

	public void setSubpruebas(List<Subprueba> subpruebas) {
		this.subpruebas = subpruebas;
	}

	public int getPuntuacionTotal() {
		return puntuacionTotal;
	}

	public void setPuntuacionTotal(int puntuacion) {
		this.puntuacionTotal = puntuacion;
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
