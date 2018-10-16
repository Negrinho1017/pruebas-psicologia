package ca2re.backend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.Test;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.util.EdadUtil;
import ca2re.backend.util.Operaciones;
import ca2re.backend.util.CalculadorDePuntuacionEscalar;

public class UtilTest {
	@Test
	public void calcularEdadAlejo() {
		Calendar fechaEvaluacion = Calendar.getInstance();
		Calendar fechaNacimiento = Calendar.getInstance();
		fechaNacimiento.set(1996, Calendar.APRIL, 26);
		fechaEvaluacion.set(2018, Calendar.SEPTEMBER, 10);
		EdadPersona edadPersona = new EdadPersona(14, 4, 22);
		assertEquals(edadPersona.getAnios(),
				EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getAnios());
		assertEquals(edadPersona.getDias(), EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getDias());
		assertEquals(edadPersona.getMeses(),
				EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getMeses());
	}

	@Test
	public void calcularEdadCarras() {
		Calendar fechaEvaluacion = Calendar.getInstance();
		Calendar fechaNacimiento = Calendar.getInstance();
		fechaNacimiento.set(1995, Calendar.JULY, 22);
		fechaEvaluacion.set(2018, Calendar.SEPTEMBER, 10);
		assertEquals(23, EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getAnios());
		assertEquals(18, EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getDias());
		assertEquals(1, EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getMeses());
	}

	@Test
	public void calcularEdadCamilo() {
		Calendar fechaEvaluacion = Calendar.getInstance();
		Calendar fechaNacimiento = Calendar.getInstance();
		fechaNacimiento.set(1994, Calendar.NOVEMBER, 12);
		fechaEvaluacion.set(2018, Calendar.SEPTEMBER, 10);
		assertEquals(23, EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getAnios());
		assertEquals(28, EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getDias());
		assertEquals(9, EdadUtil.calcularEdad(fechaEvaluacion, fechaNacimiento).getMeses());
	}
	
	@Test
	public void obtenerLimites() {
		String[] limites = CalculadorDePuntuacionEscalar.crearRango("39-50");
		assertEquals("39", limites[0]);
		assertEquals("50", limites[1]);
	}
	
	@Test
	public void estaEnElRango() {
		String rango = "39-50";
		assertTrue(CalculadorDePuntuacionEscalar.estaEnElRango(41, rango));
		assertFalse(CalculadorDePuntuacionEscalar.estaEnElRango(51, rango));
		assertTrue(CalculadorDePuntuacionEscalar.estaEnElRango(50, rango));
		assertTrue(CalculadorDePuntuacionEscalar.estaEnElRango(39, rango));
		assertFalse(CalculadorDePuntuacionEscalar.estaEnElRango(38, rango));
	}
	
	@Test
	public void calcularPuntuacionEscalar() {
		String[] rangos = {"0-10","11-20","21-30","31-40","41-50"};
		assertEquals(3, CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangos, 26));
		assertEquals(4, CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangos, 38));
		assertEquals(2, CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangos, 18));
		assertEquals(1, CalculadorDePuntuacionEscalar.obtenerPuntuacionEscalar(rangos, 1));
	}
	
	@Test
	public void calcularSiElValorEstaEnElRango() {
		int valor = 44;
		assertTrue(Operaciones.elValorEstaEnElRango(40, 50, valor));
		assertFalse(Operaciones.elValorEstaEnElRango(50, 60, valor));
		assertTrue(Operaciones.elValorEstaEnElRango(44, 60, valor));
		assertTrue(Operaciones.elValorEstaEnElRango(40, 44, valor));
	}
}
