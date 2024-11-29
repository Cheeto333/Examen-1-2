import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea, Tareas } from '../interface/tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  Url = 'http://localhost:3000/api/tareas'
  constructor(private http:HttpClient) { }

  getTareas():Observable<Tareas>{
    return this.http.get<Tareas>(`${this.Url}`)
  }

  postTareas( newElemento:Tarea):Observable<Tarea>{
    return this.http.post<Tarea>(`${this.Url}`, newElemento)
  }

  putTareas(id:String, newElemento:Tarea):Observable<Tarea>{
    return this.http.put<Tarea>(`${this.Url}/${id}`, newElemento)
  }

  deleteTareas(id:String):Observable<Tarea>{
    return this.http.delete<Tarea>(`${this.Url}/${id}`)
  }
}
