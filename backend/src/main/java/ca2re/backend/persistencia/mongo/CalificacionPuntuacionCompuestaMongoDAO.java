package ca2re.backend.persistencia.mongo;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import ca2re.backend.persistencia.CalificacionPuntuacionCompuestaDAO;
import ca2re.backend.persistencia.builder.PuntuacionCompuestaWAISBuilder;
import ca2re.backend.persistencia.mongo.entidades.EntidadPuntuacionCompuestaWAIS;

public class CalificacionPuntuacionCompuestaMongoDAO implements CalificacionPuntuacionCompuestaDAO{
	private static final String COLLECTION_CONVERSION_PUNTUACION_COMPUESTA = "conversion_puntuacion_compuesta_wais";
	
	@Autowired
	private static MongoOperations mongoOperations;

	public CalificacionPuntuacionCompuestaMongoDAO(MongoOperations mongoOperations) {
		super();
		this.mongoOperations = mongoOperations;
	}
	
	public int[] obtenerPuntuacionCompuesta(String idIndice) {
		Query puntuacionCompuesta = query(where("idIndice").is(idIndice));
		EntidadPuntuacionCompuestaWAIS entidadPuntuacionCompuestaWAIS = mongoOperations
				.find(puntuacionCompuesta, EntidadPuntuacionCompuestaWAIS.class, COLLECTION_CONVERSION_PUNTUACION_COMPUESTA).get(0);
		return PuntuacionCompuestaWAISBuilder.convertirADominio(entidadPuntuacionCompuestaWAIS).getPuntuacionCompuesta();
	}

	public double[] obtenerPercentil(String idIndice) {
		Query puntuacionCompuesta = query(where("idIndice").is(idIndice));
		EntidadPuntuacionCompuestaWAIS entidadPuntuacionCompuestaWAIS = mongoOperations
				.find(puntuacionCompuesta, EntidadPuntuacionCompuestaWAIS.class, COLLECTION_CONVERSION_PUNTUACION_COMPUESTA).get(0);
		return PuntuacionCompuestaWAISBuilder.convertirADominio(entidadPuntuacionCompuestaWAIS).getPercentil();
	}

	public String[] obtenerIntervaloDeConfianza(String idIndice) {
		Query puntuacionCompuesta = query(where("idIndice").is(idIndice));
		EntidadPuntuacionCompuestaWAIS entidadPuntuacionCompuestaWAIS = mongoOperations
				.find(puntuacionCompuesta, EntidadPuntuacionCompuestaWAIS.class, COLLECTION_CONVERSION_PUNTUACION_COMPUESTA).get(0);
		return PuntuacionCompuestaWAISBuilder.convertirADominio(entidadPuntuacionCompuestaWAIS).getIntervaloConfianza();
	}
}
