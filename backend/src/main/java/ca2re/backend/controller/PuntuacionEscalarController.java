package ca2re.backend.controller;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.servicio.AdministradorPruebas;
import ca2re.backend.util.EdadUtil;

@RestController
@RequestMapping(value = "/puntuacion-escalar")
public class PuntuacionEscalarController {
	
	@Autowired
	AdministradorPruebas administradorPruebas;
	
	@RequestMapping(value = "/diseno-cubos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarDisenioCubos(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarDisenioCubos(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/semejanzas", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarSemejanzas(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarSemejanzas(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/retencion-digitos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarRetencionDigitos(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarRetencionDigitos(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/matrices", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarMatrices(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarMatrices(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/vocabulario", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarVocabulario(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarVocabulario(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/aritmetica", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarAritmetica(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarAritmetica(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/busqueda-simbolos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarBusquedaSimbolos(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarBusquedaSimbolos(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/rompecabezas-visual", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarRompecabezasVisual(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarRompecabezasVisual(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/informacion", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarInformacion(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarInformacion(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/claves", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarClaves(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarClaves(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/numeros-letras", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarNumerosLetras(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarNumerosLetras(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/peso-figurado", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarPesoFigurado(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarPesoFigurado(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/comprension", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarComprension(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarComprension(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/cancelacion", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarCancelacion(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarNumerosLetras(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
	
	@RequestMapping(value = "/figuras-incompletas", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarFigurasIncompletas(@RequestParam int edad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarNumerosLetras(EdadUtil.obtenerIdEdad(edad), puntuacionNatural);
	}
}
