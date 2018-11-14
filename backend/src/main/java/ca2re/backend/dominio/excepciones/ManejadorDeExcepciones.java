package ca2re.backend.dominio.excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ManejadorDeExcepciones {
	
	@ExceptionHandler(PruebasPsicologiaException.class)
	public ResponseEntity<Respuesta> manejarExcepcion(PruebasPsicologiaException ex) {
		Respuesta response = new Respuesta(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Throwable.class)
	public ResponseEntity<Respuesta> manejarExcepcionGeneral(Throwable ex) {
		Respuesta response = new Respuesta(HttpStatus.INTERNAL_SERVER_ERROR.value(),
				"Ha ocurrido un error en la aplicación");
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
}
