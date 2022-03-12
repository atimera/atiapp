import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }

  /**
   * Si l'utilisateur est connecté, renvoit true, sinon renvoit l'utilisateur vers la page de connexion et retourne false
   * @returns true si l'utilisateur est connecté, false sinon
   */
  private isUserLoggedIn(): boolean {
    if(this.authenticationService.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    // TODO Envoyer une notification à l'utilisateur
    return false;
  }
  
}
