package ca2re.backend.persistencia;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import static org.springframework.data.mongodb.core.query.Query.query;
import org.springframework.data.mongodb.core.query.Query;
import static org.springframework.data.mongodb.core.query.Criteria.where;

import ca2re.backend.dominio.Prueba;

public class PruebaWaisDAO {
	
	private static final String COLLECTION_PRUEBA_WISC = "prueba_wisc";
	private static final String COLLECTION_PRUEBA_WAIS = "prueba_wais";
	@Autowired
	private static MongoOperations mongoOperations;
	
	@Autowired
	private static MongoTemplate mongoTemplate;
	
	public PruebaWaisDAO(MongoOperations mongoOperations) {
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
}
