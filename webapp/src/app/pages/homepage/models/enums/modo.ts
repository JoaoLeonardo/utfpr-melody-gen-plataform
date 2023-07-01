import { LabelValue } from "src/app/shared/models/label-value";

export enum Modo {
    EXPERIMENTAL = 'Experimental',
    COMUM = 'Comum',
    POPULAR = 'Popular',
}

export type ModoType = keyof typeof Modo;

export function getModoOptions(): LabelValue[] {
    const keys = Object.keys(Modo);
    return Object.values(Modo).map((label, index) => {
        return { value: keys[index], label: label };
    });
}

export function getModoTemperature(modo: ModoType): number {
    switch (modo) {
        case 'COMUM':
            return 0.6;
        case 'POPULAR':
            return 0.2
        default:
            return 1.0;
    }
}