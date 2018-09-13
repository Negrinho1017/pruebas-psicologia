package ca2re.backend.persistencia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;

import com.mongodb.MongoClient;

import ca2re.backend.dominio.Prueba;

public class PruebaWaisDAO {
	
	private static final String COLLECTION_PRUEBA_WISC = "prueba_wisc";
	private static final String COLLECTION_PRUEBA_WAIS = "prueba_wais";
	@Autowired
	private static MongoOperations mongoOperations;
	
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
}
