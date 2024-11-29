import { Component, EventEmitter, Output } from '@angular/core';
import { CharactersResponse } from '../interfaces/dbz';
import { DbzService } from '../services/dbz.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewPokemon = new EventEmitter<CharactersResponse>();
  constructor(
    private _srvDbz: DbzService
  ) { }

  get nextUrl(): string | null {
    return this._srvDbz.nextURL
  }

  get previust(): string | null {
    return this._srvDbz.previousURL
  }

  loadPokemon(url: string) {
    console.log(url)
    this._srvDbz.getCharacters(url).subscribe(pokemonsAll => {
      console.log(url)
          this._srvDbz.nextURL = pokemonsAll.links.next
          this._srvDbz.previousURL = pokemonsAll.links.previous
          this.eventNewPokemon.emit(pokemonsAll)
    })
  }
}
