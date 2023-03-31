import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userStorage: IUser[] = [];


  constructor() {
  }

  isUserExists(user: IUser): boolean {
    const isUserExistInApp = this.userStorage.find(el => el.login === user.login && el.psw === user.psw);

    return !!isUserExistInApp || this.IsUserExistInLocalStorage(user);
  }

  setUser(user: IUser): void {
    const isUserExist = this.userStorage.find(el => el.login === user.login);

    if (!isUserExist && user?.login) {
      this.userStorage.push(user);
    }

  }

  isLoginExist(user: IUser): boolean {

    const userExist = this.userStorage.find(el => el.login === user.login);

    return !!userExist;
  }

  private IsUserExistInLocalStorage(user: IUser): boolean {
    const userFromLocalStorage = window.localStorage.getItem(user.login);
    if (!userFromLocalStorage)
      return false;

    const localUserObj: IUser = JSON.parse(userFromLocalStorage);

    return localUserObj.login === user.login && localUserObj.psw === user.psw;
  }


}
