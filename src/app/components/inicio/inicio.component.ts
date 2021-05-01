import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  error = false
  pin = '';

  constructor() { }

  ngOnInit(): void {
  }

  ingresar(){
    // Validar si el user no ingreso ningun caracter
    if(this.pin == ''){
      this.error = true

      setTimeout(()=>{
        this.error = false
      },3000)
    }
  }

}
