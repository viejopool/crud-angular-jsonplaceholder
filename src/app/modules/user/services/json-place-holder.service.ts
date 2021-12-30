import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '@core/models/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceHolderService {
  url:string;

  constructor(private http:HttpClient) {
    this.url=environment.url
   }
  getUsers():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}users`)
  }
  deleteUser(id:number):Observable<any>{
   return this.http.delete(`${this.url}users/${id}`)
  }
  newUser(usuario:Usuario):Observable<Usuario>{
   return this.http.post<Usuario>(`${this.url}users`,usuario)
  }
  editUsuario(usuario:any):Observable<any>{
   return this.http.patch(`${this.url}users/${usuario.id}`,usuario)
  }
}
