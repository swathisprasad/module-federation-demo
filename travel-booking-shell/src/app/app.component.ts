import { Component, ViewChild, ViewContainerRef, ɵrenderComponent as renderComponent, Inject, Injector, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'travel-booking-shell';

  @ViewChild('vc', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;

  constructor(
    @Inject(Injector) private injector,
    @Inject(ComponentFactoryResolver) private cfr) { }

  home() {
    this.viewContainer.clear();
  }

  async load() {
    const comp = await import('flightbooking/Component').then(m => {
      return m.AppComponent;
    });
    const factory = this.cfr.resolveComponentFactory(comp);
    this.viewContainer.createComponent(factory, 0, this.injector);
  }
}
