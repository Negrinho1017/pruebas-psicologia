package ca2re.backend.persistencia.mongo.entidades;

import java.util.List;

import ca2re.backend.dominio.Reactivo;

public class EntidadSubprueba {
	private int numeroSubprueba;
	private String nombre;
	private List<EntidadReactivo> reactivos;
	private int puntuacionNatural;
	private int puntuacionEscalar;
	private boolean esOpcional;

	public int getNumeroSubprueba() {
		return numeroSubprueba;
	}

	public void setNumeroSubprueba(int numeroSubprueba) {
		this.numeroSubprueba = numeroSubprueba;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<EntidadReactivo> getReactivos() {
		return reactivos;
	}

	public void setReactivos(List<EntidadReactivo> reactivos) {
		this.reactivos = reactivos;
	}

	public int getPuntuacionNatural() {
		return puntuacionNatural;
	}

	public void setPuntuacionNatural(int puntuacionNatural) {
		this.puntuacionNatural = puntuacionNatural;
	}

	public int getPuntuacionEscalar() {
		return puntuacionEscalar;
	}

	public void setPuntuacionEscalar(int puntuacionEscalar) {
		this.puntuacionEscalar = puntuacionEscalar;
	}

	public boolean isEsOpcional() {
		return esOpcional;
	}

	public void setEsOpcional(boolean esOpcional) {
		this.esOpcional = esOpcional;
	}
}
