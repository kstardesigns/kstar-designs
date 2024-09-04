import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bh-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  public currentChatId: string = '';
  public options: { name: string }[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currentChatId = params['id'] ? params['id'] : Date.now().toString();
    });

    this.options = [
      { name: 'purpose' },
      { name: 'voice' },
      { name: 'servicenow' },
      { name: 'salesforce' }
    ];
  }
}
