import { Component, EventEmitter, Output } from '@angular/core';
import { CoctelesService } from '../../pages/cocteles/services/cocteles.service'; 
import { NgClass } from '@angular/common';

import { Cocteles } from '../../pages/cocteles/interfaces/cocteles'; 

@Component({
  selector: 'cocktail-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacioncoctel.component.html',
  styleUrls: ['./paginacion.component.css'] 
})
export class PaginacionCoctelComponent {
  @Output() public eventNewCocktails = new EventEmitter<Cocteles>(); 

  constructor(
    private _srvCocktail: CoctelesService 
  ) {}

  get nextURL(): string | null {
    return this._srvCocktail.nextURL; 
  }

  get previousURL(): string | null {
    return this._srvCocktail.previousURL; 
  }

  loadCocktails(url: string): void {
    this._srvCocktail.getCocteles(url).subscribe((cocktailsAll) => {
      cocktailsAll.drinks.forEach((cocktail) => {
        this._srvCocktail.getCoctel(cocktail.strDrink).subscribe((cocktailData) => {
          cocktail = cocktailData; 
          this.eventNewCocktails.emit(cocktailsAll); 
        });
      });
    });
  }
}


