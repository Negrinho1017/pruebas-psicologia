import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    idEvaluado: String;
    CITotal: number;
    CITCompuesta: number;
    mostrarNavBar: Boolean = false;
    idPrueba: number = 0;
    retencionDigitos: number;
    aritmetica: number;
    busquedaSimbolos: number;
    claves: number;
    indices: number[] = [];
    edad: number;
    rutas: String[] = [];
    datosSeleccionados: boolean;
    subpruebas: string[] = [];
}