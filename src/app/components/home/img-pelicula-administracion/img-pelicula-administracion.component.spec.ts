import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPeliculaAdministracionComponent } from './img-pelicula-administracion.component';

describe('ImgPeliculaAdministracionComponent', () => {
  let component: ImgPeliculaAdministracionComponent;
  let fixture: ComponentFixture<ImgPeliculaAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgPeliculaAdministracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgPeliculaAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
