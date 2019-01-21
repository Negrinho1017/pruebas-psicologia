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
import ca2re.backend.servicio.AdministradorPruebas;
import ca2re.backend.servicio.CalificadorPrueba;

@SpringBootTest(classes = BackendApplication.class)
@RunWith(SpringRunner.class)
public class CalificadorPruebaTest {
	
	@Autowired
	CalificadorPrueba calificadorPrueba;
	
	@Autowired
	AdministradorPruebas administradorPruebas;
	
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
	
	@Test
	public void getPuntuacionesEscalares() {	
		int calificacionDisenioCubos = administradorPruebas.obtenerPuntuacionEscalarDisenioCubos("20:0-24:11", 43);
		int calificacionSemejanzas = administradorPruebas.obtenerPuntuacionEscalarSemejanzas("20:0-24:11", 25);
		int calificacionSemejanzas2 = administradorPruebas.obtenerPuntuacionEscalarSemejanzas("20:0-24:11", 18);
		int calificacionRetencionDigitos = administradorPruebas.obtenerPuntuacionEscalarRetencionDigitos("20:0-24:11", 27);
		assertEquals(9, calificacionDisenioCubos);
		assertEquals(13, calificacionSemejanzas);
		assertEquals(10, calificacionRetencionDigitos);
		assertEquals(9,calificacionSemejanzas2);
	}
	
	@Test
	public void getPuntuacionesCompuestas() {	
		int puntuacionCompuesta = administradorPruebas.obtenerPuntuacionCompuesta("ICV", 24);
		String intervaloConfianza = administradorPruebas.obtenerIntervaloConfianza("ICV", 24);
		double percentil = administradorPruebas.obtenerPercentil("ICV", 24);
		assertEquals(88, puntuacionCompuesta);
		assertEquals(21, percentil, 0);
		assertEquals("83-95", intervaloConfianza);
	}
	
	@Test
	public void getValoresCriticos() {	
		double valorCriticoICV_IRP = administradorPruebas.obtenerValoresCriticos(1,"WAIS").getValorCriticoICV_IRP();
		double valorCriticoICV_IMT = administradorPruebas.obtenerValoresCriticos(1,"WAIS").getValorCriticoICV_IMT();
		double valorCriticoICV_IVP = administradorPruebas.obtenerValoresCriticos(1,"WAIS").getValorCriticoICV_IVP();
		double valorCriticoIRP_IMT = administradorPruebas.obtenerValoresCriticos(1,"WAIS").getValorCriticoIRP_IMT();
		double valorCriticoIRP_IVP = administradorPruebas.obtenerValoresCriticos(1,"WAIS").getValorCriticoIRP_IVP();
		double valorCriticoIMT_IVP = administradorPruebas.obtenerValoresCriticos(1,"WAIS").getValorCriticoIMT_IVP();
		assertEquals(11.76, valorCriticoICV_IRP,0);
		assertEquals(12.82, valorCriticoICV_IMT,0);
		assertEquals(12.82, valorCriticoICV_IVP,0);
		assertEquals(13.48, valorCriticoIRP_IMT,0);
		assertEquals(13.48, valorCriticoIRP_IVP,0);
		assertEquals(14.41, valorCriticoIMT_IVP,0);
	}
}
