package ca2re.backend.configuracion;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.MongoClient;

import ca2re.backend.persistencia.CalificacionWISCDAO;
import ca2re.backend.persistencia.mongo.CalificacionAnalisisProcesoMongoDAO;
import ca2re.backend.persistencia.mongo.CalificacionPuntuacionCompuestaMongoDAO;
import ca2re.backend.persistencia.mongo.CalificacionValoresCriticosMongoDAO;
import ca2re.backend.persistencia.mongo.CalificacionWISCMongoDAO;
import ca2re.backend.persistencia.mongo.CalificacionWaisMongoDAO;
import ca2re.backend.persistencia.mongo.PruebaWaisMongoDAO;
import ca2re.backend.persistencia.mongo.UsuarioMongoDAO;
import ca2re.backend.servicio.AdministradorPruebas;
import ca2re.backend.servicio.AdministradorPruebasWISC;
import ca2re.backend.servicio.CalificadorPrueba;

@Configuration
public class Configuracion {
	@Value("${spring.data.mongodb.host}") 
	private String mongoHost;
	
	@Value("${spring.data.mongodb.port}") 
	private int mongoPuerto;
	
	@Value("${nombreDB}") 
	private String nombreDB;	
	
	@Bean
	public CalificadorPrueba crearCalificadorPrueba() {
		return new CalificadorPrueba();
	}
	
	@Bean
	public MongoClient crearMongoClient() {
		return new MongoClient(mongoHost, mongoPuerto);
	}
	
	@Primary
	@Bean
	public MongoOperations crearMongoTemplate() {		
		return new MongoTemplate(crearMongoClient(), nombreDB);
	}
	
	@Bean
	public PruebaWaisMongoDAO crearPruebaWaisDAO(MongoOperations mongoOperations) {
		return new PruebaWaisMongoDAO(mongoOperations);
	}
	
	@Bean
	public CalificacionWaisMongoDAO crearCalificacionWaisDAO(MongoOperations mongoOperations) {
		return new CalificacionWaisMongoDAO(mongoOperations);
	}
	
	@Bean
	public CalificacionWISCDAO crearCalificacionWISCDAO(MongoOperations mongoOperations) {
		return new CalificacionWISCMongoDAO(mongoOperations);
	}
	
	@Bean
	public CalificacionPuntuacionCompuestaMongoDAO crearCalificacionPuntuacionCompuestaMongoDAO(MongoOperations mongoOperations) {
		return new CalificacionPuntuacionCompuestaMongoDAO(mongoOperations);
	}
	
	@Bean
	public CalificacionValoresCriticosMongoDAO crearCalificacionValoresCriticosMongoDAO(MongoOperations mongoOperations) {
		return new CalificacionValoresCriticosMongoDAO(mongoOperations);
	}
	
	@Bean
	public CalificacionAnalisisProcesoMongoDAO crearCalificacionAnalisisProcesoMongoDAO(MongoOperations mongoOperations) {
		return new CalificacionAnalisisProcesoMongoDAO(mongoOperations);
	}
	
	@Bean
	public UsuarioMongoDAO crearUsuarioMongoDAO(MongoOperations mongoOperations) {
		return new UsuarioMongoDAO(mongoOperations);
	}
	
	@Bean
	public AdministradorPruebas crearAdministradorPruebas() {
		return new AdministradorPruebas();
	}
	
	@Bean
	public AdministradorPruebasWISC crearAdministradorPruebasWISC() {
		return new AdministradorPruebasWISC();
	}
	
}
