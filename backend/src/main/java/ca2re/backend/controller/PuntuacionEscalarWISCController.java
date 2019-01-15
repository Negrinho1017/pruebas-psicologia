package ca2re.backend.controller;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.servicio.AdministradorPruebasWISC;
import ca2re.backend.util.EdadUtil;

@RestController
@RequestMapping(value = "/puntuacion-escalar-wisc")
public class PuntuacionEscalarWISCController {
	
	@Autowired
	AdministradorPruebasWISC administradorPruebasWISC;
	
	@RequestMapping(value = "/diseno-cubos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarDisenioCubos(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarDisenioCubos(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
}
