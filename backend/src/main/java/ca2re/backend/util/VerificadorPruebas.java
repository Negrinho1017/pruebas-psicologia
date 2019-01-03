package ca2re.backend.util;

import java.util.List;

import ca2re.backend.dominio.Prueba;
import ca2re.backend.dominio.Subprueba;
import ca2re.backend.dominio.constantes.RamasDelConocimiento;
import ca2re.backend.dominio.constantes.Subpruebas;
import ca2re.backend.dominio.constantes.SubpruebasWisc;
import ca2re.backend.dominio.constantes.TiposPrueba;

public class VerificadorPruebas {
	private static final int RETENCION_DIGITOS = 6;
	private static final int DISENO_CUBOS = 3;
	private static final String COLLECTION_PRUEBA_WISC = "prueba_wisc";
	private static final String COLLECTION_PRUEBA_WAIS = "prueba_wais";

	public static boolean sonLas10SubpruebasPrincipales(List<Subprueba> subpruebas) {
		for(Subprueba subprueba: subpruebas) {
			if(subprueba.getNumeroSubprueba()>10) {
				return false;
			}
		}
		return true;
	}
	
	public static boolean seHizoDisenoCubos(List<Subprueba> subpruebas) {
		if(subpruebas.get(DISENO_CUBOS).getNumeroSubprueba()==Subpruebas.DISENO_DE_CUBOS.getValue()) {
			return true;
		}
		return false;
	}
	
	public static boolean seHizoRetencionDigitos(List<Subprueba> subpruebas) {
		if(subpruebas.get(RETENCION_DIGITOS).getNumeroSubprueba()==Subpruebas.RETENCION_DE_DIGITOS.getValue()) {
			return true;
		}
		return false;
	}
	
	public static String obtenerColeccionEnBD(String tipoPrueba) {
		return tipoPrueba.equals(TiposPrueba.WAIS.getValue()) ? COLLECTION_PRUEBA_WAIS : COLLECTION_PRUEBA_WISC;
	}
	
	public static boolean esSubpruebaDeMemoriaDeTrabajo(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.RETENCION_DE_DIGITOS.getValue()
				|| numeroSubprueba == Subpruebas.ARITMETICA.getValue()
				|| numeroSubprueba == Subpruebas.SUCESION_NUMEROS_LETRAS.getValue();
	}

	public static boolean esSubpruebaDeRazonamientoPerceptual(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.DISENO_DE_CUBOS.getValue()
				|| numeroSubprueba == Subpruebas.MATRICES.getValue()
				|| numeroSubprueba == Subpruebas.ROMPECABEZAS_VISUAL.getValue()
				|| numeroSubprueba == Subpruebas.PESO_FIGURADO.getValue()
				|| numeroSubprueba == Subpruebas.FIGURAS_INCOMPLETAS.getValue();
	}

	public static boolean esSubpruebaDeComprensionVerbal(int numeroSubprueba) {
		return numeroSubprueba == Subpruebas.SEMEJANZAS.getValue()
				|| numeroSubprueba == Subpruebas.VOCABULARIO.getValue()
				|| numeroSubprueba == Subpruebas.INFORMACION.getValue()
				|| numeroSubprueba == Subpruebas.COMPRENSION.getValue();
	}
	
	public static boolean esSubpruebaDeMemoriaDeTrabajoWisc(int numeroSubprueba) {
		return numeroSubprueba == SubpruebasWisc.RETENCION_DE_DIGITOS.getValue()
				|| numeroSubprueba == SubpruebasWisc.ARITMETICA.getValue()
				|| numeroSubprueba == SubpruebasWisc.SUCESION_NUMEROS_LETRAS.getValue();
	}

	public static boolean esSubpruebaDeRazonamientoPerceptualWisc(int numeroSubprueba) {
		return numeroSubprueba == SubpruebasWisc.DISENO_DE_CUBOS.getValue()
				|| numeroSubprueba == SubpruebasWisc.MATRICES.getValue()
				|| numeroSubprueba == SubpruebasWisc.CONCEPTOS_CON_DIBUJOS.getValue()
				|| numeroSubprueba == Subpruebas.FIGURAS_INCOMPLETAS.getValue();
	}

	public static boolean esSubpruebaDeComprensionVerbalWisc(int numeroSubprueba) {
		return numeroSubprueba == SubpruebasWisc.SEMEJANZAS.getValue()
				|| numeroSubprueba == SubpruebasWisc.VOCABULARIO.getValue()
				|| numeroSubprueba == SubpruebasWisc.INFORMACION.getValue()
				|| numeroSubprueba == SubpruebasWisc.COMPRENSION.getValue()
				|| numeroSubprueba == SubpruebasWisc.PISTAS.getValue();
	}
	
	public static boolean estaRetencionDeDigitos(Prueba prueba) {
		return prueba.getRamaDelConocimiento().get(RamasDelConocimiento.MEMORIA_DE_TRABAJO.getValue()).getSubpruebas().get(0).getNumeroSubprueba() == 3;
	}

	public static boolean estaDisenoDeCubos(Prueba prueba) {
		return prueba.getRamaDelConocimiento().get(RamasDelConocimiento.RAZONAMIENTO_PERCEPTUAL.getValue()).getSubpruebas().get(0).getNumeroSubprueba() == 1;
	}
	
}
