import { Component } from '@angular/core';
import { NavegacionComponent } from '../../shared/components/navegacion/navegacion.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { Categoria } from '../../core/models/categoria';
import { CategoriaService } from '../../core/services/categoria.service';


@Component({
  selector: 'app-home',
  imports: [NavegacionComponent, CommonModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
  
})
export class HomeComponent {
  categoria: string = 'All';
  categorias:Categoria[] = [];

  constructor(private categoriaService:CategoriaService){
    this.listarCategorias();
  }

  setCategoria(nombre: string) {
    this.categoria = this.categoria === nombre ? 'All' : nombre;
  }
  listarCategorias(){
    this.categoriaService.listarCategorias().subscribe({
      next:(res)=>{
        this.categorias=res;
      }, 
      error:(err)=>{
        console.error(err);
        alert("Hubo un error listando las categorias")
      }
    })
  }
}
