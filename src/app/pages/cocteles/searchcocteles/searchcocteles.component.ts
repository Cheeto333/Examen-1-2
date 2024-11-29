import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'cocktail-search',
    standalone: true,
    imports: [],
    template: `
    <div class="col-12">
        <div class="input-group mb-3">
            <input 
                #txtSearch
                type="text" 
                class="form-control" 
                placeholder="Escribe el nombre del cóctel" 
                aria-label="Escribe el nombre del cóctel" 
                (keydown.enter)="searchCocktail(txtSearch.value)"
                aria-describedby="button-addon2"
            >
            <button 
                class="btn btn-outline-secondary" 
                type="button" 
                (click)="searchCocktail(txtSearch.value)"
                id="button-addon2"
            >
                <i class="bi bi-search"></i>
            </button>
        </div>
    </div>
    `,
    styles: [`
        /* Aquí puedes añadir estilos específicos si los necesitas */
    `]
})
export class SearchCocktailComponent {
    @Output() public eventSearch = new EventEmitter<string>();

    searchCocktail(termino: string): void {
        const termSearch = termino.toString().trim();
        // Puedes descomentar la siguiente línea para evitar búsquedas vacías
        // if (termSearch.length === 0) return;

        this.eventSearch.emit(termSearch);
    }
}

