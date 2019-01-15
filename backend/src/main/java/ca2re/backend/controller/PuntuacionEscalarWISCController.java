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
	
	@RequestMapping(value = "/semejanzas", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarSemejanzas(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarSemejanzas(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/retencion-digitos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarRetencionDeDigitos(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarRetencionDigitos(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/conceptos-con-dibujos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarConceptosConDibujos(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarConceptosConDibujos(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/claves", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarClaves(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarClaves(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/vocabulario", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarVocabulario(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarVocabulario(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/numeros-letras", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarNumerosLetras(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarNumerosLetras(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/matrices", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarMatrices(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarMatrices(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
}
