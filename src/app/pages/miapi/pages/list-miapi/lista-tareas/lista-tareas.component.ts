import { Component, Input, ViewChild } from '@angular/core';
import { Tareas } from '../interface/tareas';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TareasService } from '../services/tareas.service';
import { ModalAgregarComponent } from '../modal-agregar/modal-agregar.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalAgregarComponent, ModalEditarComponent],
  templateUrl: './lista-tareas.component.html',
  styleUrl: './lista-tareas.component.css'
})
export class ListaTareasComponent {
  @Input() tareas: Tareas | undefined
  @ViewChild(ModalAgregarComponent) public modal!: ModalAgregarComponent
  @ViewChild(ModalEditarComponent) public modal2!: ModalEditarComponent
  constructor(private _srvTareas:TareasService){}

  actualizar(){
    this._srvTareas.getTareas().subscribe(tarea=>{
      this.tareas = tarea
    })
  }

  eliminar(id:string){
    this._srvTareas.deleteTareas(id).subscribe({
      next: nx => {
        this.actualizar()
      }
    })
  }
}
