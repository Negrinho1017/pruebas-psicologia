package ca2re.backend.dominio.constantes;

public enum RetencionDeDigitos {
	RDD(1), RDI(2), RDS(3);
	private Integer value;

	RetencionDeDigitos(Integer a) {
		this.value = a;
	}

	public Integer getValue() {
		return value;
	}
}
