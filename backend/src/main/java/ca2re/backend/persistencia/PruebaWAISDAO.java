package ca2re.backend.persistencia;

import java.util.List;

import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.Reactivo;

public interface PruebaWAISDAO {
	Prueba guardarPruebaWais(Prueba prueba);

	Prueba guardarPruebaWisc(Prueba prueba);

	List<Prueba> obtenerTodasLasPruebasWais();

	List<Prueba> obtenerPruebaPorIdEvaluado(String id);

	Prueba actualizarPrueba(Prueba prueba, String id);
	
}
