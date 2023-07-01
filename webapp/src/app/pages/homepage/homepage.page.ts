import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { PlayerController } from 'src/app/shared/components/player/player.controller';
import { errorTransform } from 'src/app/shared/pipes/error-transform';
import { LabelValue } from 'src/app/shared/models/label-value';

// aplicação
import { HomepageService } from './homepage.service';
import { getModoOptions, getModoTemperature } from './models/enums/modo';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.page.html',
    styleUrls: ['./homepage.page.scss'],
    providers: [
        HomepageService,
        PlayerController,
    ]
})
export class HomepageComponent implements OnInit {

    /**
     * @description FormControl de gênero
     */
    public ModoControl: FormControl;

    // enum options
    public modoOptions: LabelValue[];
    public modoFilteredOptions?: Observable<LabelValue[]>;

    // variáveis do template
    public loading: boolean;

    constructor(
        private snackBar: MatSnackBar,
        public playerController: PlayerController,
        public service: HomepageService,
    ) {
        this.ModoControl = new FormControl(null, { validators: Validators.required });
        this.modoOptions = getModoOptions();
        this.loading = false;
    }

    ngOnInit(): void {
        this.implementChanges();
    }

    private implementChanges() {
        this.modoFilteredOptions = this.ModoControl.valueChanges.pipe(
            startWith(''), map(value => this.filterModo(value)),
        );
    }

    /**
     * @description Busca um índice aleatório no JSON de dados
     */
    public generate() {
        this.ModoControl.updateValueAndValidity();

        if (!this.ModoControl.valid) { return; }
        if (this.playerController.melody && !this.playerController.rated) {
            this.snackBar.open('Por favor, avalie a melodia antes de gerar uma nova.', 'Ok');
            return;
        }

        const modo = this.modoOptions.find(item => item.label === this.ModoControl.value);
        this.playerController.genre = getModoTemperature(modo!.value);
        
        this.loading = true;
        this.service.generate(this.playerController.genre).subscribe(res => {
            this.loading = false;
            this.playerController.sequence = res;
            this.playerController.melody = {
                input_sequence: this.service.playerUtil.convertToInputSequence(res)
            }
            this.onClickLogo();
        }, error => {
            this.loading = false;
            this.snackBar.open(errorTransform(error), 'Ok');
        });
    }

    /**
     * @description Executa no click do logo
     * * Leva o scroll até o footer
     */
    public onClickLogo() {
        const footer = document.getElementsByTagName('footer');
        footer[0].scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * @description Filtra as opções de gênero
     */
    private filterModo(value: string): LabelValue[] {
        const filterValue = value.toUpperCase();
        return this.modoOptions.filter(item => item.value.includes(filterValue));
    }

}