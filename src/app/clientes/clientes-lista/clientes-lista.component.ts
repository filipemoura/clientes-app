import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  msgSuccess: string;
  msgError: string;

  constructor( 
    private service: ClientesService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe(response =>
        this.clientes = response);
  }

  novoCadastro() {
    this.route.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente : Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.service
      .deletar(this.clienteSelecionado)
      .subscribe(
        response => {
          this.msgSuccess = 'Cliente deletado com sucesso.';
          this.ngOnInit();
        },
        errorResponse => this.msgError = 'Ocorreu um erro ao deletar o cliente.'
      )
  }
}
