import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';
import { UserMessage } from '../enum/user-message.enum';

@Injectable({ providedIn: 'root' })
export class NotificationService {  

  constructor(private notifier: NotifierService) { }

  public notify(type: NotificationType, message: UserMessage): void {
    this.notifier.notify(type, message.toUpperCase());
  }
}
