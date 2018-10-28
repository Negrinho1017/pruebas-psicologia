package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.PuntuacionCompuestaWAIS;
import ca2re.backend.persistencia.mongo.entidades.EntidadPuntuacionCompuestaWAIS;

public class PuntuacionCompuestaWAISBuilder {
	public static EntidadPuntuacionCompuestaWAIS convertirAEntidad(PuntuacionCompuestaWAIS puntuacionCompuestaWAIS) {
		EntidadPuntuacionCompuestaWAIS entidadPuntuacionCompuestaWAIS = new EntidadPuntuacionCompuestaWAIS();
		entidadPuntuacionCompuestaWAIS.setIdIndice(puntuacionCompuestaWAIS.getIdIndice());
		entidadPuntuacionCompuestaWAIS.setIntervaloConfianza(puntuacionCompuestaWAIS.getIntervaloConfianza());
		entidadPuntuacionCompuestaWAIS.setPercentil(puntuacionCompuestaWAIS.getPercentil());
		entidadPuntuacionCompuestaWAIS.setPuntuacionCompuesta(puntuacionCompuestaWAIS.getPuntuacionCompuesta());
		return entidadPuntuacionCompuestaWAIS;
	}
	
	public static PuntuacionCompuestaWAIS convertirADominio(EntidadPuntuacionCompuestaWAIS entidadPuntuacionCompuestaWAIS) {
		PuntuacionCompuestaWAIS puntuacionCompuestaWAIS = new PuntuacionCompuestaWAIS();
		puntuacionCompuestaWAIS.setIdIndice(entidadPuntuacionCompuestaWAIS.getIdIndice());
		puntuacionCompuestaWAIS.setIntervaloConfianza(entidadPuntuacionCompuestaWAIS.getIntervaloConfianza());
		puntuacionCompuestaWAIS.setPercentil(entidadPuntuacionCompuestaWAIS.getPercentil());
		puntuacionCompuestaWAIS.setPuntuacionCompuesta(entidadPuntuacionCompuestaWAIS.getPuntuacionCompuesta());
		return puntuacionCompuestaWAIS;
	}
}
