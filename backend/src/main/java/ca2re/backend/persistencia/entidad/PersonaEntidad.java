package ca2re.backend.persistencia.entidad;

import java.util.Calendar;

public class PersonaEntidad {
	private String nombreCompleto;
	private Calendar fechaDeNacimiento;

	public PersonaEntidad(String nombreCompleto, Calendar fechaDeNacimiento) {
		super();
		this.nombreCompleto = nombreCompleto;
		this.fechaDeNacimiento = fechaDeNacimiento;
	}

	public String getNombreCompleto() {
		return nombreCompleto;
	}

	public void setNombreCompleto(String nombreCompleto) {
		this.nombreCompleto = nombreCompleto;
	}

	public Calendar getFechaDeNacimiento() {
		return fechaDeNacimiento;
	}

	public void setFechaDeNacimiento(Calendar fechaDeNacimiento) {
		this.fechaDeNacimiento = fechaDeNacimiento;
	}
}
