import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'node:inspector';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = `${url}/api/categoria`

  constructor(private http:HttpClient) { 

  }

  listarCategorias(){
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
