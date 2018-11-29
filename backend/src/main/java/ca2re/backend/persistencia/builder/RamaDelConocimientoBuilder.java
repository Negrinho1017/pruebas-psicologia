package ca2re.backend.persistencia.builder;

import java.util.ArrayList;
import java.util.List;

import ca2re.backend.dominio.RamaDelConocimiento;
import ca2re.backend.persistencia.mongo.entidades.EntidadRamaDelConocimiento;

public class RamaDelConocimientoBuilder {
	public static List<EntidadRamaDelConocimiento> convertirAListaEntidad(List<RamaDelConocimiento> ramaDelConocimiento) {
		List<EntidadRamaDelConocimiento> entidadRamaDelConocimiento = new ArrayList<>();
		for (RamaDelConocimiento rama : ramaDelConocimiento) {
			entidadRamaDelConocimiento.add(convertirAEntidad(rama));
		}
		return entidadRamaDelConocimiento;
	}
	
	public static List<RamaDelConocimiento> convertirAListaDominio(List<EntidadRamaDelConocimiento> entidadRamaDelConocimiento) {
		List<RamaDelConocimiento> ramaDelConocimiento = new ArrayList<>();
		for (EntidadRamaDelConocimiento rama : entidadRamaDelConocimiento) {
			ramaDelConocimiento.add(convertirADominio(rama));
		}
		return ramaDelConocimiento;
	}
	
	public static EntidadRamaDelConocimiento convertirAEntidad(RamaDelConocimiento ramaDelConocimiento) {
		EntidadRamaDelConocimiento entidadRamaDelConocimiento = new EntidadRamaDelConocimiento();
		entidadRamaDelConocimiento.setIntervaloConfianza(ramaDelConocimiento.getIntervaloConfianza());
		entidadRamaDelConocimiento.setNombre(ramaDelConocimiento.getNombre());
		entidadRamaDelConocimiento.setPuntuacionCompuesta(ramaDelConocimiento.getPuntuacionCompuesta());
		entidadRamaDelConocimiento.setPuntuacionTotal(ramaDelConocimiento.getPuntuacionTotal());
		entidadRamaDelConocimiento.setRangoPercentil(ramaDelConocimiento.getRangoPercentil());
		entidadRamaDelConocimiento.setSubpruebas( ramaDelConocimiento.getSubpruebas() != null ?
				SubpruebaBuilder.convertirAListaEntidad(ramaDelConocimiento.getSubpruebas()) : new ArrayList<>());
		return entidadRamaDelConocimiento;
	}
	
	public static RamaDelConocimiento convertirADominio(EntidadRamaDelConocimiento entidadRamaDelConocimiento) {
		RamaDelConocimiento ramaDelConocimiento = new RamaDelConocimiento();
		ramaDelConocimiento.setIntervaloConfianza(entidadRamaDelConocimiento.getIntervaloConfianza());
		ramaDelConocimiento.setNombre(entidadRamaDelConocimiento.getNombre());
		ramaDelConocimiento.setPuntuacionCompuesta(entidadRamaDelConocimiento.getPuntuacionCompuesta());
		ramaDelConocimiento.setPuntuacionTotal(entidadRamaDelConocimiento.getPuntuacionTotal());
		ramaDelConocimiento.setRangoPercentil(entidadRamaDelConocimiento.getRangoPercentil());
		ramaDelConocimiento.setSubpruebas(
				SubpruebaBuilder.convertirAListaDominio(entidadRamaDelConocimiento.getSubpruebas()));
		return ramaDelConocimiento;
	}
}
