import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuizzService } from './../../../services/quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {
  agregarPregunta: FormGroup

  constructor(
    private _quizzService: QuizzService,
    private fb: FormBuilder
  ) {
    this.agregarPregunta = this.fb.group({
      titulo: ['', Validators.required],
      segundos: ['',Validators.required],
      puntos: ['',Validators.required],
      respuesta1: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required],
      }),
      respuesta2: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required],
      }),
      respuesta3: this.fb.group({
        titulo: '',
        esCorrecta: false,
      }),
      respuesta4: this.fb.group({
        titulo: '',
        esCorrecta: false,
      }),
    })
  }

  ngOnInit(): void {
    console.log('titulo', this._quizzService.tituloCuestionario);
    console.log('descripcion', this._quizzService.descripcion);

  }

}
