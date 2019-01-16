package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.persistencia.CalificacionWISCDAO;
import ca2re.backend.persistencia.builder.TablaCalificacionWISCBuilder;
import ca2re.backend.persistencia.mongo.entidades.EntidadTablaCalificacionWISC;

public class CalificacionWISCMongoDAO implements CalificacionWISCDAO {
	private static final String COLLECTION_CALIFICACION_WISC = "tabla_calificacion_wisc";

	@Autowired
	private static MongoOperations mongoOperations;

	public CalificacionWISCMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}

	@Override
	public String[] obtenerDisenioDeCubosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getDisenioCubosDC();
	}

	@Override
	public String[] obtenerSemejanzasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getSemejanzasSE();
	}

	@Override
	public String[] obtenerRetencionDigitosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getDigitosRD();
	}

	@Override
	public String[] obtenerConceptosConDibujosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getConceptosDibujosCD();
	}

	@Override
	public String[] obtenerClavesPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getClavesCL();
	}

	@Override
	public String[] obtenerVocabularioPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getVocabularioVB();
	}

	@Override
	public String[] obtenerNumerosLetrasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getSusecionNumeroLetrasNL();
	}

	@Override
	public String[] obtenerMatricesPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getMatricesMT();
	}

	@Override
	public String[] obtenerComprensionPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getComprensionCM();
	}

	@Override
	public String[] obtenerBusquedaSimbolosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getBusquedaSimbolosBS();
	}

	@Override
	public String[] obtenerFigurasIncompletasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getFigurasIncompletasFI();
	}

	@Override
	public String[] obtenerRegistrosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getRegistrosRG();
	}

	@Override
	public String[] obtenerInformacionPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getInformacionIN();
	}

	@Override
	public String[] obtenerAritmeticaPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getAritmeticaAR();
	}

	@Override
	public String[] obtenerPistasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		EntidadTablaCalificacionWISC entidadTablaCalificacionWISC = mongoOperations
				.find(pruebaPorId, EntidadTablaCalificacionWISC.class, COLLECTION_CALIFICACION_WISC).get(0);
		return TablaCalificacionWISCBuilder.convertirADominio(entidadTablaCalificacionWISC).getPistasPC();
	}

}
