package ca2re.backend.dominio;

import java.util.List;

public class Subprueba {
	private String nombre;
	private List<Reactivo> reactivos;
	private int puntuacionNatural;
	private int puntuacionEscalar;
	private boolean esOpcional;

	public Subprueba(String nombre, List<Reactivo> reactivos, int puntuacionNatural, int puntuacionEscalar,
			boolean esOpcional) {
		super();
		this.nombre = nombre;
		this.reactivos = reactivos;
		this.puntuacionNatural = puntuacionNatural;
		this.puntuacionEscalar = puntuacionEscalar;
		this.esOpcional = esOpcional;
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

}
