package ca2re.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.persistencia.PruebaWAISDAO;
import ca2re.backend.servicio.AdministradorPruebas;

@RestController
@CrossOrigin
@RequestMapping(value = "/analisis-proceso")
public class AnalisisProcesoController {
	
	@Autowired
	public PruebaWAISDAO pruebaWaisDAO;
	
	@Autowired
	AdministradorPruebas administradorPruebas;	
	
	@RequestMapping(value = "/diseno-cubos-sin-bonificacion-tiempo", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerReactivos(@RequestParam String idEvaluado, @RequestParam int numeroSubprueba) {
		return administradorPruebas.obtenerDisenoCubosSinBonificacionDeTiempo(numeroSubprueba, idEvaluado);
	}

}
