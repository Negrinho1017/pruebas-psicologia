package ca2re.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ca2re.backend.dominio.ValorCriticoWAIS;
import ca2re.backend.servicio.AdministradorPruebas;

@RestController
@CrossOrigin
@RequestMapping(value = "/valor-critico")
public class ValorCriticoController {

	@Autowired
	AdministradorPruebas administradorPruebas;

	@RequestMapping(value = "/valores-criticos", method = RequestMethod.GET)
	@ResponseBody
	public ValorCriticoWAIS obtenerValoresCriticos(@RequestParam int idRangoEdad) {
		return administradorPruebas.obtenerValoresCriticos(idRangoEdad);
	}

}
