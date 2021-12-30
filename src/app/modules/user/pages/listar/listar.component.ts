import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '@core/models/usuario';
import { JsonPlaceHolderService } from '@modules/user/services/json-place-holder.service';
import { Observable, Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit,OnDestroy {
  usuarios$!:Observable<Usuario[]>;
  suscripcion:Subscription;

  constructor(private _userService:JsonPlaceHolderService,private mensaje:NzMessageService,private ruta:Router) {
    this.suscripcion=new Subscription()
   }

  ngOnInit(): void {
   this.usuarios$= this._userService.getUsers()
  }
  deleteUser(id:number){
    this.suscripcion.add(
    this._userService.deleteUser(id).subscribe(data=>{
      this.mensaje.success(`El usuario ${id} se elimino con éxito`)},
      e=>{
        this.mensaje.error('Ooops ocurio un error')
      }))
  }
  editUser(usuario:Usuario){
    //console.log(usuario);
    this.ruta.navigate(['nuevo',usuario.id,usuario.name,usuario.email,usuario.address.street,usuario.phone,usuario.website,usuario.company.name])
  }
  ngOnDestroy(): void {
      this.suscripcion.unsubscribe()
  }

}
