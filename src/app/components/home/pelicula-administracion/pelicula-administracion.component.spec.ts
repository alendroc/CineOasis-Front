import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaAdministracionComponent } from './pelicula-administracion.component';

describe('PeliculaAdministracionComponent', () => {
  let component: PeliculaAdministracionComponent;
  let fixture: ComponentFixture<PeliculaAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaAdministracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeliculaAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
