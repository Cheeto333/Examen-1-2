import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocteles, Coctel } from '../interfaces/cocteles';

@Injectable({
  providedIn: 'root'
})
export class CoctelesService {
  private apiURLBase: string = 'https://www.thecocktaildb.com/api/json/v1/1/';
  private next: string | null = null;
  private previous: string | null = null;

  constructor(
    private http: HttpClient
  ) { }

  
  getCocteles(letter: string = 'a'): Observable<Cocteles> {
    return this.http.get<Cocteles>(`${this.apiURLBase}search.php?f=${letter}`);
  }

 
  getCoctel(id: string): Observable<Coctel> {
    return this.http.get<Coctel>(`${this.apiURLBase}search.php?s=${id}`);
  }

 
  set nextURL(url: string | null) {
    this.next = url;
  }

 
  set previousURL(url: string | null) {
    this.previous = url;
  }

  
  get previousURL(): string | null {
    return this.previous;
  }
}
