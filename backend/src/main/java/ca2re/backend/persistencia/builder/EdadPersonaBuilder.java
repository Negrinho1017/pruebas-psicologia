package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.persistencia.mongo.entidades.EntidadEdadPersona;

public class EdadPersonaBuilder {
	public static EntidadEdadPersona convertirAEntidad(EdadPersona edadPersona) {
		EntidadEdadPersona entidadEdadPersona = new EntidadEdadPersona();
		entidadEdadPersona.setAnios(edadPersona.getAnios());
		entidadEdadPersona.setDias(edadPersona.getDias());
		entidadEdadPersona.setMeses(edadPersona.getMeses());
		return entidadEdadPersona;
	}
	
	public static EdadPersona convertirADominio(EntidadEdadPersona entidadEdadPersona) {
		EdadPersona edadPersona = new EdadPersona();
		edadPersona.setAnios(entidadEdadPersona.getAnios());
		edadPersona.setDias(entidadEdadPersona.getDias());
		edadPersona.setMeses(entidadEdadPersona.getMeses());
		return edadPersona;
	}
}
