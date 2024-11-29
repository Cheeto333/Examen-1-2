import { Component, EventEmitter, Output } from '@angular/core';
import { Pokemons } from '../interfaces/pokemons';
import { PokemonService } from '../services/pokemon.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
    @Output() public eventNewPokemon = new EventEmitter<Pokemons>();
  constructor(
    private _srvPokemons:PokemonService
  ){ }

  get nextUrl():string | null{
    return this._srvPokemons.nextUrl
  }

  get previust():string | null{
    return this._srvPokemons.previustUrl
  }

  loadPokemon(url:string){
    this._srvPokemons.getPokemons(url).subscribe(pokemonsAll =>{
      console.log(url)
      pokemonsAll.results.forEach(pokemon => {
        this._srvPokemons.getpokemon(pokemon.name).subscribe(poke =>{
          pokemon.data = poke
          this._srvPokemons.nextUrl = pokemonsAll.next
          this._srvPokemons.previustUrl = pokemonsAll.previous
          this.eventNewPokemon.emit(pokemonsAll)
        })
      })
    })
  }
}
