import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrarForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.registrarForm = this.fb.group({
      usuario: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      repetirPassword: ['']
    }, {validator: this.checkPassword})
  }

  ngOnInit(): void {
  }

  registrar(){
    console.log(this.registrarForm);
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls.password?.value
    const confirmPassword = group.controls.repetirPassword?.value
    // console.log(pass);
    // console.log(pass);
    return pass === confirmPassword ? null : {notSame: true}

  }

}
