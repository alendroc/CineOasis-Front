import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAdministracionComponent } from './usuario-administracion.component';

describe('UsuarioAdministracionComponent', () => {
  let component: UsuarioAdministracionComponent;
  let fixture: ComponentFixture<UsuarioAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioAdministracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
