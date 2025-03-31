import { HttpClient } from '@angular/common/http';
import { Inject, Injectable,PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

   filteredUser = new Subject<string>();
 
   //#region  get user info
   private jsonUrl = '/assets/userData.json';
   getUserDetails() :Observable<UserData[]>{
     return this.http.get<UserData[]>(this.jsonUrl);
    }
   //#endregion
}
