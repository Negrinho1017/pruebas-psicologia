package ca2re.backend.persistencia;

import ca2re.backend.dominio.ValorCriticoWAIS;

public interface CalificacionValoresCriticosDAO {
	ValorCriticoWAIS obtenerValoresCriticos(int idRangoEdad);
}
