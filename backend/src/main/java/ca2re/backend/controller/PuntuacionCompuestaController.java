package ca2re.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.PuntuacionCompuesta;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.persistencia.mongo.PruebaWaisMongoDAO;
import ca2re.backend.servicio.AdministradorPruebas;

@RestController
@CrossOrigin
@RequestMapping(value = "/puntuacion-compuesta")
public class PuntuacionCompuestaController {

	@Autowired
	AdministradorPruebas administradorPruebas;

	@Autowired
	public PruebaWaisMongoDAO pruebaWaisDAO;

	@RequestMapping(value = "/componentes-puntuacion", method = RequestMethod.GET)
	@ResponseBody
	public PuntuacionCompuesta obtenerPuntuacionCompuesta(@RequestParam String idIndice,
			@RequestParam int puntuacionTotal) {
		int puntuacion = administradorPruebas.obtenerPuntuacionCompuesta(idIndice, puntuacionTotal);
		String intervaloConfianza = administradorPruebas.obtenerIntervaloConfianza(idIndice, puntuacionTotal);
		double percentil = administradorPruebas.obtenerPercentil(idIndice, puntuacionTotal);
		return new PuntuacionCompuesta(puntuacion, percentil, intervaloConfianza);
	}

	@RequestMapping(value = "/ingreso-puntuacion-compuesta/{idEvaluado}", method = RequestMethod.PUT)
	@ResponseBody
	public Prueba ingresarPuntuacionCompuesta(@PathVariable(value = "idEvaluado") String idEvaluado) {
		Prueba prueba = administradorPruebas.ingresarPuntuacionCompuesta(idEvaluado);
		return pruebaWaisDAO.actualizarPrueba(prueba, idEvaluado);
	}
}
