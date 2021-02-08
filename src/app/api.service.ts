import {Injectable, Output, EventEmitter} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Users} from './model/users';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  redirectUrl: string;
  baseUrlLogin: string = 'http://localhost/php/login';
  baseUrlUser: string = 'http://localhost/php/users';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
  }

  public userlogin(username, password) {
    alert(username);
    return this.httpClient.post<any>(this.baseUrlLogin + '/login.php', {username, password})
      .pipe(map(Users => {
        this.setToken(Users[0].name);
        this.getLoggedInName.emit(true);
        return Users;
      }));
  }

  public userRegistration(name, email, password, cellphone) {
    return this.httpClient.post<any>(this.baseUrlUser + '/register.php', {name, email, password, cellphone})
      .pipe(map(Users => {
        return Users;
      }));
  }
  
  public userEdit(usuario: any) {
    return this.httpClient.post(this.baseUrlUser + '/userEdit.php', JSON.stringify(usuario));  
  }

  public userDelete(id: number) {
    return this.httpClient.get(this.baseUrlUser + '/userDelete.php?id='+id);
  }

  public userList() {
    return this.httpClient.get(this.baseUrlUser + '/userList.php');
  }

  public userSelected(id: number) {
    return this.httpClient.get(this.baseUrlUser + '/userSelected.php?id='+id);
  }



//token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
