import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AccountService } from './account-service';
import { LikesService } from './likes-service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountService);
  private likesService = inject(LikesService);

  // Using this when we refresh the page
  init() {
    return this.accountService.refreshToken().pipe(
      tap(user => {
        if (user) {
          this.accountService.setCurrentUser(user);
          this.accountService.startTokenRefreshInterval();
        }
      })
    )
  }
}
