import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionAdministracionComponent } from './funcion-administracion.component';

describe('FuncionAdministracionComponent', () => {
  let component: FuncionAdministracionComponent;
  let fixture: ComponentFixture<FuncionAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionAdministracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
