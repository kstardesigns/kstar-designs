import { Component, ChangeDetectionStrategy, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PromptModalComponent } from '../prompt-modal/prompt-modal.component';

@Component({
  selector: 'bh-prompt-button',
  templateUrl: './prompt-button.component.html',
  styleUrl: './prompt-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptButtonComponent {
  readonly dialog = inject(MatDialog);

  @Input() smallVariant: boolean;

  constructor(
  ) { 
    this.smallVariant = false;
  }

  openPromptDialog(promptNumber: string) {
    this.dialog.open(PromptModalComponent, {
      panelClass: 'bh-dialog',
      data: {
        prompt: promptNumber,
      },
    });
  }
}