package ca2re.backend.persistencia.builder;

import java.util.ArrayList;
import java.util.List;

import ca2re.backend.dominio.Reactivo;
import ca2re.backend.persistencia.mongo.entidades.EntidadReactivo;

public class ReactivoBuilder {

	public static EntidadReactivo convertirAEntidad(Reactivo reactivo) {
		EntidadReactivo entidad = new EntidadReactivo();
		entidad.setPuntuacion(reactivo.getPuntuacion());
		entidad.setRespuesta(reactivo.getRespuesta());
		return entidad;
	}
	
	public static Reactivo convertirADominio(EntidadReactivo entidad) {
		Reactivo reactivo = new Reactivo();
		reactivo.setPuntuacion(entidad.getPuntuacion());
		reactivo.setRespuesta(entidad.getRespuesta());
		return reactivo;
	}
	
	public static List<EntidadReactivo> convertirListaAEntidadReactivo(List<Reactivo> reactivos){
		List<EntidadReactivo> entidades = new ArrayList<>();
		for (Reactivo reactivo : reactivos) {
			entidades.add(reactivo != null ? convertirAEntidad(reactivo) : null);
		}
		return entidades;
	}
	
	public static List<Reactivo> convertirAListaReactivo(List<EntidadReactivo> entidades){
		List<Reactivo> reactivos = new ArrayList<>();
		for (EntidadReactivo entidadReactivo : entidades) {
			reactivos.add(entidadReactivo != null ? convertirADominio(entidadReactivo) : null);
		}
		return reactivos;
	}
}
