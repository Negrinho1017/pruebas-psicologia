package ca2re.backend.dominio;

public class AnalisisProcesoWAIS {
	private String idEdad;
	private String[] dcbt;
	private String[] rdd;
	private String[] rdi;
	private String[] rds;
	
	public AnalisisProcesoWAIS(String idEdad, String[] dcbt, String[] rdd, String[] rdi, String[] rds) {
		super();
		this.idEdad = idEdad;
		this.dcbt = dcbt;
		this.rdd = rdd;
		this.rdi = rdi;
		this.rds = rds;
	}

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
