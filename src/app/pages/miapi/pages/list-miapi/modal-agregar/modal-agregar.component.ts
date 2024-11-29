import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Tarea } from '../interface/tareas';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './modal-agregar.component.html',
  styleUrl: './modal-agregar.component.css'
})
export class ModalAgregarComponent {
  @Input() tareas: Tarea[] = [];  // Suponiendo que tareas es una lista de tareas
  @Output() tareaAgregada = new EventEmitter<Tarea>();

  nuevaTarea: Tarea = {
    titulo: '',
    descripcion: '',
    completada: false,
    fechaCreacion: new Date(),
  };

  private bootstrapModal: any;

  @ViewChild('modalElement') public modalElement2!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _srvTarea: TareasService) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modalElement2.nativeElement);
    });
  }

  open(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close(): void {
    this.bootstrapModal.hide();
  }

  // Método para agregar tarea
  agregarTarea(form: NgForm): void {
    if (form.valid) {
      this._srvTarea.postTareas(this.nuevaTarea).subscribe({
        next: (tarea) => {
          this.tareaAgregada.emit(tarea);  // Emitir la tarea agregada
          this.close();
          form.reset();  // Limpiar el formulario
        },
        error: (err) => {
          console.error('Error al agregar tarea', err);
        }
      });
    }
  }
}