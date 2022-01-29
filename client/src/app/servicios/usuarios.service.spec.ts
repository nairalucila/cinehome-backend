import { TestBed } from '@angular/core/testing';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from '../models/usuarios';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsuariosService);
    httpTestingController = TestBed.inject(HttpTestingController);
    //services = new UsuariosService();
  });

  it('deberia devolver un array', () => {
    // prepara arrange
    const listaUsuarios: Usuarios[] = [
      {
        _id: 'testid',
        email: 'p@gmail.com',
        nombreUsuario: 'Nairina',
        rol: 'CLIENTE',
        telefono: '15423',
      },
    ];
    service.traerUsuarios().subscribe({
      next: (usuarios) => {
        expect(usuarios).toEqual(listaUsuarios);
      }
    });
    // actua act
    const req = httpTestingController.expectOne('http://localhost:3000/api/usuarios')

    // compara assert
    expect(req.request.method).toEqual('GET');
    req.flush(listaUsuarios)
    httpTestingController.verify();
  });
});
