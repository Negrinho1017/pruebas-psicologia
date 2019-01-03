package ca2re.backend.dominio;

public class SubpruebasAnalisisProceso {
	private Subprueba rdd;
	private Subprueba rdi;
	private Subprueba rds;
	private Subprueba dc;
	private Subprueba dcsbt;
	
	public SubpruebasAnalisisProceso(Subprueba rdd, Subprueba rdi, Subprueba rds, Subprueba dc, Subprueba dcsbt) {
		super();
		this.rdd = rdd;
		this.rdi = rdi;
		this.rds = rds;
		this.dc = dc;
		this.dcsbt = dcsbt;
	}

	public Subprueba getRdd() {
		return rdd;
	}

	public void setRdd(Subprueba rdd) {
		this.rdd = rdd;
	}

	public Subprueba getRdi() {
		return rdi;
	}

	public void setRdi(Subprueba rdi) {
		this.rdi = rdi;
	}

	public Subprueba getRds() {
		return rds;
	}

	public void setRds(Subprueba rds) {
		this.rds = rds;
	}

	public Subprueba getDc() {
		return dc;
	}

	public void setDc(Subprueba dc) {
		this.dc = dc;
	}

	public Subprueba getDcsbt() {
		return dcsbt;
	}

	public void setDcsbt(Subprueba dcsbt) {
		this.dcsbt = dcsbt;
	}
}
