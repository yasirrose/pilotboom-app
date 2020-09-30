import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewcontactsPage } from './viewcontacts.page';

describe('ViewcontactsPage', () => {
  let component: ViewcontactsPage;
  let fixture: ComponentFixture<ViewcontactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcontactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewcontactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
