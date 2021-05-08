import { User } from '../../../interfaces/User';
import { Router } from '@angular/router';
import { ErrorService } from './../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private router: Router
    ) {
    this.loginForm = this.fb.group({
      usuario: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(){
    // console.log(this.loginForm);
    this.loading = true
    const usuario = this.loginForm.get('usuario')?.value
    const password = this.loginForm.get('password')?.value

    this.afAuth.signInWithEmailAndPassword(usuario,password).then((respuesta) => {
      // console.log(respuesta);
      this.loading = false
      if(respuesta.user.emailVerified == false){
        this.router.navigate(['/usuario/verificarCorreo'])
      }else{
        // Enviar al Dashboard
        this.router.navigate(['/dashboard'])
      }

    }, error => {
      // console.log(error);
      this.loading = false
      this.toastr.error(this._errorService.error(error.code), 'Error')
      this.loginForm.reset()
    })
  }

  // CHEQUEAR EL ESTADO DE ESTE setLocalStorage NO ESTÁ FUNCIONANDO
  setLocalStorage(user: User) {
    const usuario: User = {
      uid: user.uid,
      email: user.email
    }

    localStorage.setItem('user', JSON.stringify(usuario));
  }
}
