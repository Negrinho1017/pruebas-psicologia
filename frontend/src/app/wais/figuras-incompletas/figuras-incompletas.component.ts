import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-figuras-incompletas',
  templateUrl: './figuras-incompletas.component.html',
  styleUrls: ['./figuras-incompletas.component.css']
})
export class FigurasIncompletasComponent implements OnInit {
  siguienteReactivo: number = 4;
  anteriorReactivo: number = 4;
  reactivos: String [] = ["M. Peine","1. Mesa","2. Espejo","3. Cara","* 4. Lentes","5. Jarra","* 6. Trotar", "7. Cuchillo","8. Árboles","9. Vaca","10. Casilleros","11. Pastel","12. Rosas","13. Cerca", "14. Karate","15. Caminata","16. Zapatos","17. Charco","18. Tienda de campaña","19. Librero","20. Automóvil","21. Avión", "22. Canasta", "23. Estufa", "24, Granja"];
  habilitaReactivo: boolean[] = [true, true, true, true, true, true, false, false, false];  

  constructor() { }

  ngOnInit() {
  }

  getReactivoSiguiente(): number {
    return this.siguienteReactivo;
  }

  habilitarReactivo(i): boolean {    
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return i < 8 ? this.habilitaReactivo[i] : false;
  }

}
