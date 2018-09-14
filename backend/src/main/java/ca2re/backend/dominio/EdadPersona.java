package ca2re.backend.dominio;

public class EdadPersona {
	int dias;
	int meses;
	int anios;
	
	public EdadPersona() {}
	public EdadPersona(int dias, int meses, int anios) {
		super();
		this.dias = dias;
		this.meses = meses;
		this.anios = anios;
	}

	public int getDias() {
		return dias;
	}

	public void setDias(int dias) {
		this.dias = dias;
	}

	public int getMeses() {
		return meses;
	}

	public void setMeses(int meses) {
		this.meses = meses;
	}

	public int getAnios() {
		return anios;
	}

	public void setAnios(int anios) {
		this.anios = anios;
	}

}
