import {inject, Injectable} from '@angular/core';
import {Route, RouteStore, toRoute} from './route-store.service';
import {NavigationEnd, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouteStoreService {

  private readonly routeStore = inject(RouteStore);
  private readonly router = inject(Router);


  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeStore.setCurrentRoute(toRoute(event.url));
      }
    });



  }

  public setCurrentRoute(route: Route) {
    return this.router.navigate([route]);
  }


}



