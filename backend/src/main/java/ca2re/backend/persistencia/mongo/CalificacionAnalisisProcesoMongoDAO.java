package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.dominio.AnalisisProcesoWAIS;
import ca2re.backend.persistencia.CalificacionAnalisisProcesoDAO;

public class CalificacionAnalisisProcesoMongoDAO implements CalificacionAnalisisProcesoDAO{
	private static final String ANALISIS_PROCESO = "analisis_proceso";
	
	@Autowired
	private static MongoOperations mongoOperations;

	public CalificacionAnalisisProcesoMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}
	
	public String[] obtenerDisenoCubosSinBonificacionPorTiempo(String idEdad) {
		Query dcbt = query(where("idEdad").is(idEdad));
		return mongoOperations
				.find(dcbt, AnalisisProcesoWAIS.class, ANALISIS_PROCESO)
				.get(0).getDcbt();
	}
	
	public String[] obtenerRDD(String idEdad) {
		Query rdd = query(where("idEdad").is(idEdad));
		return mongoOperations
				.find(rdd, AnalisisProcesoWAIS.class, ANALISIS_PROCESO)
				.get(0).getRdd();
	}
	
	public String[] obtenerRDI(String idEdad) {
		Query rdi = query(where("idEdad").is(idEdad));
		return mongoOperations
				.find(rdi, AnalisisProcesoWAIS.class, ANALISIS_PROCESO)
				.get(0).getRdi();
	}
	
	public String[] obtenerRDS(String idEdad) {
		Query rds = query(where("idEdad").is(idEdad));
		return mongoOperations
				.find(rds, AnalisisProcesoWAIS.class, ANALISIS_PROCESO)
				.get(0).getRds();
	}

}
