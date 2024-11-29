import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'dbz-search',
    standalone: true,
    imports: [],
    template: `
    <div class="col-12">
        <div class="input-group mb-3">
            <input 
                #txtSearch
                type="text" 
                class="form-control" 
                placeholder="Escribe el nombre del personaje" 
                aria-label="Escribe el nombre del personaje" 
                (keydown.enter)="searchCharacter(txtSearch.value)"
                aria-describedby="button-addon2"
            >
            <button 
                class="btn btn-outline-secondary" 
                type="button" 
                (click)="searchCharacter(txtSearch.value)"
                id="button-addon2"
            >
                <i class="bi bi-search"></i>
            </button>
        </div>
    </div>
    `,
    styles: [`
       
    `]
})
export class SearchComponentDB {
    @Output() public eventSearch2 = new EventEmitter<string>();

    searchCharacter(termino: string): void {
        const termSearch = termino.toString().trim();
        

        this.eventSearch2.emit(termSearch);
    }
}
