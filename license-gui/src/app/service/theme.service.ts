import {Injectable} from '@angular/core';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor() {
    }

    public changeTheme(theme: Theme) {
        this.removeStyle('theme');
        this.setStyle('theme', `${theme}.css`);
    }

    private setStyle(key: string, href: string) {
        this.getLinkElementForKey(key).setAttribute('href', href);
    }

    private removeStyle(key: string) {
        this.getExistingLinkElementByKey(key)?.remove();
    }

    private getLinkElementForKey(key: string): Element {
        return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
    }

    private getExistingLinkElementByKey(key: string): Element | null {
        return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
    }

    private createLinkElementWithKey(key: string): HTMLLinkElement {
        const linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.classList.add(this.getClassNameForKey(key));
        document.head.appendChild(linkEl);
        return linkEl;
    }

    private getClassNameForKey(key: string) {
        return `style-manager-${key}`;
    }

}
