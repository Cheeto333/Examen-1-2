import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { Tarea } from '../interface/tareas';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { TareasService } from '../services/tareas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-editar',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css'
})
export class ModalEditarComponent {
  @Input() tareaEditar: Tarea = {
    titulo: '',
    descripcion: '',
    completada: false,
    fechaCreacion: new Date(),
  };

  @Output() tareaEditada = new EventEmitter<Tarea>();

  tareaEdit: Tarea = { ...this.tareaEditar };

  private bootstrapModal: any;

  @ViewChild('modalEditElement') public modalEditElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _srvTarea: TareasService) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modalEditElement.nativeElement);
    });
  }

  open(tarea:Tarea): void {
    this.tareaEdit = tarea
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

  editarTarea(form: any): void {
    if (form.valid) {
      this._srvTarea.putTareas(this.tareaEdit._id!, this.tareaEdit).subscribe({
        next: () => {
          this.tareaEditada.emit();
          this.close();
        },
        error: (err) => {
          console.error('Error al editar tarea', err);
        }
      });
    }
  }
}
