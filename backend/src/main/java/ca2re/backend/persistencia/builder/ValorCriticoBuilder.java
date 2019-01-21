package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.ValorCritico;
import ca2re.backend.persistencia.mongo.entidades.EntidadValorCritico;

public class ValorCriticoBuilder {
	public static EntidadValorCritico convertirAEntidad(ValorCritico valorCriticoWAIS) {
		EntidadValorCritico entidadValorCriticoWAIS = new EntidadValorCritico();
		entidadValorCriticoWAIS.setIdRangoEdad(valorCriticoWAIS.getIdRangoEdad());
		entidadValorCriticoWAIS.setValorCriticoICV_IMT(valorCriticoWAIS.getValorCriticoICV_IMT());
		entidadValorCriticoWAIS.setValorCriticoICV_IRP(valorCriticoWAIS.getValorCriticoICV_IRP());
		entidadValorCriticoWAIS.setValorCriticoICV_IVP(valorCriticoWAIS.getValorCriticoICV_IVP());
		entidadValorCriticoWAIS.setValorCriticoIMT_IVP(valorCriticoWAIS.getValorCriticoIMT_IVP());
		entidadValorCriticoWAIS.setValorCriticoIRP_IMT(valorCriticoWAIS.getValorCriticoIRP_IMT());
		entidadValorCriticoWAIS.setValorCriticoIRP_IVP(valorCriticoWAIS.getValorCriticoIRP_IVP());
		return entidadValorCriticoWAIS;
	}
	
	public static ValorCritico convertirADominio(EntidadValorCritico entidadValorCriticoWAIS) {
		ValorCritico valorCriticoWAIS = new ValorCritico();
		valorCriticoWAIS.setIdRangoEdad(entidadValorCriticoWAIS.getIdRangoEdad());
		valorCriticoWAIS.setValorCriticoICV_IMT(entidadValorCriticoWAIS.getValorCriticoICV_IMT());
		valorCriticoWAIS.setValorCriticoICV_IRP(entidadValorCriticoWAIS.getValorCriticoICV_IRP());
		valorCriticoWAIS.setValorCriticoICV_IVP(entidadValorCriticoWAIS.getValorCriticoICV_IVP());
		valorCriticoWAIS.setValorCriticoIMT_IVP(entidadValorCriticoWAIS.getValorCriticoIMT_IVP());
		valorCriticoWAIS.setValorCriticoIRP_IMT(entidadValorCriticoWAIS.getValorCriticoIRP_IMT());
		valorCriticoWAIS.setValorCriticoIRP_IVP(entidadValorCriticoWAIS.getValorCriticoIRP_IVP());
		return valorCriticoWAIS;
	}
}
