package ca2re.backend.persistencia.builder;

import ca2re.backend.dominio.ValorCriticoWAIS;
import ca2re.backend.persistencia.mongo.entidades.EntidadValorCriticoWAIS;

public class ValorCriticoBuilder {
	public static EntidadValorCriticoWAIS convertirAEntidad(ValorCriticoWAIS valorCriticoWAIS) {
		EntidadValorCriticoWAIS entidadValorCriticoWAIS = new EntidadValorCriticoWAIS();
		valorCriticoWAIS.setIdRangoEdad(valorCriticoWAIS.getIdRangoEdad());
		valorCriticoWAIS.setValorCriticoICV_IMT(valorCriticoWAIS.getValorCriticoICV_IMT());
		valorCriticoWAIS.setValorCriticoICV_IRP(valorCriticoWAIS.getValorCriticoICV_IRP());
		valorCriticoWAIS.setValorCriticoICV_IVP(valorCriticoWAIS.getValorCriticoICV_IVP());
		valorCriticoWAIS.setValorCriticoIMT_IVP(valorCriticoWAIS.getValorCriticoIMT_IVP());
		valorCriticoWAIS.setValorCriticoIRP_IMT(valorCriticoWAIS.getValorCriticoIRP_IMT());
		valorCriticoWAIS.setValorCriticoIRP_IVP(valorCriticoWAIS.getValorCriticoIRP_IVP());
		return entidadValorCriticoWAIS;
	}
	
	public static ValorCriticoWAIS convertirADominio(EntidadValorCriticoWAIS entidadValorCriticoWAIS) {
		ValorCriticoWAIS valorCriticoWAIS = new ValorCriticoWAIS();
		return valorCriticoWAIS;
	}
}
