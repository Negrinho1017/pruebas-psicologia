package ca2re.backend.dominio.constantes;

public enum IdsRangoEdad {
	EDADES_16_17(1), EDADES_18_19(2), EDADES_20_24(3), EDADES_25_29(4), EDADES_30_34(5), EDADES_35_44(6),
	EDADES_45_54(7), EDADES_55_64(8), EDADES_65_69(9), EDADES_70_74(10), EDADES_75_79(11),EDADES_80_84(12),
	EDADES_85_89(13), EDADES_POR_DEFECTO(14);
	private Integer value;

	IdsRangoEdad(Integer a) {
		this.value = a;
	}

	public Integer getValue() {
		return value;
	}
}	
