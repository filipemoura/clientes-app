import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;
  mensagemSucesso: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {
    this.router.navigate(['/home']);
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
    this.loginError = false;
  }

  cadastrar() {
    const usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
        .salvar(usuario)
        .subscribe(
          response => {
            this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
            this.loginError = false;
        }, error => {
          this.loginError = true;
          this.mensagemSucesso = "";
        })
  }

}
