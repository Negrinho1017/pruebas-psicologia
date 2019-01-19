package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.persistencia.CalificacionAnalisisProcesoDAO;
import ca2re.backend.persistencia.builder.AnalisisProcesoWAISBuilder;
import ca2re.backend.persistencia.mongo.entidades.EntidadAnalisisProcesoWAIS;

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
		EntidadAnalisisProcesoWAIS entidadAnalisisProcesoWAIS = mongoOperations
				.find(dcbt, EntidadAnalisisProcesoWAIS.class, ANALISIS_PROCESO).get(0);
		return AnalisisProcesoWAISBuilder.convertirADominio(entidadAnalisisProcesoWAIS).getDcbt();
	}
	
	public String[] obtenerRDD(String idEdad) {
		Query rdd = query(where("idEdad").is(idEdad));
		EntidadAnalisisProcesoWAIS entidadAnalisisProcesoWAIS = mongoOperations
				.find(rdd, EntidadAnalisisProcesoWAIS.class, ANALISIS_PROCESO).get(0);
		return AnalisisProcesoWAISBuilder.convertirADominio(entidadAnalisisProcesoWAIS).getRdd();
	}
	
	public String[] obtenerRDI(String idEdad) {
		Query rdi = query(where("idEdad").is(idEdad));
		EntidadAnalisisProcesoWAIS entidadAnalisisProcesoWAIS = mongoOperations
				.find(rdi, EntidadAnalisisProcesoWAIS.class, ANALISIS_PROCESO).get(0);
		return AnalisisProcesoWAISBuilder.convertirADominio(entidadAnalisisProcesoWAIS).getRdi();
	}
	
	public String[] obtenerRDS(String idEdad) {
		Query rds = query(where("idEdad").is(idEdad));
		EntidadAnalisisProcesoWAIS entidadAnalisisProcesoWAIS = mongoOperations
				.find(rds, EntidadAnalisisProcesoWAIS.class, ANALISIS_PROCESO).get(0);
		return AnalisisProcesoWAISBuilder.convertirADominio(entidadAnalisisProcesoWAIS).getRds();
	}

	@Override
	public String[] obtenerRegistrosAleatorio(String idEdad) {
		Query registrosAleatorio = query(where("idEdad").is(idEdad));
		EntidadAnalisisProcesoWAIS entidadAnalisisProcesoWAIS = mongoOperations
				.find(registrosAleatorio, EntidadAnalisisProcesoWAIS.class, ANALISIS_PROCESO).get(0);
		return AnalisisProcesoWAISBuilder.convertirADominio(entidadAnalisisProcesoWAIS).getRegistrosAleatorio();
	}

	@Override
	public String[] obtenerRegistrosEstructurado(String idEdad) {
		Query registrosEstructurado = query(where("idEdad").is(idEdad));
		EntidadAnalisisProcesoWAIS entidadAnalisisProcesoWAIS = mongoOperations
				.find(registrosEstructurado, EntidadAnalisisProcesoWAIS.class, ANALISIS_PROCESO).get(0);
		return AnalisisProcesoWAISBuilder.convertirADominio(entidadAnalisisProcesoWAIS).getRegistrosEstructurado();
	}

}
