import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'bh-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrl: './prompt-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PromptModalComponent {
  data = inject(MAT_DIALOG_DATA);
}