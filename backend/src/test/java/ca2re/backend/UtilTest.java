package ca2re.backend;

import static org.junit.Assert.assertEquals;

import java.util.Calendar;

import org.junit.Test;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.util.CalculadoraDeEdad;

public class UtilTest {
	@Test
	public void calcularEdadAlejo() {
		Calendar fechaEvaluacion = Calendar.getInstance();
		Calendar fechaNacimiento = Calendar.getInstance();
		fechaNacimiento.set(1996, Calendar.APRIL, 26);
		fechaEvaluacion.set(2018, Calendar.SEPTEMBER, 10);
		EdadPersona edadPersona = new EdadPersona(14, 4, 22);
		assertEquals(edadPersona.getAnios(),
				CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getAnios());
		assertEquals(edadPersona.getDias(), CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getDias());
		assertEquals(edadPersona.getMeses(),
				CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getMeses());
	}

	@Test
	public void calcularEdadCarras() {
		Calendar fechaEvaluacion = Calendar.getInstance();
		Calendar fechaNacimiento = Calendar.getInstance();
		fechaNacimiento.set(1995, Calendar.JULY, 22);
		fechaEvaluacion.set(2018, Calendar.SEPTEMBER, 10);
		assertEquals(23, CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getAnios());
		assertEquals(18, CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getDias());
		assertEquals(1, CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getMeses());
	}

	@Test
	public void calcularEdadCamilo() {
		Calendar fechaEvaluacion = Calendar.getInstance();
		Calendar fechaNacimiento = Calendar.getInstance();
		fechaNacimiento.set(1994, Calendar.NOVEMBER, 12);
		fechaEvaluacion.set(2018, Calendar.SEPTEMBER, 10);
		assertEquals(23, CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getAnios());
		assertEquals(28, CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getDias());
		assertEquals(9, CalculadoraDeEdad.calcularEdad(fechaEvaluacion, fechaNacimiento).getMeses());
	}
}
