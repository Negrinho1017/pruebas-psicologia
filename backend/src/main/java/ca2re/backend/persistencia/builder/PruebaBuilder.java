package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.Prueba;
import ca2re.backend.persistencia.mongo.entidades.EntidadPrueba;

public class PruebaBuilder {
	public static EntidadPrueba convertirAEntidad(Prueba prueba) {
		EntidadPrueba entidadPrueba = new EntidadPrueba();
		entidadPrueba.setEdadEvaluado(EdadPersonaBuilder.convertirAEntidad(prueba.getEdadEvaluado()));
		entidadPrueba.setEvaluado(PersonaBuilder.convertirAEntidad(prueba.getEvaluado()));
		entidadPrueba.setFechaEvaluacion(prueba.getFechaEvaluacion());
		entidadPrueba.setNombreExaminador(prueba.getNombreExaminador());
		entidadPrueba.setRamaDelConocimiento(RamaDelConocimientoBuilder.convertirAListaEntidad(prueba.getRamaDelConocimiento()));
		entidadPrueba.setTipoPrueba(prueba.getTipoPrueba());
		return entidadPrueba;
	}
	
	public static Prueba convertirADominio(EntidadPrueba entidadPrueba) {
		Prueba prueba = new Prueba();
		prueba.setEdadEvaluado(EdadPersonaBuilder.convertirADominio(entidadPrueba.getEdadEvaluado()));
		prueba.setEvaluado(PersonaBuilder.convertirADominio(entidadPrueba.getEvaluado()));
		prueba.setFechaEvaluacion(entidadPrueba.getFechaEvaluacion());
		prueba.setNombreExaminador(entidadPrueba.getNombreExaminador());
		prueba.setRamaDelConocimiento(RamaDelConocimientoBuilder.convertirAListaDominio(entidadPrueba.getRamaDelConocimiento()));
		prueba.setTipoPrueba(entidadPrueba.getTipoPrueba());
		return prueba;
	}
}
