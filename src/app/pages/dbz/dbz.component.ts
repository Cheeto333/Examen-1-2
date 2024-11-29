import { Component, OnInit, ViewChild } from '@angular/core';
import { CarddbzComponent } from './carddbz/carddbz.component'; // Asegúrate de que el nombre sea correcto
import { Character,CharactersResponse } from './interfaces/dbz';
import { DbzService } from './services/dbz.service'; // Asegúrate de que el nombre del servicio sea correcto

import { SearchComponentDB } from './searchdbz/searchdbz.component';
import { ModalDbzComponent } from './modaldbz/modaldbz.component';
import { PaginacionComponent } from './paginacion/paginacion.component';

@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [CarddbzComponent, PaginacionComponent, SearchComponentDB],
  templateUrl: './dbz.component.html',
  styleUrls: ['./dbz.component.css'] 
})
export class DbzComponent implements OnInit {
  charactersResponse: CharactersResponse | undefined; 
  @ViewChild('modalComponent') modalComponent!: ModalDbzComponent;
  constructor(private _srvDbz: DbzService) {}

  ngOnInit(): void {
    this._srvDbz.getCharacters().subscribe((charactersAll) => {
      this.charactersResponse = charactersAll;
      this._srvDbz.nextURL = charactersAll.links.next
      this._srvDbz.previousURL = charactersAll.links.previous
    });
  }

  setNewCharacter(charactersNews: CharactersResponse): void {
    this.charactersResponse = charactersNews;
  }
   openModal(character: Character): void {
    this.modalComponent.open(character); // Llama al método open en el modal
  }
  searchCharacter(termino: string): void {
    console.log(termino)
    if (termino) {
      this._srvDbz.getCharacter(termino).subscribe((character: Character) => {
        this.charactersResponse = {
          items: [character], 
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 1,
            totalPages: 1,
            currentPage: 1
          },
          links: {
            first: '',
            previous: null,
            next: null,
            last: ''
          }
        };
      });
    } else {
      this.ngOnInit(); 
    }
  }
}

