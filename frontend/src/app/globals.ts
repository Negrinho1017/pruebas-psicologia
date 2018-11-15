import { Injectable } from "@angular/core";
import { Prueba } from "./model/Prueba";

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
    clavesNatural: number;
    indices: number[] = [];
    edad: number;
    rutas: String[] = [];
    datosSeleccionados: boolean;
    subpruebas: string[] = [];
    disenoCubos: number;
    disenoCubosSinBonificacionTiempo: number = 8;
    prueba: Prueba;
}