import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent {
  form = new FormGroup({
    login: new FormControl(''),
    senha: new FormControl('')
  })


  constructor(
    private route: ActivatedRoute,
    private router: Router

  ) { }

  entrar() {
    if (this.form.value.login =="admin" && this.form.value.senha == "admin") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logado com sucesso!",
        showConfirmButton: false,
        timer: 2000
      }).then((result) => {
        this.router.navigate(['cliente'])
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Senha incorreta, tente novamente!',
    });
    }
  }
}
