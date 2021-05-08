import { ErrorService } from './../../../services/error.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrarForm: FormGroup
  loading = false

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService
    ) {
    this.registrarForm = this.fb.group({
      usuario: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      repetirPassword: ['']
    }, {validator: this.checkPassword})
  }

  ngOnInit(): void {
  }

  registrar(){
    // console.log(this.registrarForm);
    const usuario = this.registrarForm.get('usuario')?.value
    const password = this.registrarForm.get('password')?.value
    // console.log(usuario)
    // console.log(password)
    this.loading =true
    this.afAuth.createUserWithEmailAndPassword(usuario,password).then(respuesta => {
      // console.log(respuesta);
      respuesta.user?.sendEmailVerification()
      this.toastr.success('Enviamos un correo electronico para verificación', 'Usuario registrado!');
      this.router.navigate(['/usuario'])
    }).catch(error => {
      // console.log(error);
      this.registrarForm.reset()
      this.loading = false
      this.toastr.error(this._errorService.error(error.code), 'Opss, Error');
    })
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls.password?.value
    const confirmPassword = group.controls.repetirPassword?.value
    // console.log(pass);
    // console.log(pass);
    return pass === confirmPassword ? null : {notSame: true}

  }

}
