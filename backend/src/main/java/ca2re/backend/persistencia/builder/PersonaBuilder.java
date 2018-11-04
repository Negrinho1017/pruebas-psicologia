package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.Persona;
import ca2re.backend.persistencia.mongo.entidades.EntidadPersona;

public class PersonaBuilder {
	public static EntidadPersona convertirAEntidad(Persona persona) {
		EntidadPersona entidadPersona = new EntidadPersona();
		entidadPersona.setFechaDeNacimiento(persona.getFechaDeNacimiento());
		entidadPersona.setId(persona.getId());
		entidadPersona.setNombreCompleto(persona.getNombreCompleto());
		return entidadPersona;
	}
	
	public static Persona convertirADominio(EntidadPersona entidadPersona) {
		Persona persona = new Persona();
		persona.setFechaDeNacimiento(entidadPersona.getFechaDeNacimiento());
		persona.setId(entidadPersona.getId());
		persona.setNombreCompleto(entidadPersona.getNombreCompleto());
		return persona;
	}
}
