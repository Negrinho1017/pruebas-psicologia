package ca2re.backend.dominio.constantes;

public enum IdsEdad {
	EDADES_16_17("16:0-17:11"), EDADES_18_19("18:0-19:11"), EDADES_20_24("20:0-24:11"), EDADES_25_34("25:0-34:11"),
	EDADES_35_44("35:0-44:11"), EDADES_45_54("45:0-54:11"), EDADES_55_69("55:0-69:11"), EDADES_70_79("70:0-79:11"),
	EDADES_80_84("80:0-84:11"), EDADES_85_89("85:0-89:11");
	private String value;

	IdsEdad(String a) {
		this.value = a;
	}

	public String getValue() {
		return value;
	}
}
