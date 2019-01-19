package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.AnalisisProcesoWAIS;
import ca2re.backend.persistencia.mongo.entidades.EntidadAnalisisProcesoWAIS;

public class AnalisisProcesoWAISBuilder {
	public static AnalisisProcesoWAIS convertirADominio(EntidadAnalisisProcesoWAIS entidadAnalisisProcesoWAIS) {
		AnalisisProcesoWAIS analisisProcesoWAIS = new AnalisisProcesoWAIS();
		analisisProcesoWAIS.setDcbt(entidadAnalisisProcesoWAIS.getDcbt());
		analisisProcesoWAIS.setIdEdad(entidadAnalisisProcesoWAIS.getIdEdad());
		analisisProcesoWAIS.setRdd(entidadAnalisisProcesoWAIS.getRdd());
		analisisProcesoWAIS.setRdi(entidadAnalisisProcesoWAIS.getRdi());
		analisisProcesoWAIS.setRds(entidadAnalisisProcesoWAIS.getRds());
		analisisProcesoWAIS.setRegistrosAleatorio(entidadAnalisisProcesoWAIS.getRegistrosAleatorio());
		analisisProcesoWAIS.setRegistrosEstructurado(entidadAnalisisProcesoWAIS.getRegistrosEstructurado());
		return analisisProcesoWAIS;
	}
}
