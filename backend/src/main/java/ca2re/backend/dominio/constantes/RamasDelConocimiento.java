package ca2re.backend.dominio.constantes;

public enum RamasDelConocimiento {
	COMPRENSION_VERBAL(0), RAZONAMIENTO_PERCEPTUAL(1), MEMORIA_DE_TRABAJO(2), VELOCIDAD_DE_PROCESAMIENTO(3);
	private Integer value;

	RamasDelConocimiento(Integer a) {
		this.value = a;
	}

	public Integer getValue() {
		return value;
	}
}
