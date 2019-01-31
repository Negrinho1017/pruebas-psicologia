package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Update.update;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.excepciones.PruebasPsicologiaException;
import ca2re.backend.persistencia.PruebaWAISDAO;
import ca2re.backend.persistencia.builder.PruebaBuilder;
import ca2re.backend.persistencia.mongo.entidades.EntidadPrueba;

public class PruebaWaisMongoDAO implements PruebaWAISDAO{

	private static final String COLLECTION_PRUEBA_WISC = "prueba_wisc";
	private static final String COLLECTION_PRUEBA_WAIS = "prueba_wais";

	@Autowired
	private static MongoOperations mongoOperations;

	@Autowired
	private static MongoTemplate mongoTemplate;

	public PruebaWaisMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}

	public Prueba guardarPruebaWais(Prueba prueba) {
		EntidadPrueba entidadPrueba = PruebaBuilder.convertirAEntidad(prueba);
		mongoOperations.save(entidadPrueba, COLLECTION_PRUEBA_WAIS);
		return prueba;
	}

	public Prueba guardarPruebaWisc(Prueba prueba) {
		EntidadPrueba entidadPrueba = PruebaBuilder.convertirAEntidad(prueba);
		mongoOperations.save(entidadPrueba, COLLECTION_PRUEBA_WISC);
		return prueba;
	}

	public List<Prueba> obtenerTodasLasPruebas(String tipoPrueba) {
		String coleccion = tipoPrueba.equals("WAIS") ? COLLECTION_PRUEBA_WAIS : COLLECTION_PRUEBA_WISC;
		return PruebaBuilder.convertirAListaDominio(mongoOperations.findAll(EntidadPrueba.class, coleccion));
	}

	public List<Prueba> obtenerPruebaPorIdEvaluado(String id) throws PruebasPsicologiaException {
		Query pruebaPorNombre = query(where("evaluado.id").is(id));
		List<EntidadPrueba> pruebaEntidad = mongoOperations.find(pruebaPorNombre, EntidadPrueba.class, COLLECTION_PRUEBA_WAIS);
		if(pruebaEntidad.size() == 0) {
			pruebaEntidad = mongoOperations.find(pruebaPorNombre, EntidadPrueba.class, COLLECTION_PRUEBA_WISC);
		}
		if(pruebaEntidad.size() == 0) {
			return new ArrayList<Prueba>();
		}
		return PruebaBuilder.convertirAListaDominio(pruebaEntidad);
	}

	public Prueba actualizarPrueba(Prueba prueba, String id, String coleccion) {
		EntidadPrueba entidadPrueba = PruebaBuilder.convertirAEntidad(prueba);
		Query query = query(where("evaluado.id").is(id));
		Update actualizacionTipoPrueba = update("tipoPrueba", entidadPrueba.getTipoPrueba());
		Update actualizacionRamaDelConocimiento = update("ramaDelConocimiento", entidadPrueba.getRamaDelConocimiento());
		Update actualizacionNombreExamindor = update("nombreExaminador", entidadPrueba.getNombreExaminador());
		Update actualizacionEvaluado = update("evaluado", entidadPrueba.getEvaluado());
		Update actualizacionFechaEvaluacion = update("fechaEvaluacion", entidadPrueba.getFechaEvaluacion());
		Update actualizacionEdadEvaluado = update("edadEvaluado", entidadPrueba.getEdadEvaluado());
		mongoOperations.updateFirst(query, actualizacionTipoPrueba, EntidadPrueba.class, coleccion);
		mongoOperations.updateFirst(query, actualizacionRamaDelConocimiento, EntidadPrueba.class, coleccion);
		mongoOperations.updateFirst(query, actualizacionNombreExamindor, EntidadPrueba.class, coleccion);
		mongoOperations.updateFirst(query, actualizacionEvaluado, EntidadPrueba.class, coleccion);
		mongoOperations.updateFirst(query, actualizacionFechaEvaluacion, EntidadPrueba.class, coleccion);
		mongoOperations.updateFirst(query, actualizacionEdadEvaluado, EntidadPrueba.class, coleccion);
		return obtenerPruebaPorIdEvaluado(id).get(0);
	}

	@Override
	public Prueba eliminarPrueba(String idEvaluado) {
		Query pruebaPorNombre = query(where("evaluado.id").is(idEvaluado));
		if(obtenerPruebaPorIdEvaluado(idEvaluado).size()==0) {
			throw new PruebasPsicologiaException("Prueba no encontrada");
		}
		Prueba prueba = obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
		String coleccionABuscar = prueba.getTipoPrueba().equals("WAIS") ? COLLECTION_PRUEBA_WAIS : COLLECTION_PRUEBA_WISC;
		mongoOperations.remove(pruebaPorNombre, EntidadPrueba.class, coleccionABuscar);
		return prueba;
	}
}
