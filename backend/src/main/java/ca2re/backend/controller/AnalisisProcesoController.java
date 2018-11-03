package ca2re.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.dominio.Subprueba;
import ca2re.backend.persistencia.PruebaWAISDAO;
import ca2re.backend.servicio.AdministradorPruebas;

@RestController
@CrossOrigin
@RequestMapping(value = "/analisis-proceso")
public class AnalisisProcesoController {
	
	private static final int RETENCION_DIGITOS = 6;

	private static final int DISENO_CUBOS = 3;

	@Autowired
	public PruebaWAISDAO pruebaWaisDAO;
	
	@Autowired
	AdministradorPruebas administradorPruebas;	
	
	@RequestMapping(value = "/diseno-cubos-sin-bonificacion-tiempo", method = RequestMethod.GET)
	@ResponseBody
	public Subprueba obtenerReactivos(@RequestParam String idEvaluado) {
		return administradorPruebas.obtenerDisenoCubosSinBonificacionDeTiempo(DISENO_CUBOS, idEvaluado);
	}
	
	@RequestMapping(value = "/retencion-digitos", method = RequestMethod.GET)
	@ResponseBody
	public Subprueba obtenerReactivosRDD(@RequestParam String idEvaluado, @RequestParam int numeroRetencionDigitos) {
		return administradorPruebas.obtenerRetencionDeDigitos(numeroRetencionDigitos, RETENCION_DIGITOS, idEvaluado);
	}

}
