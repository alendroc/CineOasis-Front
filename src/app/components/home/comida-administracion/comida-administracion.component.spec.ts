import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaAdministracionComponent } from './comida-administracion.component';

describe('ComidaAdministracionComponent', () => {
  let component: ComidaAdministracionComponent;
  let fixture: ComponentFixture<ComidaAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComidaAdministracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComidaAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
