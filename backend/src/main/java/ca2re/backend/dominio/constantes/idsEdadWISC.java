package ca2re.backend.dominio.constantes;

public enum idsEdadWISC {
	EDADES_6_1("6:0-6:3"), EDADES_6_2("6:4-6:7"), EDADES_6_3("6:8-6:11"),
	EDADES_7_1("7:0-7:3"), EDADES_7_2("7:4-7:7"), EDADES_7_3("7:8-7:11"),
	EDADES_8_1("8:0-8:3"), EDADES_8_2("8:4-8:7"), EDADES_8_3("8:8-8:11"),
	EDADES_9_1("9:0-9:3"), EDADES_9_2("9:4-9:7"), EDADES_9_3("9:8-9:11"),
	EDADES_10_1("10:0-10:3"), EDADES_10_2("10:4-10:7"), EDADES_10_3("10:8-10:11"),
	EDADES_11_1("11:0-11:3"), EDADES_11_2("11:4-11:7"), EDADES_11_3("11:8-11:11"),
	EDADES_12_1("12:0-12:3"), EDADES_12_2("12:4-12:7"), EDADES_12_3("12:8-12:11"),
	EDADES_13_1("13:0-13:3"), EDADES_13_2("13:4-13:7"), EDADES_13_3("13:8-13:11"),
	EDADES_14_1("14:0-14:3"), EDADES_14_2("14:4-14:7"), EDADES_14_3("14:8-14:11"),
	EDADES_15_1("15:0-15:3"), EDADES_15_2("15:4-15:7"), EDADES_15_3("15:8-15:11"),
	EDADES_16_1("16:0-16:3"), EDADES_16_2("16:4-16:7"), EDADES_16_3("16:8-16:11");
	private String value;

	idsEdadWISC(String a) {
		this.value = a;
	}

	public String getValue() {
		return value;
	}
}
