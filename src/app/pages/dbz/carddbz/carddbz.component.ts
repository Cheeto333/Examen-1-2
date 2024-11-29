import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Character, CharactersResponse } from '../interfaces/dbz';
import { NgFor, NgIf } from '@angular/common';
import { ModalDbzComponent } from '../modaldbz/modaldbz.component';

@Component({
  selector: 'app-carddbz',
  standalone: true,
  imports: [NgIf, NgFor, ModalDbzComponent],
  templateUrl: './carddbz.component.html',
  styleUrls: ['./carddbz.component.css']
})
export class CarddbzComponent implements OnChanges {
  @Input() public charactersAll: CharactersResponse | undefined;
  @ViewChild(ModalDbzComponent) public modal!: ModalDbzComponent;
  imagenLoaded: boolean = false;
  selectedCharacter!: CharactersResponse;

  
  delayedImageLoad() {
    setTimeout(() => {
      this.imagenLoaded = true;
    }, 3000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['charactersAll']) {
      this.imagenLoaded = false;
    }
  }

  openModal(character: Character): void {
    if (this.modal) {
      this.modal.open(character);
    }
  }
}
