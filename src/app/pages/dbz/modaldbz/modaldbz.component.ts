import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { Character } from "../interfaces/dbz"; 

@Component({
    selector: 'dbz-modal',
    standalone: true,
    imports: [NgFor, TitleCasePipe, NgIf],
    templateUrl: './modaldbz.component.html',
    styles: []
})
export class ModalDbzComponent {
    @Input() public character: Character = {
        id: 0,
        name: '',
        ki: '',
        maxKi: '',
        race: '',
        gender: '',
        description: '',
        image: '',
        affiliation: '',
        deletedAt: null,
        originPlanet: {
            id: 0,
            name: '',
            isDestroyed: false,
            description: '',
            image: '',
            deletedAt: null,
        },
        transformations: []
    } as Character;

    private bootstrapModal: any;

    @ViewChild('modalElement2') public modalElement2!: ElementRef;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initializeModal();
        }
    }

    initializeModal(): void {
        import('bootstrap').then((bootstrap) => {
            this.bootstrapModal = new bootstrap.Modal(this.modalElement2.nativeElement);
        });
    }

    open(character: Character): void {
        this.character = character;
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

