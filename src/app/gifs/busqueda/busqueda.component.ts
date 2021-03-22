import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  constructor( private gifsService: GifsService) {

  }

  // Hacer que el input se vacie al momento de orpimir enter
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(){
    // obtener valor de el input
    const valor = this.txtBuscar.nativeElement.value;
    
    if( valor.trim().length == 0){
      return;
    }
    this.gifsService.buscarGifs( valor );
    
    //Borrar el valor de la caja de texto(Limpiar input)
    this.txtBuscar.nativeElement.value = '';

  }


}
