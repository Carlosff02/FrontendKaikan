import { Component, Input } from '@angular/core';
import { Plato } from '../../../core/models/plato';
import { PlatoService } from '../../../core/services/plato.service';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  platos: Plato[] = [] 
  @Input() categoria: string = ''; 
  hoy = new Date();
  constructor(private platoService: PlatoService
  ){

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
