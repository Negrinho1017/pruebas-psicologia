package ca2re.backend.persistencia.builder;

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
		entidad.setReactivos(ReactivoBuilder.convertirListaAEntidadReactivo(subprueba.getReactivos()));
		return entidad;
	}

}
