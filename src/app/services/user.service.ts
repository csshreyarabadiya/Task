import { HttpClient } from '@angular/common/http';
import { Inject, Injectable,PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { userData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

//#region pass data across components
  private selectedUser = new BehaviorSubject<userData | null>(null);
  selectedUser$ = this.selectedUser.asObservable();
  filteredUser = new Subject<string>();
  addUser = new Subject<userData>();

  setUser(user: userData |null) {
     this.selectedUser.next(user);
  }

  getSelectedUser() {
    return this.selectedUser.value;
  }

  //#endregion


  //#region  get user info
  private jsonUrl = '/assets/userData.json';
   getUserDetails() :Observable<userData[]>{
    return this.http.get<userData[]>(this.jsonUrl);
   }
  //#endregion
}
