import { Component } from '@angular/core';

@Component({
  selector: 'bh-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  public options: { name: string }[] = [];

  constructor() {
    this.options = [
      { name: 'purpose' },
      { name: 'voice' },
      { name: 'servicenow' },
      { name: 'salesforce' }
    ];
  }
}
