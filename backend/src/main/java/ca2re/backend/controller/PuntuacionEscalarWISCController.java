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
	public int obtenerPuntuacionEscalarDisenioCubos(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarDisenioCubos(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/semejanzas", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarSemejanzas(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarSemejanzas(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/retencion-digitos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarRetencionDeDigitos(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarRetencionDigitos(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/conceptos-con-dibujos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarConceptosConDibujos(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarConceptosConDibujos(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/claves", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarClaves(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarClaves(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/vocabulario", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarVocabulario(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarVocabulario(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/numeros-letras", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarNumerosLetras(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarNumerosLetras(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/matrices", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarMatrices(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarMatrices(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/comprension", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarComprension(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarComprension(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/busqueda-simbolos", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarBusquedaSimbolos(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarBusquedaSimbolos(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/figuras-incompletas", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarFigurasIncompletas(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarFigurasIncompletas(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/registros", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarRegistros(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarRegistros(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/informacion", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarInformacion(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarInformacion(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/aritmetica", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarAritmetica(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarAritmetica(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
	
	@RequestMapping(value = "/pistas", method = RequestMethod.GET)
	@ResponseBody
	public int obtenerPuntuacionEscalarPistas(@RequestParam int edad, @RequestParam int puntuacionNatural, @RequestParam int meses) throws ParseException {
		return administradorPruebasWISC.obtenerPuntuacionEscalarPistas(EdadUtil.obtenerIdEdadWISC(edad, meses), puntuacionNatural);
	}
}
