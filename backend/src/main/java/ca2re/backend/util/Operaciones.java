package ca2re.backend.util;

public class Operaciones {
	public static boolean elValorEstaEnElRango(int limiteInferior, int limiteSuperior, int valorAComparar) {
		if(valorAComparar >= limiteInferior && valorAComparar <= limiteSuperior) {
			return true;
		}
		return false;
	}
}
