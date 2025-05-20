import { Component,  Input, SimpleChanges } from '@angular/core';
import { Plato } from '../../../core/models/plato';
import { PlatoService } from '../../../core/services/plato.service';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-menu',
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  platos: Plato[] = [] 
  isProcessing=false;
  @Input() categoria: string = ''; 
  constructor(private readonly platoService: PlatoService
  ){
    this.listarPlatos();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Cambios en el componente Menu:', changes);
    if (changes['categoria']) {
      if(this.categoria=='todos'){
        this.listarPlatos()
      } else{
        
      this.listarPlatosPorCategoria();
      }
    }
  }

  listarPlatos(){
    this.isProcessing=true;
    this.platoService.listarPlatos().subscribe({
      next: (response) => {
        this.isProcessing=false;
        this.platos = response;
      }
      , error: (error) =>{
        this.isProcessing=false;
        console.error('Error al listar los platos', error);
      }
    })
  }

  listarPlatosPorCategoria(){
    this.isProcessing=true;
    this.platoService.buscarPlatosPorCategoria(this.categoria).subscribe({
      next: (response) => {
        this.platos = response;
        this.isProcessing=false;
      }
      , error: (error) =>{
        console.error('Error al listar los platos', error);
        this.isProcessing=false;
      }
    })
  }
}
