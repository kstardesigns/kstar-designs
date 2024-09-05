import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FooterComponent } from './footer/footer.component';
import { PromptButtonComponent } from './prompt-button/prompt-button.component';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';
import { FormsModule } from '@angular/forms';

export interface FeedbackData {
  prompt: 'prompt1' | 'prompt2';
}

@NgModule({
  declarations: [
    InputComponent,
    FooterComponent,
    PromptButtonComponent,
    PromptModalComponent,
    TextareaAutoresizeDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule,
    FormsModule
  ],
  exports: [
    InputComponent,
    PromptButtonComponent,
    FooterComponent
  ]
})

export class SharedModule { }