package ca2re.backend.util;

import java.util.List;

import ca2re.backend.dominio.Subprueba;

public class Operaciones {
	public static boolean elValorEstaEnElRango(int limiteInferior, int limiteSuperior, int valorAComparar) {
		if(valorAComparar >= limiteInferior && valorAComparar <= limiteSuperior) {
			return true;
		}
		return false;
	}
	
	public static boolean sonLas10SubpruebasPrincipales(List<Subprueba> subpruebas) {
		for(Subprueba subprueba: subpruebas) {
			if(subprueba.getNumeroSubprueba()>10) {
				return false;
			}
		}
		return true;
	}
}
