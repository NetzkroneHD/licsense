import {Injectable, signal} from '@angular/core';

export type Route = 'home' | 'license-logs' | 'auth-failed' | 'signature';

export function toRoute(path: string): Route {
    const cleanedPath = path.replace(/^\//, '');
    switch (cleanedPath) {
        case 'home':
        case 'license-logs':
        case 'signature':
        case 'auth-failed':
            return cleanedPath as Route;
        default:
            return 'home';
    }
}

@Injectable({
    providedIn: 'root'
})
export class RouteState {

    private readonly currentRoute = signal<Route>('home');

    public readonly getCurrentRoute = this.currentRoute.asReadonly();

    public setCurrentRoute(route: Route) {
        this.currentRoute.set(route);
    }

}

