package ca2re.backend.dominio.constantes;

public enum IdsRangoEdad {
	EDADES_16_17(1), EDADES_18_19(2), EDADES_20_24(3), EDADES_25_34(4), EDADES_35_44(5), EDADES_45_54(6),
	EDADES_55_69(7), EDADES_70_79(8), EDADES_80_84(9), EDADES_85_89(10), EDADES_POR_DEFECTO(11);
	private Integer value;

	IdsRangoEdad(Integer a) {
		this.value = a;
	}

	public Integer getValue() {
		return value;
	}
}	
