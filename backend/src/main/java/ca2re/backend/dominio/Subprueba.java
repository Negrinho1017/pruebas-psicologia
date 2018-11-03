package ca2re.backend.dominio;

import java.util.List;

public class Subprueba {
	private int numeroSubprueba;
	private String nombre;
	private List<Reactivo> reactivos;
	private int puntuacionNatural;
	private int puntuacionEscalar;
	private boolean esOpcional;
	
	public Subprueba() {}
	public Subprueba(int numeroSubprueba, String nombre, List<Reactivo> reactivos, int puntuacionNatural, int puntuacionEscalar,
			boolean esOpcional) {
		super();
		this.numeroSubprueba = numeroSubprueba;
		this.nombre = nombre;
		this.reactivos = reactivos;
		this.puntuacionNatural = puntuacionNatural;
		this.puntuacionEscalar = puntuacionEscalar;
		this.esOpcional = esOpcional;
	}

	public Subprueba(int puntuacionNatural, int puntuacionEscalar) {
		super();
		this.puntuacionNatural = puntuacionNatural;
		this.puntuacionEscalar = puntuacionEscalar;
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

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Reactivo> getReactivos() {
		return reactivos;
	}

	public void setReactivos(List<Reactivo> reactivos) {
		this.reactivos = reactivos;
	}

	public boolean isEsOpcional() {
		return esOpcional;
	}

	public void setEsOpcional(boolean esOpcional) {
		this.esOpcional = esOpcional;
	}
	public int getNumeroSubprueba() {
		return numeroSubprueba;
	}
	public void setNumeroSubprueba(int numeroSubprueba) {
		this.numeroSubprueba = numeroSubprueba;
	}

}
