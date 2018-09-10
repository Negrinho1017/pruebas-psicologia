package ca2re.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public String hola() {
		return "hola";
	}
}
