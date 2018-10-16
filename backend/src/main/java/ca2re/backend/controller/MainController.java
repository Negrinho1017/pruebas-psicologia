package ca2re.backend.controller;

import java.text.ParseException;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.dominio.Persona;
import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.Reactivo;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.persistencia.PruebaWaisDAO;
import ca2re.backend.servicio.AdministradorPruebas;
import ca2re.backend.servicio.CalificadorPrueba;
import ca2re.backend.util.EdadUtil;
import ca2re.backend.util.FechaUtil;

@RestController
@CrossOrigin
@RequestMapping(value = "/")
public class MainController {
	
	@Autowired
	public PruebaWaisDAO pruebaWaisDAO;
	
	@Autowired
	AdministradorPruebas administradorPruebas;	
	
	@RequestMapping(value = "/edad", method = RequestMethod.GET)
	@ResponseBody
	public EdadPersona obtenerEdadPersona(@RequestParam String fechaNacimiento, @RequestParam String fechaEvaluacion) throws ParseException {
		Calendar fechaNacimientoConvertida = FechaUtil.convertirDeStringACalendar(fechaNacimiento);
		Calendar fechaEvaluacionConvertida = FechaUtil.convertirDeStringACalendar(fechaEvaluacion);
		return EdadUtil.calcularEdad(fechaEvaluacionConvertida, fechaNacimientoConvertida);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public String hola() {
		return "hola";
	}
	
	@RequestMapping(value = "/creacion-prueba", method = RequestMethod.POST)
	@ResponseBody
	public Prueba crearPrueba(@RequestBody Prueba prueba) {
		return pruebaWaisDAO.guardarPruebaWais(prueba);
	}
	
	@RequestMapping(value = "/prueba-por-id", method = RequestMethod.GET)
	@ResponseBody
	public Prueba obtenerPruebaPorId(@RequestParam String idEvaluado) throws ParseException {
		return pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
	}
	
	@RequestMapping(value = "/creacion-subprueba/{idEvaluado}", method = RequestMethod.PUT)
	@ResponseBody
	public Prueba ingresarReactivo(@RequestBody Subprueba subprueba,
			@PathVariable(value = "idEvaluado") String idEvaluado) {
		Prueba prueba = administradorPruebas.ingresarSubprueba(subprueba, idEvaluado);
		return pruebaWaisDAO.actualizarPrueba(prueba, idEvaluado);
	}
	
	/*@RequestMapping(value = "/creacion-reactivo", method = RequestMethod.PUT)
	@ResponseBody
	public void ingresarReactivo(@RequestBody Reactivo reactivo, @RequestBody String idEvaluado) {
		Prueba prueba = pruebaWaisDAO.obtenerPruebaPorIdEvaluado(idEvaluado).get(0);
	}*/
}
