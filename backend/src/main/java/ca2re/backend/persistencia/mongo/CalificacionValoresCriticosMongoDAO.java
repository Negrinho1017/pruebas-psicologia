package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.dominio.ValorCriticoWAIS;
import ca2re.backend.persistencia.CalificacionValoresCriticosDAO;

public class CalificacionValoresCriticosMongoDAO implements CalificacionValoresCriticosDAO{

	private static final String COLLECTION_VALORES_CRITICOS = "valores_criticos_wais";
	
	@Autowired
	private static MongoOperations mongoOperations;

	public CalificacionValoresCriticosMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}
	
	@Override
	public ValorCriticoWAIS obtenerValoresCriticos(int idRangoEdad) {
		Query valoresCriticos = query(where("idRangoEdad").is(idRangoEdad));
		return mongoOperations
				.find(valoresCriticos, ValorCriticoWAIS.class, COLLECTION_VALORES_CRITICOS).get(0);
	}

}
