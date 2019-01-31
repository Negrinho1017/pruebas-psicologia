package ca2re.backend.persistencia;

import java.util.List;

import ca2re.backend.dominio.Prueba;

public interface PruebaWAISDAO {
	Prueba guardarPruebaWais(Prueba prueba);

	Prueba guardarPruebaWisc(Prueba prueba);
	
	Prueba eliminarPrueba(String idEvaluado);

	List<Prueba> obtenerTodasLasPruebas(String tipoPrueba);

	List<Prueba> obtenerPruebaPorIdEvaluado(String id);

	Prueba actualizarPrueba(Prueba prueba, String id, String coleccion);
	
}
