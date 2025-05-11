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

    /**
     * Set the stylesheet with the specified key.
     */
    setStyle(key: string, href: string) {
        getLinkElementForKey(key).setAttribute('href', href);
    }

    /**
     * Remove the stylesheet with the specified key.
     */
    removeStyle(key: string) {
        getExistingLinkElementByKey(key)?.remove();
    }
}

function getLinkElementForKey(key: string) {
    return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
}

function getClassNameForKey(key: string) {
    return `style-manager-${key}`;
}
