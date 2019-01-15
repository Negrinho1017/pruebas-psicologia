package ca2re.backend.servicio;

import org.springframework.beans.factory.annotation.Autowired;

import ca2re.backend.persistencia.CalificacionWISCDAO;
import ca2re.backend.util.CalculadoraDePuntuaciones;

public class AdministradorPruebasWISC {
	
	@Autowired
	private CalificacionWISCDAO calificacionWISCDAO;
	
	public int obtenerPuntuacionEscalarDisenioCubos(String idEdad, int puntuacionNatural) {
		String[] rangosDisenioCubos = calificacionWISCDAO.obtenerDisenioDeCubosPorIdEdad(idEdad);
		return CalculadoraDePuntuaciones.obtenerPuntuacionEscalar(rangosDisenioCubos, puntuacionNatural);
	}
}
