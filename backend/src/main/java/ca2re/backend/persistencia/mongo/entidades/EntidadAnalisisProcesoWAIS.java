package ca2re.backend.persistencia.mongo.entidades;

public class EntidadAnalisisProcesoWAIS {
	private String idEdad;
	private String[] dcbt;
	private String[] rdd;
	private String[] rdi;
	private String[] rds;

	public String getIdEdad() {
		return idEdad;
	}

	public void setIdEdad(String idEdad) {
		this.idEdad = idEdad;
	}

	public String[] getDcbt() {
		return dcbt;
	}

	public void setDcbt(String[] dcbt) {
		this.dcbt = dcbt;
	}

	public String[] getRdd() {
		return rdd;
	}

	public void setRdd(String[] rdd) {
		this.rdd = rdd;
	}

	public String[] getRdi() {
		return rdi;
	}

	public void setRdi(String[] rdi) {
		this.rdi = rdi;
	}

	public String[] getRds() {
		return rds;
	}

	public void setRds(String[] rds) {
		this.rds = rds;
	}		
}
