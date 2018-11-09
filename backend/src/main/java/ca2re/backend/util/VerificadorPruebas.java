package ca2re.backend.util;

import java.util.List;

import ca2re.backend.dominio.Subprueba;
import ca2re.backend.dominio.constantes.Subpruebas;

public class VerificadorPruebas {
	private static final int RETENCION_DIGITOS = 6;
	private static final int DISENO_CUBOS = 3;

	public static boolean sonLas10SubpruebasPrincipales(List<Subprueba> subpruebas) {
		for(Subprueba subprueba: subpruebas) {
			if(subprueba.getNumeroSubprueba()>10) {
				return false;
			}
		}
		return true;
	}
	
	public static boolean seHizoDisenoCubos(List<Subprueba> subpruebas) {
		if(subpruebas.get(DISENO_CUBOS).getNumeroSubprueba()==Subpruebas.DISENO_DE_CUBOS.getValue()) {
			return true;
		}
		return false;
	}
	
	public static boolean seHizoRetencionDigitos(List<Subprueba> subpruebas) {
		if(subpruebas.get(RETENCION_DIGITOS).getNumeroSubprueba()==Subpruebas.RETENCION_DE_DIGITOS.getValue()) {
			return true;
		}
		return false;
	}
}
