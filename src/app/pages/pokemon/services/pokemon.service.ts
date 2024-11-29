import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, Pokemons } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiURLBase:string = 'https://pokeapi.co/api/v2/pokemon/';
  private next:string | null = null;
  private previous:string | null = null; 

  constructor(
    private http: HttpClient
  ) { }



  getPokemons(url:string = this.apiURLBase): Observable<Pokemons>{
    return this.http.get<Pokemons>(url);
  }

  getpokemon(termino: string | number): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.apiURLBase}${termino}`);
  }

  set nextUrl(url:string|null){
    this.next = url
  }

  set previustUrl(url:string|null){
    this.previous = url
  }

  get nextUrl():string|null{
    return this.next
  }

  get previustUrl():string | null{
    return this.previous
  }
}
