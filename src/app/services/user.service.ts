import { Injectable } from '@angular/core'; // Módulo que nos permitirá ( importar el servicio como una dependencia en el componente)
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {
  constructor(
    private _http: HttpClient
  ) {}
}
