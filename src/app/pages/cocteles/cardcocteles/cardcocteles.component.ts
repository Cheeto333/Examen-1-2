import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ModalCoctelesComponent } from '../modaldcocteles/modaldcocteles.component';
import { Coctel, Cocteles } from '../interfaces/cocteles'; 

@Component({
  selector: 'cocktail-card',
  standalone: true,
  imports: [NgIf, NgFor, ModalCoctelesComponent],
  templateUrl: './cardcocteles.component.html', 
  styleUrls: ['./cardcocteles.component.css'] 
})
export class CardCoctelesComponent implements OnChanges {
  @Input() public cocktailsAll: Cocteles | undefined; 
  @ViewChild(ModalCoctelesComponent) public modal!: ModalCoctelesComponent;
  imagenLoaded: boolean = false;
  selectedCocktail!: Coctel; 


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cocktailsAll']) {
      this.imagenLoaded = false;
    }
  }

  openModal(cocktail: Coctel): void {
    if (this.modal) {
      this.modal.open(cocktail);
    }
  }
}
