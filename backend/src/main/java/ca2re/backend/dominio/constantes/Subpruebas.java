package ca2re.backend.dominio.constantes;

public enum Subpruebas {
	DISENO_DE_CUBOS(1), SEMEJANZAS(2), RETENCION_DE_DIGITOS(3), MATRICES(4), VOCABULARIO(5),
	ARITMETICA(6), BUSQUEDA_DE_SIMBOLOS(7), ROMPECABEZAS_VISUAL(8), INFORMACION(9),
	CLAVES(10), SUCESION_NUMEROS_LETRAS(11), PESO_FIGURADO(12), COMPRENSION(13),
	CANCELACION(14), FIGURAS_INCOMPLETAS(15);
	private Integer value;

	Subpruebas(Integer a) {
		this.value = a;
	}

	public Integer getValue() {
		return value;
	}
}
