package ca2re.backend.dominio;

import java.util.List;

public class CalificadorPrueba {
	
	public Reactivo calificarReactivo(Reactivo reactivo, int puntuacion) {
		Reactivo reactivoCalificado = new Reactivo(puntuacion,reactivo.getRespuesta());
		return reactivoCalificado;
	}
	
	public Subprueba calificarSubprueba(List<Reactivo> reactivos, Subprueba subprueba){
		int puntuacionNatural = 0;
		for(Reactivo reactivo : reactivos) {
			puntuacionNatural+=reactivo.getPuntuacion();
		}
		return new Subprueba(subprueba.getNombre(), reactivos, puntuacionNatural, subprueba.getPuntuacionEscalar(),
			false);
	}
}
