package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.dominio.AnalisisProcesoWAIS;
import ca2re.backend.dominio.PuntuacionCompuestaWAIS;
import ca2re.backend.dominio.TablaCalificacionWAIS;
import ca2re.backend.dominio.ValorCriticoWAIS;

public class CalificacionWaisMongoDAO {
	private static final String ANALISIS_PROCESO = "analisis_proceso";
	private static final String COLLECTION_CALIFICACION_WAIS = "tabla_calificacion_wais";
	private static final String COLLECTION_CONVERSION_PUNTUACION_COMPUESTA = "conversion_puntuacion_compuesta_wais";
	private static final String COLLECTION_VALORES_CRITICOS = "valores_criticos_wais";
	
	@Autowired
	private static MongoOperations mongoOperations;

	public CalificacionWaisMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}

	public String[] obtenerDisenioDeCubosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getDisenioCubosC();
	}

	public String[] obtenerSemejanzasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getSemejanzasS();
	}

	public String[] obtenerRetencionDigitosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getDigitosD();
	}

	public String[] obtenerMatricesPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getMatricesM();
	}

	public String[] obtenerVocabularioPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getVocabularioV();
	}

	public String[] obtenerAritmeticaPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getAritmeticaA();
	}

	public String[] obtenerBusquedaDeSimbolosPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getBusquedaSimbolosBS();
	}

	public String[] obtenerRompecabezasVisualPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getRompecabezasVisualPV();
	}

	public String[] obtenerInformacionPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getInformacionI();
	}

	public String[] obtenerClavesPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getClavesCN();
	}
	
	public String[] obtenerNumerosLetrasPorIdEdad(String idEdad) {
		Query pruebaPorId = query(where("idEdad").is(idEdad));
		return mongoOperations.find(pruebaPorId, TablaCalificacionWAIS.class, COLLECTION_CALIFICACION_WAIS).get(0)
				.getSusecionNumeroLetrasLN();
	}

	public int[] obtenerPuntuacionCompuesta(String idIndice) {
		Query puntuacionCompuesta = query(where("idIndice").is(idIndice));
		return mongoOperations
				.find(puntuacionCompuesta, PuntuacionCompuestaWAIS.class, COLLECTION_CONVERSION_PUNTUACION_COMPUESTA)
				.get(0).getPuntuacionCompuesta();
	}

	public double[] obtenerPercentil(String idIndice) {
		Query percentil = query(where("idIndice").is(idIndice));
		return mongoOperations
				.find(percentil, PuntuacionCompuestaWAIS.class, COLLECTION_CONVERSION_PUNTUACION_COMPUESTA).get(0)
				.getPercentil();
	}

	public String[] obtenerIntervaloDeConfianza(String idIndice) {
		Query intervaloConfianza = query(where("idIndice").is(idIndice));
		return mongoOperations
				.find(intervaloConfianza, PuntuacionCompuestaWAIS.class, COLLECTION_CONVERSION_PUNTUACION_COMPUESTA)
				.get(0).getIntervaloConfianza();
	}
	
	public ValorCriticoWAIS obtenerValoresCriticos(int idRangoEdad) {
		Query valoresCriticos = query(where("idRangoEdad").is(idRangoEdad));
		return mongoOperations
				.find(valoresCriticos, ValorCriticoWAIS.class, COLLECTION_VALORES_CRITICOS).get(0);
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
