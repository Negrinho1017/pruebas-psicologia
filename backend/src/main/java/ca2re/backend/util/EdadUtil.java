package ca2re.backend.util;

import java.util.Calendar;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.dominio.constantes.IdsRangoEdad;

public class EdadUtil {

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
	
	public static int obtenerRangoEdad(int edad) {
		if(Operaciones.elValorEstaEnElRango(16, 17, edad)) {
			return IdsRangoEdad.EDADES_16_17.getValue();
		}else if(Operaciones.elValorEstaEnElRango(18, 19, edad)) {
			return IdsRangoEdad.EDADES_18_19.getValue();
		}else if(Operaciones.elValorEstaEnElRango(20, 24, edad)) {
			return IdsRangoEdad.EDADES_20_24.getValue();
		}else if(Operaciones.elValorEstaEnElRango(25, 34, edad)) {
			return IdsRangoEdad.EDADES_25_34.getValue();
		}else if(Operaciones.elValorEstaEnElRango(35, 44, edad)) {
			return IdsRangoEdad.EDADES_35_44.getValue();
		}else if(Operaciones.elValorEstaEnElRango(45, 54, edad)) {
			return IdsRangoEdad.EDADES_45_54.getValue();
		}else if(Operaciones.elValorEstaEnElRango(55, 69, edad)) {
			return IdsRangoEdad.EDADES_55_69.getValue();
		}else if(Operaciones.elValorEstaEnElRango(70, 79, edad)) {
			return IdsRangoEdad.EDADES_70_79.getValue();
		}else if(Operaciones.elValorEstaEnElRango(80, 84, edad)) {
			return IdsRangoEdad.EDADES_80_84.getValue();
		}else if(Operaciones.elValorEstaEnElRango(85, 89, edad)) {
			return IdsRangoEdad.EDADES_85_89.getValue();
		}return IdsRangoEdad.EDADES_POR_DEFECTO.getValue();
	}
}
