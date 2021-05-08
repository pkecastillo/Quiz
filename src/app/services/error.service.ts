import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code: string): string{
    switch(code){
      case 'auth/email-already-in-use':
      return 'El correo ya está se encuentra en uso'

      case 'auth/invalid-email':
      return 'El correo es inválido'

      case 'auth/weak-password':
      return 'Contraseña muy debil'

      case 'auth/user-not-found':
      return 'Usuario Inválido'

      case 'auth/wrong-password':
      return 'Contraseña Inválida'

      default:
        return 'Error desconocido'
    }
  }

}
