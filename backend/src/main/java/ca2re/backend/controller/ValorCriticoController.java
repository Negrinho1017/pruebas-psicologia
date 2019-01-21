package ca2re.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.dominio.ValorCritico;
import ca2re.backend.servicio.AdministradorPruebas;

@RestController
@RequestMapping(value = "/valor-critico")
public class ValorCriticoController {

	@Autowired
	AdministradorPruebas administradorPruebas;

	@RequestMapping(value = "/valores-criticos", method = RequestMethod.GET)
	@ResponseBody
	public ValorCritico obtenerValoresCriticos(@RequestParam int edad, @RequestParam String tipoPrueba) {
		return administradorPruebas.obtenerValoresCriticos(edad, tipoPrueba);
	}

}
