package ca2re.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.dominio.SubpruebasAnalisisProceso;
import ca2re.backend.persistencia.PruebaWAISDAO;
import ca2re.backend.servicio.AdministradorPruebas;

@RestController
@RequestMapping(value = "/analisis-proceso")
public class AnalisisProcesoController {

	@Autowired
	public PruebaWAISDAO pruebaWaisDAO;
	
	@Autowired
	AdministradorPruebas administradorPruebas;	
	
	@RequestMapping(value = "/subpruebas-analisis-proceso", method = RequestMethod.GET)
	@ResponseBody
	public SubpruebasAnalisisProceso obtenerSubpruebasAnalisisProceso(@RequestParam String idEvaluado) {
		return administradorPruebas.obtenerSubpruebasAnalisisProceso(idEvaluado);
	}

}
