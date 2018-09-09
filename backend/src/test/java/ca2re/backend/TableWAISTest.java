package ca2re.backend;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

import ca2re.backend.dominio.TablaWAIS;

public class TableWAISTest {
	
	TablaWAIS tabla;
	MongoOperations mongoOperation;
	
	@Before
	public void setup(){
		MongoClient mongo = new MongoClient("localhost", 27017);
		
		mongoOperation = new MongoTemplate(mongo, "tabla_wais");
		
		tabla = new TablaWAIS();
	}
	
	@Test
	public void test() {
		tabla.setRangoDeEdad("26-27");
		tabla.setPuntuacionEscalar(1);
		tabla.setDisenioCubosC("1-2");
		
		mongoOperation.insert(tabla);
		
	}

}
