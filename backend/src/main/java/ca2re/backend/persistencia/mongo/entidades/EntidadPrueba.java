package ca2re.backend.persistencia.mongo.entidades;

import java.util.List;

public class EntidadPrueba {
	private String tipoPrueba;
	private List<EntidadRamaDelConocimiento> ramaDelConocimiento;
	private String nombreExaminador;
	private EntidadPersona evaluado;
	private String fechaEvaluacion;
	private EntidadEdadPersona edadEvaluado;

	public String getTipoPrueba() {
		return tipoPrueba;
	}

	public void setTipoPrueba(String tipoPrueba) {
		this.tipoPrueba = tipoPrueba;
	}

	public List<EntidadRamaDelConocimiento> getRamaDelConocimiento() {
		return ramaDelConocimiento;
	}

	public void setRamaDelConocimiento(List<EntidadRamaDelConocimiento> ramaDelConocimiento) {
		this.ramaDelConocimiento = ramaDelConocimiento;
	}

	public String getNombreExaminador() {
		return nombreExaminador;
	}

	public void setNombreExaminador(String nombreExaminador) {
		this.nombreExaminador = nombreExaminador;
	}

	public EntidadPersona getEvaluado() {
		return evaluado;
	}

	public void setEvaluado(EntidadPersona evaluado) {
		this.evaluado = evaluado;
	}

	public String getFechaEvaluacion() {
		return fechaEvaluacion;
	}

	public void setFechaEvaluacion(String fechaEvaluacion) {
		this.fechaEvaluacion = fechaEvaluacion;
	}

	public EntidadEdadPersona getEdadEvaluado() {
		return edadEvaluado;
	}

	public void setEdadEvaluado(EntidadEdadPersona edadEvaluado) {
		this.edadEvaluado = edadEvaluado;
	}
}
