import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoBloggingPage } from './auto-blogging.page';

describe('AutoBloggingPage', () => {
  let component: AutoBloggingPage;
  let fixture: ComponentFixture<AutoBloggingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoBloggingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoBloggingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
