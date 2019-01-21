package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.dominio.ValorCritico;
import ca2re.backend.persistencia.CalificacionValoresCriticosDAO;
import ca2re.backend.persistencia.builder.ValorCriticoBuilder;
import ca2re.backend.persistencia.mongo.entidades.EntidadValorCritico;

public class CalificacionValoresCriticosMongoDAO implements CalificacionValoresCriticosDAO{

	private static final String COLLECTION_VALORES_CRITICOS_WAIS = "valores_criticos_wais";
	
	private static final String COLLECTION_VALORES_CRITICOS_WISC = "valores_criticos_wisc";
	
	@Autowired
	private static MongoOperations mongoOperations;

	public CalificacionValoresCriticosMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}
	
	@Override
	public ValorCritico obtenerValoresCriticosWAIS(int idRangoEdad) {
		Query valoresCriticos = query(where("idRangoEdad").is(idRangoEdad));
		EntidadValorCritico entidadValorCriticoWAIS = mongoOperations
				.find(valoresCriticos, EntidadValorCritico.class, COLLECTION_VALORES_CRITICOS_WAIS).get(0);
		return ValorCriticoBuilder.convertirADominio(entidadValorCriticoWAIS);
	}

	@Override
	public ValorCritico obtenerValoresCriticosWISC(int edad) {
		Query valoresCriticos = query(where("idRangoEdad").is(edad));
		EntidadValorCritico entidadValorCriticoWAIS = mongoOperations
				.find(valoresCriticos, EntidadValorCritico.class, COLLECTION_VALORES_CRITICOS_WISC).get(0);
		return ValorCriticoBuilder.convertirADominio(entidadValorCriticoWAIS);
	}

}
