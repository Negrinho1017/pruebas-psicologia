import { RamaDelConocimiento } from "./RamaDelConocimiento";
import { EdadPersona } from "./EdadPersona";
import { Persona } from "./Persona";

export class Prueba {
    public tipoPrueba: String;
	public ramaDelConocimiento: RamaDelConocimiento[];
	public nombreExaminador: String;
	public evaluado: Persona;
	public fechaEvaluacion: String;
    public edadEvaluado: EdadPersona;
}