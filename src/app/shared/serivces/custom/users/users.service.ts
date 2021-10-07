import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user/user';
import { RootService } from '../../basic/root/root.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  endPoints = {
    users: 'users?page=',
    singelUser: 'users',
  };
  constructor(private rootService: RootService) {}

  getby(id: number | undefined) {
    return this.rootService.getRoot(`${this.endPoints.singelUser}/${id}`);
  }

  getPages(take: number) {
    return this.rootService.getRoot(`${this.endPoints.users}${take}`);
  }

  add(featureModel: User): Observable<User> {
    return this.rootService.postRoot(this.endPoints.users, featureModel);
  }

  edit(featureModel: User): Observable<User> {
    return this.rootService.putRoot(this.endPoints.users, featureModel);
  }

  delete(id: number | undefined): Observable<void> {
    return this.rootService.deleteRoot(this.endPoints.users, `${id}`);
  }
}
