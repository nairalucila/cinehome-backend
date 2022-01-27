import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { AdminComponent } from './admin.component';

import { lista } from './listausuariosdata';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  const initialState = {};
  let mockUsuariosService: jasmine.SpyObj<UsuariosService>;
  let listaUsuarios = lista;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: UsuariosService,
          useValue: jasmine.createSpyObj('UsuariosService', ['traerUsuarios']),
        },
      ],
      declarations: [AdminComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create a button', () => {
  // //  spyOn(component.traerListaUsuarios, 'click');

  //   let button = fixture.debugElement.nativeElement.querySelector('traerUs');
  //   button.onclick();

  //   fixture.whenStable().then(() => {
  //     expect(component.traerListaUsuarios).toEqual(listaUsuarios);
  //   });
  //   //expect(component).toBeTruthy();
  // });

  it('should test a button', () => {
    const traerListaUsuarios: any = component.traerListaUsuarios();
    const spy = spyOn(traerListaUsuarios, 'listaUsuarios').and.returnValue(
      listaUsuarios
    );

    const usuarios = traerListaUsuarios;
    expect(usuarios).toBe(listaUsuarios);
    expect(spy).toHaveBeenCalled();
  });
//https://www.youtube.com/watch?v=ubVHEwmmr-E
  // it('Muestra una lista de usuarios', () => {
  //   mockUsuariosService.traerUsuarios;
  // });
});
