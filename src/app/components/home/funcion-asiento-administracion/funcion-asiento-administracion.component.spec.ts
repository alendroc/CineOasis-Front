import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionAsientoAdministracionComponent } from './funcion-asiento-administracion.component';

describe('FuncionAsientoAdministracionComponent', () => {
  let component: FuncionAsientoAdministracionComponent;
  let fixture: ComponentFixture<FuncionAsientoAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionAsientoAdministracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionAsientoAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
