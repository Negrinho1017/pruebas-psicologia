import { Subprueba } from "./Subprueba";

export class RamaDelConocimiento {
    public nombre: String;
	public subpruebas: Subprueba[];
	public puntuacionTotal: number;
	public puntuacionCompuesta: number;
	public rangoPercentil: number;
	public intervaloConfianza: String;
}
