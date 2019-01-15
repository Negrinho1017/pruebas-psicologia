package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.persistencia.CalificacionWAISDAO;
import ca2re.backend.persistencia.builder.TablaCalificacionWAISBuilder;
import ca2re.backend.persistencia.mongo.entidades.EntidadTablaCalificacionWAIS;

public class CalificacionWaisMongoDAO implements CalificacionWAISDAO{
	
	private static final String COLLECTION_CALIFICACION_WAIS = "tabla_calificacion_wais";
	
	@Autowired
	private static MongoOperations mongoOperations;

	public CalificacionWaisMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}

	public String[] obtenerDisenioDeCubosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getDisenioCubosC();
	}

	public String[] obtenerSemejanzasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getSemejanzasS();

	}

	public String[] obtenerRetencionDigitosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getDigitosD();
	}

	public String[] obtenerMatricesPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getMatricesM();
	}

	public String[] obtenerVocabularioPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getVocabularioV();
	}

	public String[] obtenerAritmeticaPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getAritmeticaA();
	}

	public String[] obtenerBusquedaDeSimbolosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getBusquedaSimbolosBS();
	}

	public String[] obtenerRompecabezasVisualPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getRompecabezasVisualPV();
	}

	public String[] obtenerInformacionPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getInformacionI();
	}

	public String[] obtenerClavesPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getClavesCN();
	}
	
	public String[] obtenerNumerosLetrasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getSusecionNumeroLetrasLN();
	}

	@Override
	public String[] obtenerPesoFiguradoPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getPesoFiguradoB();
	}

	@Override
	public String[] obtenerCancelacionPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getCancelacionCA();
	}

	@Override
	public String[] obtenerComprensionPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getComprensionCO();
	}

	@Override
	public String[] obtenerFigurasIncompletasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWAIS entidadTablaCalificacionWAIS = mongoOperations.find(pruebaPorId, EntidadTablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0);
		return TablaCalificacionWAISBuilder.convertirADominio(entidadTablaCalificacionWAIS).getFigurasIncompletasFI();
	}

}
