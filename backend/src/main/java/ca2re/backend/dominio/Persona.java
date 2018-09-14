package ca2re.backend.dominio;

public class Persona {
	private String id;
	private String nombreCompleto;
	private String fechaDeNacimiento;

	public Persona() {}
	public Persona(String id, String nombreCompleto, String fechaDeNacimiento) {
		super();
		this.nombreCompleto = nombreCompleto;
		this.fechaDeNacimiento = fechaDeNacimiento;
		this.id = id;
	}

	public String getNombreCompleto() {
		return nombreCompleto;
	}

	public void setNombreCompleto(String nombreCompleto) {
		this.nombreCompleto = nombreCompleto;
	}

	public String getFechaDeNacimiento() {
		return fechaDeNacimiento;
	}

	public void setFechaDeNacimiento(String fechaDeNacimiento) {
		this.fechaDeNacimiento = fechaDeNacimiento;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
}
