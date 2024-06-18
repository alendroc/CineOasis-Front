import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaComboComponent } from './oferta-combo.component';

describe('OfertaComboComponent', () => {
  let component: OfertaComboComponent;
  let fixture: ComponentFixture<OfertaComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertaComboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertaComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
