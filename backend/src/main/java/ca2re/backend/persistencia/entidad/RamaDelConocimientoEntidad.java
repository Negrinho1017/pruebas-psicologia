package ca2re.backend.persistencia.entidad;

import java.util.List;

import ca2re.backend.dominio.Subprueba;

public class RamaDelConocimientoEntidad {
	private String nombre;
	private List<Subprueba> subpruebas;
	private int puntuacionTotal;
	private int puntuacionCompuesta;
	private int rangoPercentil;
	private String intervaloConfianza;

	public RamaDelConocimientoEntidad(String nombre, List<Subprueba> subpruebas, int puntuacionTotal, int puntuacionCompuesta,
			int rangoPercentil, String intervaloConfianza) {
		super();
		this.nombre = nombre;
		this.subpruebas = subpruebas;
		this.puntuacionTotal = puntuacionTotal;
		this.puntuacionCompuesta = puntuacionCompuesta;
		this.rangoPercentil = rangoPercentil;
		this.intervaloConfianza = intervaloConfianza;
	}

	public RamaDelConocimientoEntidad() {}
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

	public int getPuntuacion() {
		return puntuacionTotal;
	}

	public void setPuntuacion(int puntuacion) {
		this.puntuacionTotal = puntuacion;
	}

	public int getPuntuacionCompuesta() {
		return puntuacionCompuesta;
	}

	public void setPuntuacionCompuesta(int puntuacionCompuesta) {
		this.puntuacionCompuesta = puntuacionCompuesta;
	}

	public int getRangoPercentil() {
		return rangoPercentil;
	}

	public void setRangoPercentil(int rangoPercentil) {
		this.rangoPercentil = rangoPercentil;
	}

	public String getIntervaloConfianza() {
		return intervaloConfianza;
	}

	public void setIntervaloConfianza(String intervaloConfianza) {
		this.intervaloConfianza = intervaloConfianza;
	}
}
