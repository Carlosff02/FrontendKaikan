import { Component,  Input, SimpleChanges } from '@angular/core';
import { Plato } from '../../../core/models/plato';
import { PlatoService } from '../../../core/services/plato.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  platos: Plato[] = [] 
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
    this.platoService.listarPlatos().subscribe({
      next: (response) => {
        this.platos = response;
      }
      , error: (error) =>{
        console.error('Error al listar los platos', error);
      }
    })
  }

  listarPlatosPorCategoria(){
    this.platoService.buscarPlatosPorCategoria(this.categoria).subscribe({
      next: (response) => {
        this.platos = response;
      }
      , error: (error) =>{
        console.error('Error al listar los platos', error);
      }
    })
  }
}
