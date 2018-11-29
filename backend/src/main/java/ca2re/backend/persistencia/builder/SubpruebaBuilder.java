package ca2re.backend.persistencia.builder;

import java.util.ArrayList;
import java.util.List;

import ca2re.backend.dominio.Subprueba;
import ca2re.backend.persistencia.mongo.entidades.EntidadSubprueba;

public class SubpruebaBuilder {

	public static Subprueba convertirADominio(EntidadSubprueba entidad) {
		Subprueba subprueba = new Subprueba();
		subprueba.setEsOpcional(entidad.isEsOpcional());
		subprueba.setNombre(entidad.getNombre());
		subprueba.setNumeroSubprueba(entidad.getNumeroSubprueba());
		subprueba.setPuntuacionEscalar(entidad.getPuntuacionEscalar());
		subprueba.setPuntuacionNatural(entidad.getPuntuacionNatural());
		subprueba.setReactivos(ReactivoBuilder.convertirAListaReactivo(entidad.getReactivos()));
		return subprueba;
	}

	public static EntidadSubprueba convertirAEntidad(Subprueba subprueba) {
		EntidadSubprueba entidad = new EntidadSubprueba();
		entidad.setEsOpcional(subprueba.isEsOpcional());
		entidad.setNombre(subprueba.getNombre());
		entidad.setNumeroSubprueba(subprueba.getNumeroSubprueba());
		entidad.setPuntuacionEscalar(subprueba.getPuntuacionEscalar());
		entidad.setPuntuacionNatural(subprueba.getPuntuacionNatural());
		entidad.setReactivos(subprueba.getReactivos()!=null ? 
				ReactivoBuilder.convertirListaAEntidadReactivo(subprueba.getReactivos()) : new ArrayList<>());
		return entidad;
	}
	
	public static List<EntidadSubprueba> convertirAListaEntidad(List<Subprueba> subpruebas){
		List<EntidadSubprueba> entidadSubpruebas = new ArrayList<>();
		for (Subprueba subprueba : subpruebas) {
			entidadSubpruebas.add(convertirAEntidad(subprueba));
		}
		return entidadSubpruebas;
	}
	
	public static List<Subprueba> convertirAListaDominio(List<EntidadSubprueba> entidadSubpruebas){
		List<Subprueba> subpruebas = new ArrayList<>();
		for (EntidadSubprueba entidadSubprueba : entidadSubpruebas) {
			subpruebas.add(convertirADominio(entidadSubprueba));
		}
		return subpruebas;
	}

}
