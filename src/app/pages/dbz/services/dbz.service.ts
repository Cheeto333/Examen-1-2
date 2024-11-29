import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharactersResponse } from '../interfaces/dbz';

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private apiURLBase: string = 'https://dragonball-api.com/api/characters/';
  private next: string | null = null;
  private previous: string | null = null;

  constructor(private http: HttpClient) { }

  getCharacters(url: string = this.apiURLBase): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(url);
  }

  getCharacter(termino: string | number): Observable<Character> {
    return this.http.get<Character>(`${this.apiURLBase}${termino}`);
  }

  set nextURL(url: string | null) {
    this.next = url;
  }

  set previousURL(url: string | null) {
    this.previous = url;
  }

  get nextURL(): string | null {
    return this.next;
  }

  get previousURL(): string | null {
    return this.previous;
  }
}
