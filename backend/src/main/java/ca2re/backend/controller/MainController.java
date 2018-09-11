package ca2re.backend.controller;

import java.text.ParseException;
import java.util.Calendar;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.util.CalculadoraDeEdad;
import ca2re.backend.util.FechaUtil;

@RestController
@RequestMapping(value = "/")
public class MainController {
	public String[] reactivos = {"1. Libro", "2. Avión", "3. Canasta", "*4. Manzana", "5. Finalizar", "6. Cama",
			"*7. Guante"};
	
	@RequestMapping(value = "/reactivos-vocabulario", method = RequestMethod.GET)
	@ResponseBody
	@CrossOrigin
	public String[] mostrarReactivosVocabulario() {
		return reactivos;
	}
	
	@RequestMapping(value = "/edad", method = RequestMethod.GET)
	@ResponseBody
	@CrossOrigin
	public EdadPersona obtenerEdadPersona(@RequestParam String fechaNacimiento, @RequestParam String fechaEvaluacion) throws ParseException {
		Calendar fechaNacimientoConvertida = FechaUtil.convertirDeStringACalendar(fechaNacimiento);
		Calendar fechaEvaluacionConvertida = FechaUtil.convertirDeStringACalendar(fechaEvaluacion);
		return CalculadoraDeEdad.calcularEdad(fechaEvaluacionConvertida, fechaNacimientoConvertida);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public String hola() {
		return "hola";
	}
}
