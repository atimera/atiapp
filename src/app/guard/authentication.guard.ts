import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { UserMessage } from '../enum/user-message.enum';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private notificationService: NotificationService){}

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
    this.notificationService.notify(NotificationType.ERROR, UserMessage.NEED_TO_LOGIN);
    return false;
  }
  
}
