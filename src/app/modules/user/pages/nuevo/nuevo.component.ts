import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { JsonPlaceHolderService } from '@modules/user/services/json-place-holder.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit, OnDestroy {
  userForm!:FormGroup;
  suscripcion:Subscription;

  constructor(private fb:FormBuilder,private _userService:JsonPlaceHolderService,private mensaje:NzMessageService,private actRoute:ActivatedRoute) {
    this.suscripcion=new Subscription();
   }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      id:[],
      name:['',Validators.required],
      email:['',[Validators.required,Validators.pattern(/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/g)]],
      address:['',Validators.required],
      phone:['',Validators.required],
      website:['',Validators.required],
      company:['',Validators.required]
    })
    this.setForm()
  }
  setForm(){
    this.suscripcion.add(this.actRoute.params.subscribe((params:Params)=>{
      //console.log(params);
     // this.idUser=params.id;
      this.userForm.patchValue({
        id:params.id,
        name:params.name,
        email:params.email,
        address:params.address,
        phone:params.phone,
        website:params.website,
        company:params.company
      })
    }))
  }
  crearUsuario(){
    // creo un nuevo objeto de tipo Usuario con el resto de campos que no estan en el formulario
    const user={
      id:15,
      name:this.userForm.get('name')?.value,
      username:'demo',
      email:this.userForm.get('email')?.value,
      address:{
        street:this.userForm.get('address')?.value,
        suite:'demo',
        city:'Ciudad Gotica',
        zipcode:'45660',
        geo:{
          lat:'-45.455',
          lng:'82.56'
        }
      },
      phone:this.userForm.get('phone')?.value,
      website:this.userForm.get('website')?.value,
      company:{
        name:this.userForm.get('company')?.value,
        catchPhrase:'compania que hace de todo',
        bs:'bs demo'
      }
    }
    this.suscripcion.add(this._userService.newUser(user).subscribe(()=>{
      this.mensaje.success('se creo el usuario')
    },e=>{
      this.mensaje.error(`Ooops ocurrio un error ${e}`)
    },
    ()=>{this.userForm.reset()}))
  }
  editarUsuario(){
    this.suscripcion.add(this._userService.editUsuario(this.userForm.value).subscribe(()=>{
      this.mensaje.success(`El usuario ${this.userForm.get('id')?.value} se actualizo`)
    },e=>{this.mensaje.error(`Oooops ocurrio un error ${e}`)},
    ()=>{this.userForm.reset()}
    ))
  }

  submitForm(){
   if (this.userForm.get('id')?.value===undefined) {
     this.crearUsuario();
     
   } else {
     this.editarUsuario()
   }
    
  }
  resetForm(){
    this.userForm.reset()
  }
  ngOnDestroy(): void {
      this.suscripcion.unsubscribe()
  }

}
