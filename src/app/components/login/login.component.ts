import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  constructor(
    private service: UserService,
  ) { 
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  login() {
    this.service.login( this.user).subscribe( (res: any) => {
      switch (res.statusCode) {
        case 400:
          alert('No estas registrado');
          break;
        case 401:
          alert('La contraseña está incorrecta');
          break;
        case 200:
          alert('Bienvenido');
          localStorage.setItem('dataUser', JSON.stringify(res.dataUser));
          break;
        default:
          alert('Error de conexión.');
      }
    });
  }

}
