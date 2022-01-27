import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { UsuarioLogin, Usuarios}from '../../../models/usuarios';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit, OnDestroy {
  caracterInvalid: boolean;

  show: boolean;
  registroForm = this.fBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    contrasenia: ['', Validators.required],
    nombreUsuario: ['', Validators.required],
    telefono: ['', Validators.required],
    confirmarContrasenia: ['', Validators.required],
  });

  constructor(
    private fBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private route: Router,
    private authService: AuthService
  ) {
    this.caracterInvalid = true;

    this.show = false;
  }

  ngOnInit(): void {
    this.authService.loggedIn.next(false);
  }

  cambiarTipoContrasenia() {
    this.show = !this.show;
  }

  //ESTA FUNCION CONTROLA QUE SOLO SE INGRESEN NUMEROS EN EL CAMPO TELEFONO - PROBALA
  detectarIngresoLetras(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Sólo números 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      this.caracterInvalid = false;

      return false;
    } else {
      this.caracterInvalid = true;

      return true;
    }
  }

  //REGISTAR USUARIOS
  registrarUsuarios(nuevousuario: Usuarios) {
    try {
      nuevousuario.rol = 'CLIENTE';
      this.usuarioService.registrarUsuario(nuevousuario).subscribe((data) => {
      });
      this.route.navigate(['/login']);
      
    } catch (error) {
      console.log('Ups!', error);
      return error;
    }
  }

  onSubmit() {
    if (
      this.registroForm.value.contrasenia ===
      this.registroForm.value.confirmarContrasenia
    ) {
      delete this.registroForm.value.confirmarContrasenia;
      this.registrarUsuarios(this.registroForm.value);
    } else {
      console.log('Las contraseñas no coinciden, verifiquelas');
    }
  }

  ngOnDestroy(): void {
    this.registroForm.value;
  }
}
