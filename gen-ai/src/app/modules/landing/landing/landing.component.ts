import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'bh-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent {
  @ViewChild(InputComponent) bhInput!: InputComponent;
  public currentChatId: string = '';
  public options: { name: string, description: string, output: string }[] = [];
  public optionInput: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currentChatId = params['id'] ? params['id'] : Date.now().toString();
    });

    this.options = [
      { name: 'summarize', description: 'Summarize a document', output: 'Summarize the attached document into bullet points. Organize into sections for each key topic, with supporting details as needed.' },
      { name: 'teach', description: 'Teach me about...', output: `Teach me about [TOPIC]. Give an introduction with basic details followed by examples of how it's used. Share some links I can use for additional information.` },
      { name: 'brainstorm', description: 'Brainstorm ideas', output: 'Give me [3] ideas for [TOPIC]. For each idea, include a brief description along with potential pros and cons to consider.' },
    ];
  }

  public populateInput(input: string): void {
    if (this.bhInput) {
      this.bhInput.inputText = input;
    }
  }
}