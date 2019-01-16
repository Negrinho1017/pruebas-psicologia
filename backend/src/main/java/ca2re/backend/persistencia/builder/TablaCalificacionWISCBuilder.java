package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.TablaCalificacionWISC;
import ca2re.backend.persistencia.mongo.entidades.EntidadTablaCalificacionWISC;

public class TablaCalificacionWISCBuilder {
	public static TablaCalificacionWISC convertirADominio(EntidadTablaCalificacionWISC entidad) {
		TablaCalificacionWISC tabla = new TablaCalificacionWISC();
		tabla.setAritmeticaAR(entidad.getAritmeticaAR());
		tabla.setBusquedaSimbolosBS(entidad.getBusquedaSimbolosBS());
		tabla.setClavesCL(entidad.getClavesCL());
		tabla.setComprensionCM(entidad.getComprensionCM());
		tabla.setDigitosRD(entidad.getDigitosRD());
		tabla.setDisenioCubosDC(entidad.getDisenioCubosDC());
		tabla.setFigurasIncompletasFI(entidad.getFigurasIncompletasFI());
		tabla.setIdEdad(entidad.getIdEdad());
		tabla.setInformacionIN(entidad.getInformacionIN());
		tabla.setMatricesMT(entidad.getMatricesMT());
		tabla.setSemejanzasSE(entidad.getSemejanzasSE());
		tabla.setSusecionNumeroLetrasNL(entidad.getSusecionNumeroLetrasNL());
		tabla.setVocabularioVB(entidad.getVocabularioVB());
		tabla.setConceptosDibujosCD(entidad.getConceptosDibujosCD());
		tabla.setPistasPC(entidad.getPistasPC());
		tabla.setRegistrosRG(entidad.getRegistrosRG());
		return tabla;
	}
}
