package ca2re.backend.persistencia.mongo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import static org.springframework.data.mongodb.core.query.Query.query;
import org.springframework.data.mongodb.core.query.Query;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import org.springframework.data.mongodb.core.query.Update;
import static org.springframework.data.mongodb.core.query.Update.update;

import ca2re.backend.dominio.Prueba;
import ca2re.backend.persistencia.PruebaWAISDAO;

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
		mongoOperations.save(prueba, COLLECTION_PRUEBA_WAIS);
		return prueba;
	}

	public Prueba guardarPruebaWisc(Prueba prueba) {
		mongoOperations.save(prueba, COLLECTION_PRUEBA_WISC);
		return prueba;
	}

	public List<Prueba> obtenerTodasLasPruebasWais() {
		return mongoOperations.findAll(Prueba.class, COLLECTION_PRUEBA_WAIS);
	}

	public List<Prueba> obtenerPruebaPorIdEvaluado(String id) {
		Query pruebaPorNombre = query(where("evaluado.id").is(id));
		return mongoOperations.find(pruebaPorNombre, Prueba.class, COLLECTION_PRUEBA_WAIS);
	}

	public Prueba actualizarPrueba(Prueba prueba, String id) {
		Query query = query(where("evaluado.id").is(id));
		Update actualizacionTipoPrueba = update("tipoPrueba", prueba.getTipoPrueba());
		Update actualizacionRamaDelConocimiento = update("ramaDelConocimiento", prueba.getRamaDelConocimiento());
		Update actualizacionNombreExamindor = update("nombreExaminador", prueba.getNombreExaminador());
		Update actualizacionEvaluado = update("evaluado", prueba.getEvaluado());
		Update actualizacionFechaEvaluacion = update("fechaEvaluacion", prueba.getFechaEvaluacion());
		Update actualizacionEdadEvaluado = update("edadEvaluado", prueba.getEdadEvaluado());
		mongoOperations.updateFirst(query, actualizacionTipoPrueba, Prueba.class, COLLECTION_PRUEBA_WAIS);
		mongoOperations.updateFirst(query, actualizacionRamaDelConocimiento, Prueba.class, COLLECTION_PRUEBA_WAIS);
		mongoOperations.updateFirst(query, actualizacionNombreExamindor, Prueba.class, COLLECTION_PRUEBA_WAIS);
		mongoOperations.updateFirst(query, actualizacionEvaluado, Prueba.class, COLLECTION_PRUEBA_WAIS);
		mongoOperations.updateFirst(query, actualizacionFechaEvaluacion, Prueba.class, COLLECTION_PRUEBA_WAIS);
		mongoOperations.updateFirst(query, actualizacionEdadEvaluado, Prueba.class, COLLECTION_PRUEBA_WAIS);
		return obtenerPruebaPorIdEvaluado(id).get(0);
	}
}
