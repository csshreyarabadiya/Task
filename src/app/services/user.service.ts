import { HttpClient } from '@angular/common/http';
import { Inject, Injectable,PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

//#region pass data across components
  private selectedUser = new BehaviorSubject<UserData | null>(null);
  selectedUser$ = this.selectedUser.asObservable();
  filteredUser = new Subject<string>();
  addUser = new Subject<UserData>();

  setUser(user: UserData |null) {
     this.selectedUser.next(user);
  }

  getSelectedUser() {
    return this.selectedUser.value;
  }

  //#endregion


  //#region  get user info
  private jsonUrl = '/assets/userData.json';
   getUserDetails() :Observable<UserData[]>{
    return this.http.get<UserData[]>(this.jsonUrl);
   }
  //#endregion
}
