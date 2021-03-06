import {Component} from '@angular/core';

import {AuthService} from './user/auth.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event} from '@angular/router';
import {slideInAnimation} from './app.animation';
import {MessageService} from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  constructor(private authService: AuthService,
              private router: Router,
              public messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }

  displayMessages(): void {
    this.messageService.isDisplayed = true;
    this.router.navigate([{outlets: {popup: ['messages']}}]);
  }

  hideMessages(): void {
    this.messageService.isDisplayed = false;
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
