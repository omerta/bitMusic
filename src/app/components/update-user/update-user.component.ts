import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  public user: User;
  constructor(
    private service: UserService,
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('dataUser'));
    this.user = JSON.parse(localStorage.getItem('dataUser'));
  }

  updateUser() {
    this.service.updateUser(this.user).subscribe( (res: any) => {
      switch (res.statusCode) {
        case 500:
          alert('Error al conectarse con el servidor');
          break;
        case 400:
          alert('Error al actualizar el usuario');
          break;
        case 200:
          alert('Usuario actualizado correctamente.');
          break;
        default:
          alert('Algo salió mal');
      }
    });
  }

}
