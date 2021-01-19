import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextTemplatesPage } from './text-templates.page';

describe('TextTemplatesPage', () => {
  let component: TextTemplatesPage;
  let fixture: ComponentFixture<TextTemplatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTemplatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextTemplatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
