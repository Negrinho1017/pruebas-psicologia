package ca2re.backend;


import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import ca2re.backend.dominio.CalificadorPrueba;
import ca2re.backend.dominio.Reactivo;
import ca2re.backend.dominio.Subprueba;

public class CalificadorPruebaTest {
	@Test
	public void calificarReactivo() {
		CalificadorPrueba calificadorPrueba = new CalificadorPrueba();
		Reactivo reactivo = new Reactivo();
		Reactivo reactivoCalificado = calificadorPrueba.calificarReactivo(reactivo, 2);
		assertEquals(2,reactivoCalificado.getPuntuacion());
	}
	
	@Test
	public void calificarSubprueba() {
		CalificadorPrueba calificadorPrueba = new CalificadorPrueba();
		Reactivo reactivo1 = new Reactivo(1, "Hola");
		Reactivo reactivo2 = new Reactivo(2, "Hola");
		Reactivo reactivo3 = new Reactivo(0, "Hola");
		Reactivo reactivo4 = new Reactivo(2, "Hola");
		Reactivo reactivo5 = new Reactivo(1, "Hola");
		List<Reactivo> reactivos = new ArrayList<>();
		reactivos.add(reactivo1);
		reactivos.add(reactivo2);
		reactivos.add(reactivo3);
		reactivos.add(reactivo4);
		reactivos.add(reactivo5);
		Subprueba subprueba = new Subprueba();
		assertEquals(6,calificadorPrueba.calificarSubprueba(reactivos, subprueba).getPuntuacionNatural());
	}
}
