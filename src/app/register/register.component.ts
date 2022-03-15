import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { UserMessage } from '../enum/user-message.enum';
import { CustomHttpResponse } from '../model/custom-http-response';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
      this.router.navigateByUrl('/register');
    }
  }

  public onRegister(user: User): void {
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe({
        
        next: (response: HttpResponse<CustomHttpResponse>) => {
          this.showLoading = false;
          this.notificationService.notify(NotificationType.SUCCESS, `Un email de vérification vous a été envoyé à l'adresse ${user.email}` );
          this.router.navigateByUrl('/register');
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse)
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
          //this.notificationService.notify(NotificationType.ERROR, 'Une erreur est survenue lors de votre inscription.');
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
