package ca2re.backend.dominio.constantes;

public enum TiposPrueba {
	WAIS("WAIS"), WISC("WISC");
	private String value;

	TiposPrueba(String a) {
		this.value = a;
	}

	public String getValue() {
		return value;
	}
}
