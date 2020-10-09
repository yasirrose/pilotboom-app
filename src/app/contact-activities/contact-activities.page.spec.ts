import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactActivitiesPage } from './contact-activities.page';

describe('ContactActivitiesPage', () => {
  let component: ContactActivitiesPage;
  let fixture: ComponentFixture<ContactActivitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactActivitiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
