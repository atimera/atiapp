import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { CustomHttpResponse } from '../model/custom-http-response';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(userCredentiials: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(userCredentiials).subscribe({
        
        next: (response: HttpResponse<CustomHttpResponse>) => {
          const token = response.body?.data.jwtHeader?.[HeaderType.JWT_TOKEN];
          const theUser = response.body?.data.user;
          if (token && theUser) {
            this.authenticationService.saveToken(token);
            this.authenticationService.addUserToLocalCache(theUser);
            this.showLoading = false;
            this.notificationService.notify(NotificationType.SUCCESS, 'Bienvenue '+ theUser.firstName + '!');
            this.router.navigateByUrl('/user/management');
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, 'Votre identiant ou mot de passe est incorrect');
          this.showLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => {
      sub.unsubscribe();
    })
  }
}
