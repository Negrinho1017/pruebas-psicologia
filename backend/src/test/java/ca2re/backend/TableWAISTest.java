package ca2re.backend;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.dominio.Persona;
import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.RamaDelConocimiento;
import ca2re.backend.dominio.Reactivo;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.dominio.TablaWAIS;
import ca2re.backend.persistencia.PruebaWaisDAO;

public class TableWAISTest {
	
	TablaWAIS tabla;
	MongoOperations mongoOperation;
	PruebaWaisDAO pruebaWaisDAO;
	
	@Before
	public void setup(){
		MongoClient mongo = new MongoClient("localhost", 27017);
		mongoOperation = new MongoTemplate(mongo, "pruebas_psicologia_db");
		tabla = new TablaWAIS();
		pruebaWaisDAO = new PruebaWaisDAO(mongoOperation);
	}
	
	@Test
	public void crearPruebaTest() {	
		RamaDelConocimiento ramaDelConocimiento = new RamaDelConocimiento();
		Subprueba subprueba1 = new Subprueba();
		Subprueba subprueba2 = new Subprueba();
		Reactivo reactivo1 = new Reactivo(1, "A");
		Reactivo reactivo2 = new Reactivo(2, "B");
		Reactivo reactivo3 = new Reactivo(1, "C");
		Reactivo reactivo4 = new Reactivo(0, "D");
		Reactivo reactivo5 = new Reactivo(1, "E");
		List<Reactivo> reactivos = new ArrayList<>();
		List<Reactivo> reactivos2 = new ArrayList<>();
		reactivos.add(reactivo1);
		reactivos.add(reactivo2);
		reactivos.add(reactivo3);
		subprueba1.setReactivos(reactivos);
		subprueba1.setNombre("Semejanzas");
		subprueba1.setEsOpcional(false);
		reactivos2.add(reactivo4);
		reactivos2.add(reactivo5);
		subprueba2.setReactivos(reactivos2);
		subprueba2.setNombre("Vocabulario");
		subprueba2.setEsOpcional(false);
		List<Subprueba> subpruebas = new ArrayList<>();
		subpruebas.add(subprueba1);
		subpruebas.add(subprueba2);
		ramaDelConocimiento.setNombre("Comprensión verbal");
		ramaDelConocimiento.setSubpruebas(subpruebas);
		ramaDelConocimiento.setIntervaloConfianza("81-110");
		List<RamaDelConocimiento> ramasDelConocimiento = new ArrayList<>();
		ramasDelConocimiento.add(ramaDelConocimiento);
		Persona persona = new Persona("Andrés Julián Carvajal", Calendar.getInstance(),"1038414958");
		Prueba prueba = new Prueba(ramasDelConocimiento, "Carlos", persona,
				Calendar.getInstance(), new EdadPersona(0, 0, 0), "WAIS");
		pruebaWaisDAO.guardarPruebaWais(prueba);
		
	}
	
	@Test
	public void getPruebaTest() {	
		List<Prueba> pruebasWais = pruebaWaisDAO.obtenerTodasLasPruebasWais();
		assertEquals(pruebasWais.get(0).getTipoPrueba(),"WAIS");
		assertEquals(pruebasWais.size(),1);
		assertEquals(pruebasWais.get(0).getNombreExaminador(), "Carlos");
	}
	
	@Test
	public void getPruebaAndresJulianCarvajal() {	
		Prueba pruebaWais = pruebaWaisDAO.obtenerPruebaPorIdEvaluado("1038414958").get(0);
		assertEquals(pruebaWais.getTipoPrueba(),"WAIS");
		assertEquals(pruebaWais.getNombreExaminador(), "Carlos");
	}
}
