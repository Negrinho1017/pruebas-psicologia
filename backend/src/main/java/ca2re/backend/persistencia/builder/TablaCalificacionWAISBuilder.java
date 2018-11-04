package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.TablaCalificacionWAIS;
import ca2re.backend.persistencia.mongo.entidades.EntidadTablaCalificacionWAIS;

public class TablaCalificacionWAISBuilder {
	
	public static TablaCalificacionWAIS convertirADominio(EntidadTablaCalificacionWAIS entidad) {
		TablaCalificacionWAIS tabla = new TablaCalificacionWAIS();
		tabla.setAritmeticaA(entidad.getAritmeticaA());
		tabla.setBusquedaSimbolosBS(entidad.getBusquedaSimbolosBS());
		tabla.setCancelacionCA(entidad.getCancelacionCA());
		tabla.setClavesCN(entidad.getClavesCN());
		tabla.setComprensionCO(entidad.getComprensionCO());
		tabla.setDigitosD(entidad.getDigitosD());
		tabla.setDisenioCubosC(entidad.getDisenioCubosC());
		tabla.setFigurasIncompletasFI(entidad.getFigurasIncompletasFI());
		tabla.setIdEdad(entidad.getIdEdad());
		tabla.setInformacionI(entidad.getInformacionI());
		tabla.setMatricesM(entidad.getMatricesM());
		tabla.setPesoFiguradoB(entidad.getPesoFiguradoB());
		tabla.setRompecabezasVisualPV(entidad.getRompecabezasVisualPV());
		tabla.setSemejanzasS(entidad.getSemejanzasS());
		tabla.setSusecionNumeroLetrasLN(entidad.getSusecionNumeroLetrasLN());
		tabla.setVocabularioV(entidad.getVocabularioV());
		return tabla;
	}
	
}
