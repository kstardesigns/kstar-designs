import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bh-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent {
  public currentChatId: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currentChatId = params['id'];
    })
  }

}
