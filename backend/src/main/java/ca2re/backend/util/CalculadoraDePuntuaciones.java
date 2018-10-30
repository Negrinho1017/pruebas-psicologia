package ca2re.backend.util;

import java.util.List;

import ca2re.backend.dominio.Reactivo;

public class CalculadoraDePuntuaciones {
	private static final int PUNTUACION_RESTO_DE_REACTIVOS = 4;
	private static final int PUNTUACION_PRIMEROS_REACTIVOS = 2;

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
	
	public static int obtenerDisenoCubosSinBonificacionTiempo(List<Reactivo> reactivos) {
		int puntuacion = 0;
		for(Reactivo reactivo : reactivos) {
			if(reactivo==null) {
				puntuacion+=PUNTUACION_PRIMEROS_REACTIVOS;
			}else if(reactivo.getPuntuacion()<=PUNTUACION_PRIMEROS_REACTIVOS) {
				puntuacion+=reactivo.getPuntuacion();
			}else if(reactivo.getPuntuacion()>=PUNTUACION_RESTO_DE_REACTIVOS) {
				puntuacion+=PUNTUACION_RESTO_DE_REACTIVOS;
			}
		}
		return puntuacion-PUNTUACION_PRIMEROS_REACTIVOS;
	}
}
