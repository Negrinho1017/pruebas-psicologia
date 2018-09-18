package ca2re.backend.util;

import java.util.List;

public class CalculadorDePuntuacionEscalar {
	public static String[] crearRango(String rango){
		return rango.split("-");
	}
	
	public static boolean estaEnElRango(int puntuacionNatural, String rango) {
		String[] limites = crearRango(rango);
		int limiteInferior = Integer.parseInt(limites[0]);
		int limiteSuperior = Integer.parseInt(limites[1]);
		return (puntuacionNatural >= limiteInferior && puntuacionNatural <= limiteSuperior)? true: false;
	}
	
	public static int obtenerPuntuacionEscalar(String[] rangosSubprueba, int puntuacionNatural) {
		for(int i=0; i<rangosSubprueba.length;i++) {
			if(estaEnElRango(puntuacionNatural, rangosSubprueba[i])){
				return i+1;
			}
		}
		return 0;
	}
}
