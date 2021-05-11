import { Respuesta } from './../../../models/Respuesta';
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
  mostrarError = false

  constructor(
    private _quizzService: QuizzService,
    private fb: FormBuilder
  ) {
    this.agregarPregunta = this.fb.group({
      titulo: ['', Validators.required],
      segundos: ['10',Validators.required],
      puntos: ['1000',Validators.required],
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

  get seg() { return this.agregarPregunta.get('segundos')?.value }
  get puntos() { return this.agregarPregunta.get('puntos')?.value }


  agregarPreg(){
  // Control de estados de campos rellenos
    if(this.agregarPregunta.invalid || this.todasIncorrectas()){
      this.error()
      return
    }
    let listRespuestas: Respuesta[] = []

    // Obtenemos respuesta 1
    const rtaTitulo1 = this.agregarPregunta.get('respuesta1')?.get('titulo')?.value;
    const esCorrecta1 = this.agregarPregunta.get('respuesta1')?.get('esCorrecta')?.value;

    const respuesta1: Respuesta = {
      descripcion: rtaTitulo1,
      esCorrecta: esCorrecta1,
    }

    listRespuestas.push(respuesta1);

    // Obtenemos respuesta 2
    const rtaTitulo2 = this.agregarPregunta.get('respuesta2')?.get('titulo')?.value;
    const esCorrecta2 = this.agregarPregunta.get('respuesta2')?.get('esCorrecta')?.value;

    const respuesta2: Respuesta = {
      descripcion: rtaTitulo2,
      esCorrecta: esCorrecta2,
    }

    listRespuestas.push(respuesta2);

     // Obtenemos respuesta 3
     const rtaTitulo3= this.agregarPregunta.get('respuesta3')?.get('titulo')?.value;
     const esCorrecta3 = this.agregarPregunta.get('respuesta3')?.get('esCorrecta')?.value;

     const respuesta3: Respuesta = {
       descripcion: rtaTitulo3,
       esCorrecta: esCorrecta3,
     }

     if(rtaTitulo3 !== ''){
       listRespuestas.push(respuesta3);
     }

      // Obtenemos respuesta 4
      const rtaTitulo4 = this.agregarPregunta.get('respuesta4')?.get('titulo')?.value;
      const esCorrecta4 = this.agregarPregunta.get('respuesta4')?.get('esCorrecta')?.value;

      const respuesta4: Respuesta = {
        descripcion: rtaTitulo4,
        esCorrecta: esCorrecta4,
      }

      if(rtaTitulo4 !== ''){
        listRespuestas.push(respuesta4);
      }

    console.log(listRespuestas);

  }

  todasIncorrectas(){
    const array = ['restpuesta1', 'respuesta2', 'respuesta3', 'respuesta4']

    for (let i = 0; i < array.length; i++) {
      if(this.agregarPregunta.get(array[i])?.get('esCorrecta')?.value == true){
        return false
      }
    }
    return true
  }

  error(){
    this.mostrarError = true
    // Mostramos por tres segundos el error.
      setTimeout(()=> {
        this.mostrarError = false
      }, 3000)
  }

  sumarRestarSegundos(numero: number) {

    if(this.seg <= 5) {
      return;
    }

    this.agregarPregunta.patchValue({
      segundos: this.seg + numero
    })
  }


  esCorrecta(index: string){
    // Capturamos el index de RespuestaX y luego concatenamos con la palabra respuesta
    // Esto nos ayuda a asignar al formGroup respectivamente el check
    let stringRta = 'respuesta'
    let nroRespuesta = stringRta.concat(index)
    this.setFalseRespuestas(nroRespuesta)
    const estadoRta = this.obtenerEstadoRespuesta(nroRespuesta)

    this.agregarPregunta.get(nroRespuesta)?.patchValue({
      esCorrecta: !estadoRta
    })
  }

  // Obtener el estado de cada check
  obtenerEstadoRespuesta(nroRespuesta: string): boolean{
    return this.agregarPregunta.get(nroRespuesta)?.get('esCorrecta')?.value
  }

  setFalseRespuestas(nroRespuestas: string){
    const array = ['respuesta1','respuesta2','respuesta3','respuesta4']
    // Recorremos el array seteamos todas las respuestas como false menos la que el usuario seleccionó

    for (let i = 0; i < array.length; i++) {
      if(array[i] !== nroRespuestas){
        this.agregarPregunta.get(array[i])?.patchValue({
          esCorrecta: false
        })
      }

    }
  }

}
