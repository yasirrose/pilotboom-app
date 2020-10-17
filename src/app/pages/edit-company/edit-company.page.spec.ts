import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCompanyPage } from './edit-company.page';

describe('EditCompanyPage', () => {
  let component: EditCompanyPage;
  let fixture: ComponentFixture<EditCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
