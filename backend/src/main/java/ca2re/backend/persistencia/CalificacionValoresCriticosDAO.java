package ca2re.backend.persistencia;

import ca2re.backend.dominio.ValorCritico;

public interface CalificacionValoresCriticosDAO {
	ValorCritico obtenerValoresCriticosWAIS(int idRangoEdad);
	
	ValorCritico obtenerValoresCriticosWISC(int edad);
}
