import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../../pages/pokemon/services/pokemon.service';
import { NgClass } from '@angular/common';

import { Pokemons } from '../../pages/pokemon/interfaces/pokemons';


@Component({
  selector: 'pokemon-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewPokemons = new EventEmitter<Pokemons>();
  constructor(
    private _srvPokemon: PokemonService
  ) { }

  get nextURL():string | null{
    return this._srvPokemon.nextURL;
  }

  get previousURL():string | null{
    return this._srvPokemon.previousURL;
  }

  loadPokemons(url:string){
    this._srvPokemon.getPokemons(url).subscribe((pokemonsAll) => {
      pokemonsAll.results.forEach((pokemon) => {
        this._srvPokemon.getpokemon(pokemon.name).subscribe((pokemonData) => {
          pokemon.data = pokemonData;
          this._srvPokemon.nextURL = pokemonsAll.next;
          this._srvPokemon.previoustURL = pokemonsAll.previous;
          this.eventNewPokemons.emit(pokemonsAll);
        });
      });
    });
  }

}
