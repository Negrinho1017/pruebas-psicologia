package ca2re.backend;


import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ca2re.backend.dominio.Reactivo;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.servicio.CalificadorPrueba;

@SpringBootTest(classes = BackendApplication.class)
@RunWith(SpringRunner.class)
public class CalificadorPruebaTest {
	
	@Autowired
	CalificadorPrueba calificadorPrueba;
	
	@Test
	public void calificarReactivo() {
		Reactivo reactivo = new Reactivo();
		Reactivo reactivoCalificado = calificadorPrueba.calificarReactivo(reactivo, 2);
		assertEquals(2,reactivoCalificado.getPuntuacion());
	}
	
	@Test
	public void calificarSubprueba() {
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
