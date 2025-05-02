import {Injectable} from '@angular/core';


export type Theme = 'light-theme' | 'dark-theme';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor() {
    }

    public changeTheme(theme: Theme) {
        const htmlElement = document.documentElement;
        htmlElement.classList.remove('light-theme', 'dark-theme');
        htmlElement.classList.add(theme);
    }
}
