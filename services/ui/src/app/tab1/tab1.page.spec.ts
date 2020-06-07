import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageComponent } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1PageComponent;
  let fixture: ComponentFixture<Tab1PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1PageComponent],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
