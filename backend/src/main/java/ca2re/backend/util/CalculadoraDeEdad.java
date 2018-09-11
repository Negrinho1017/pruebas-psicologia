package ca2re.backend.util;

import java.util.Calendar;

import ca2re.backend.dominio.EdadPersona;

public class CalculadoraDeEdad {

	public static EdadPersona calcularEdad(Calendar fechaActual, Calendar fechaNacimiento) {
		int dias = fechaActual.get(Calendar.DAY_OF_MONTH) - fechaNacimiento.get(Calendar.DAY_OF_MONTH);
		int meses = fechaActual.get(Calendar.MONTH) - fechaNacimiento.get(Calendar.MONTH);
		int anios = fechaActual.get(Calendar.YEAR) - fechaNacimiento.get(Calendar.YEAR);
		if (dias < 0) {
			dias += 30;
			meses--;
		}
		if (meses < 0) {
			meses += 12;
			anios--;
		}
		return new EdadPersona(dias, meses, anios);
	}
}
