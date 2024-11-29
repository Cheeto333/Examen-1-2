import { Component, EventEmitter, Output } from '@angular/core';
import { DbzService } from '../../pages/dbz/services/dbz.service'; // Asegúrate de que esta ruta es correcta
import { NgClass } from '@angular/common';
import { CharactersResponse } from '../../pages/dbz/interfaces/dbz'; // Importa la interfaz correcta

@Component({
  selector: 'dbz-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginaciondbz.component.html',
  styleUrls: ['./paginacion.component.css'] // Asegúrate de que el nombre del archivo de estilo sea correcto
})
export class PaginacionDbzComponent {
  @Output() public eventNewCharacters = new EventEmitter<CharactersResponse>();

  constructor(private _srvDbz: DbzService) {}

  get nextURL(): string | null {
    return this._srvDbz.nextURL;
  }

  get previousURL(): string | null {
    return this._srvDbz.previousURL;
  }

  loadCharacters(url: string): void {
    this._srvDbz.getCharacters(url).subscribe((charactersAll: CharactersResponse) => {
      charactersAll.items.forEach((character) => {
        this._srvDbz.getCharacter(character.name).subscribe((characterData) => {
          character = characterData;
          this._srvDbz.nextURL = charactersAll.links.next;
          this._srvDbz.previousURL = charactersAll.links.previous;
          this.eventNewCharacters.emit(charactersAll);
        });
      });
    });
  }
}

