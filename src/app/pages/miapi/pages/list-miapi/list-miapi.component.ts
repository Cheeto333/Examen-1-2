import { Component, OnInit } from '@angular/core';
import { Tareas } from './interface/tareas';
import { TareasService } from './services/tareas.service';
import { ListaTareasComponent } from "./lista-tareas/lista-tareas.component";

@Component({
  selector: 'miapi-list-miapi',
  standalone: true,
  imports: [ListaTareasComponent],
  templateUrl: './list-miapi.component.html',
  styleUrl: './list-miapi.component.css'
})
export class ListMiapiComponent implements OnInit{
  tareasAll:Tareas | undefined
  constructor(private _srvTareas:TareasService){}

  ngOnInit(): void {
    this._srvTareas.getTareas().subscribe(tarea =>{
      this.tareasAll = tarea
    })
  }
}
