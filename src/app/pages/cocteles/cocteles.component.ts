import { Component, OnInit } from '@angular/core';
import { CardCoctelesComponent } from './cardcocteles/cardcocteles.component';
import { Coctel, Cocteles } from './interfaces/cocteles'; 
import { CoctelesService } from './services/cocteles.service'; 
import { PaginacionCoctelComponent } from '../../componente/paginacion/paginacioncoctel.component';
import { SearchCocktailComponent } from './searchcocteles/searchcocteles.component';

@Component({
  selector: 'app-coctel',
  standalone: true,
  imports: [CardCoctelesComponent, PaginacionCoctelComponent, SearchCocktailComponent],
  templateUrl: './cocteles.component.html',
  styleUrls: ['./cocteles.component.css'] 
})
export class CoctelesComponent implements OnInit {
  cocktails: Cocteles | undefined; 

  constructor(
    private _srvCocktail: CoctelesService 
  ) {}

  ngOnInit(): void {
    this._srvCocktail.getCocteles().subscribe((cocktailsAll) => {
      cocktailsAll.drinks.forEach((coltel)=>{
        this._srvCocktail.getCoctel(coltel.strDrink).subscribe((cocteldata)=>{
          coltel = cocteldata;
          console.log(coltel);
        })
      })
      this.cocktails = cocktailsAll;
      console.log(this.cocktails);
      
    });
  }

  setNewCocktail(cocktailsNews: Cocteles): void {
    this.cocktails = cocktailsNews;
  }

  searchCocktail(termino: string): void {
    if (termino) {
      this._srvCocktail.getCoctel(termino).subscribe((cocktail:Coctel) => {
        this.cocktails = {
          
          drinks: [cocktail]
        };
      });
    } else {
      this.ngOnInit(); 
    }
  }
}

