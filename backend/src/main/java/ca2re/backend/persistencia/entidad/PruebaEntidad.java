package ca2re.backend.persistencia.entidad;

import java.util.Calendar;
import java.util.List;

import ca2re.backend.dominio.EdadPersona;
import ca2re.backend.dominio.Persona;
import ca2re.backend.dominio.RamaDelConocimiento;

public class PruebaEntidad {
	private String tipoPrueba;
	private List<RamaDelConocimiento> ramaDelConocimiento;
	private String nombreExaminador;
	private Persona evaluado;
	private Calendar fechaEvaluacion;
	private EdadPersona edadEvaluado;

	public PruebaEntidad() {}
	public PruebaEntidad(List<RamaDelConocimiento> ramasDelConocimiento, String nombreExaminador, Persona evaluado,
			Calendar fechaEvaluacion, EdadPersona edadEvaluado, String tipoPrueba) {
		super();
		this.tipoPrueba = tipoPrueba;
		this.ramaDelConocimiento = ramasDelConocimiento;
		this.nombreExaminador = nombreExaminador;
		this.evaluado = evaluado;
		this.fechaEvaluacion = fechaEvaluacion;
		this.edadEvaluado = edadEvaluado;
	}

	public String getNombreExaminador() {
		return nombreExaminador;
	}

	public void setNombreExaminador(String nombreExaminador) {
		this.nombreExaminador = nombreExaminador;
	}

	public Persona getEvaluado() {
		return evaluado;
	}

	public void setEvaluado(Persona evaluado) {
		this.evaluado = evaluado;
	}

	public Calendar getFechaEvaluacion() {
		return fechaEvaluacion;
	}

	public void setFechaEvaluacion(Calendar fechaEvaluacion) {
		this.fechaEvaluacion = fechaEvaluacion;
	}

	public EdadPersona getEdadEvaluado() {
		return edadEvaluado;
	}

	public void setEdadEvaluado(EdadPersona edadEvaluado) {
		this.edadEvaluado = edadEvaluado;
	}

	public List<RamaDelConocimiento> getRamaDelConocimiento() {
		return ramaDelConocimiento;
	}

	public void setRamaDelConocimiento(List<RamaDelConocimiento> ramaDelConocimiento) {
		this.ramaDelConocimiento = ramaDelConocimiento;
	}

	public String getTipoPrueba() {
		return tipoPrueba;
	}

	public void setTipoPrueba(String tipoPrueba) {
		this.tipoPrueba = tipoPrueba;
	}
}
