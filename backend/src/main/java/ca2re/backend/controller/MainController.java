package ca2re.backend.controller;

import java.text.ParseException;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.dominio.excepciones.PruebasPsicologiaException;
import ca2re.backend.servicio.AdministradorPruebas;
import ca2re.backend.util.EdadUtil;
import ca2re.backend.util.FechaUtil;

@RestController
@RequestMapping(value = "/")
public class MainController {
	
	@Autowired
	AdministradorPruebas administradorPruebas;	
	
	@RequestMapping(value = "/edad", method = RequestMethod.GET)
	@ResponseBody
	public EdadPersona obtenerEdadPersona(@RequestParam String fechaNacimiento, @RequestParam String fechaEvaluacion) throws ParseException {
		Calendar fechaNacimientoConvertida = FechaUtil.convertirDeStringACalendar(fechaNacimiento);
		Calendar fechaEvaluacionConvertida = FechaUtil.convertirDeStringACalendar(fechaEvaluacion);
		return EdadUtil.calcularEdad(fechaEvaluacionConvertida, fechaNacimientoConvertida);
	}
	
	@RequestMapping(value = "/creacion-prueba", method = RequestMethod.POST)
	@ResponseBody
	public Prueba crearPrueba(@RequestBody Prueba prueba) {
		return administradorPruebas.guardarPrueba(prueba);
	}
	
	@RequestMapping(value = "/prueba-por-id", method = RequestMethod.GET)
	@ResponseBody
	public Prueba obtenerPruebaPorId(@RequestParam String idEvaluado) throws PruebasPsicologiaException {
		return administradorPruebas.obtenerPruebaPorIdEvaluado(idEvaluado);
	}
	
	@RequestMapping(value = "/creacion-subprueba/{idEvaluado}", method = RequestMethod.PUT)
	@ResponseBody
	public Prueba ingresarReactivo(@RequestBody Subprueba subprueba,
			@PathVariable(value = "idEvaluado") String idEvaluado) {
		Prueba prueba = administradorPruebas.ingresarSubprueba(subprueba, idEvaluado);
		return administradorPruebas.actualizarPrueba(prueba, idEvaluado);
	}
	
	@RequestMapping(value = "/subpruebas", method = RequestMethod.GET)
	@ResponseBody
	public List<Subprueba> obtenerSubpruebasPorId(@RequestParam String idEvaluado) {
		return administradorPruebas.obtenerTodasLasSubpruebasPorIdentificacion(idEvaluado);
	}
	
	@RequestMapping(value = "/son-las-subpruebas-principales", method = RequestMethod.GET)
	@ResponseBody
	public boolean sonLas10SubpruebasPrincipales(@RequestParam String idEvaluado) {
		return administradorPruebas.verificarSiSonLas10SubpruebasPrincipales(idEvaluado);
	}
	
	@RequestMapping(value = "/se-hizo-retencion-digitos-y-diseno-cubos", method = RequestMethod.GET)
	@ResponseBody
	public boolean seHizoRetencionDigitosYDisenoCubos(@RequestParam String idEvaluado) {
		return administradorPruebas.verificarDisenoCubosYRetencionDigitos(idEvaluado);
	}
	
	@RequestMapping(value = "/edad-evaluado", method = RequestMethod.GET)
	@ResponseBody
	public int edadEvaluado(@RequestParam String idEvaluado) {
		return administradorPruebas.obtenerEdadEvaluado(idEvaluado);
	}
	
	@RequestMapping(value = "/es-permitido-el-usuario", method = RequestMethod.GET)
	@ResponseBody
	public boolean esPermitidoElUsuario(@RequestParam String idUsuario) {
		return administradorPruebas.esPermitidoElUsuario(idUsuario);
	}
	
	@RequestMapping(value = "/eliminar-prueba/{idEvaluado}", method = RequestMethod.DELETE)
	@ResponseBody
	public Prueba eliminarPrueba(@PathVariable(value = "idEvaluado") String idEvaluado) {
		return administradorPruebas.eliminarPrueba(idEvaluado);
	}
}
