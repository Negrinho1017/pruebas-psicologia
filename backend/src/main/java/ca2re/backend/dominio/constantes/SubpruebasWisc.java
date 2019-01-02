package ca2re.backend.dominio.constantes;

public enum SubpruebasWisc {
	DISENO_DE_CUBOS(1), SEMEJANZAS(2), RETENCION_DE_DIGITOS(3), CONCEPTOS_CON_DIBUJOS(4), CLAVES(5),
	VOCABULARIO(6), SUCESION_NUMEROS_LETRAS(7), MATRICES(8), COMPRENSION(9),
	BUSQUEDA_SIMBOLOS(10), FIGURAS_INCOMPLETAS(11), REGISTROS(12), INFORMACION(13),
	ARITMETICA(14), PISTAS(15);
	private Integer value;

	SubpruebasWisc(Integer a) {
		this.value = a;
	}

	public Integer getValue() {
		return value;
	}
}
