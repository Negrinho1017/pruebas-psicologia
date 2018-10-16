package ca2re.backend.controller;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.servicio.AdministradorPruebas;

@RestController
@CrossOrigin
@RequestMapping(value = "/puntuacion-escalar")
public class PuntuacionEscalarController {
	
	@Autowired
	AdministradorPruebas administradorPruebas;
	
	@RequestMapping(value = "/diseno-cubos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarDisenioCubos(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarDisenioCubos(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/semejanzas", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarSemejanzas(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarSemejanzas(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/retencion-digitos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarRetencionDigitos(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarRetencionDigitos(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/matrices", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarMatrices(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarMatrices(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/vocabulario", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarVocabulario(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarVocabulario(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/aritmetica", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarAritmetica(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarAritmetica(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/busqueda-simbolos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarBusquedaSimbolos(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarBusquedaSimbolos(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/rompecabezas-visual", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarRompecabezasVisual(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarRompecabezasVisual(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/informacion", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarInformacion(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarInformacion(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/claves", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarClaves(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarClaves(idEdad, puntuacionNatural);
	}
	
	@RequestMapping(value = "/numeros-letras", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarNumerosLetras(@RequestParam String idEdad, @RequestParam int puntuacionNatural) throws ParseException {
		return administradorPruebas.obtenerPuntuacionEscalarNumerosLetras(idEdad, puntuacionNatural);
	}
}
