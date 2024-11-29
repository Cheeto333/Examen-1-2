import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { Coctel } from "../interfaces/cocteles";

@Component({
    selector: 'modal-cocteles',
    standalone: true,
    imports: [NgFor, TitleCasePipe, NgIf],
    templateUrl: './modaldcocteles.component.html',
    styles: ``
})
export class ModalCoctelesComponent {
  @Input() public coctel: Coctel = {
    idDrink: '',
    strDrink: '',
    strDrinkAlternate: '',
    strTags: '',
    strVideo: '',
    strCategory: '',
    strIBA: '',
    strAlcoholic: '',
    strGlass: '',
    strInstructions: '',
    strInstructionsES: '',
    strInstructionsDE: '',
    strInstructionsFR: '',
    strInstructionsIT: '',
    strDrinkThumb: '',
    strIngredient1: '',
    strIngredient2: '',
    strIngredient3: '',
    strIngredient4: '',
    strIngredient5: '',
    strIngredient6: '',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strMeasure1: '',
    strMeasure2: '',
    strMeasure3: '',
    strMeasure4: '',
    strMeasure5: '',
    strMeasure6: '',
    strMeasure7: '',
    strMeasure8: '',
    strMeasure9: '',
    strMeasure10: '',
    strMeasure11: '',
    strMeasure12: '',
    strMeasure13: '',
    strMeasure14: '',
    strMeasure15: '',
    strImageSource: '',
    strImageAttribution: '',
    strCreativeCommonsConfirmed: '',
    dateModified: '',
  } as Coctel;

  private bootstrapModal: any;

  @ViewChild('modalElement') public modalElement!: ElementRef;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
    });
  }

  open(coctel: Coctel): void {
    this.coctel = coctel;
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close(): void {
    this.bootstrapModal.hide();
  }
}

