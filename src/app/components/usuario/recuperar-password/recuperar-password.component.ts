import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarForm: FormGroup
  loading = false

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private router: Router
    ) {
    this.recuperarForm = this.fb.group({
      usuario: ['',[Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  recuperarPassword(){
    // Obtener correo
    const correo = this.recuperarForm.get('usuario')?.value
    this.loading = false

    this.afAuth.sendPasswordResetEmail(correo).then(() => {
      this.toastr.info('Enviamos un correo eletronico para reestablecer su contraseña', 'Restablecer Contraseña')
      this.router.navigate(['/usuario'])
    }).catch(error => {
      this.loading = false
      this.toastr.error(this._errorService.error(error.code), 'Error')
      this.recuperarForm.reset()
      })
  }

}
