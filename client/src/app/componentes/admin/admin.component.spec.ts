import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UsuarioLogin, Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { AdminComponent } from './admin.component';

import { lista } from './listausuariosdata';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  const initialState = {};
  let listaUsuarios = lista as Usuarios[];
  const mockUsuariosService:jasmine.SpyObj<UsuariosService> = jasmine.createSpyObj('UsuariosService', ['traerUsuarios'])
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: UsuariosService,
          useValue: mockUsuariosService,
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

  it('Deberia mostrar la lsita de usuarios', fakeAsync(() => {
      mockUsuariosService.traerUsuarios.and.returnValue(of(listaUsuarios))
      const listarUsuariosBoton = fixture.debugElement.query(By.css('#traerUs'))
      listarUsuariosBoton.nativeElement.click()
      fixture.detectChanges();
      tick(5)

      const tarjetasUsuarios = fixture.debugElement.query(By.css('.usuarios-panel'))
      expect(component.listaUsuarios.length).toBe(tarjetasUsuarios.children.length)
    })
  )

});
