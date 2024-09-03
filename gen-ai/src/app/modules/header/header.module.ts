import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderAccordionComponent } from './header/header-accordion/header-accordion.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

export interface ConfirmationData {
  confirmationType: 'removeChatFromHistory' | 'removeAllHistory' | 'removeChatFromFavs',
  chatId: string,
  chatName: string;
}

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderAccordionComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogActions, 
    MatDialogClose, 
    MatDialogContent, 
    MatDialogTitle
  ],
  exports: [
    HeaderComponent,
    HeaderAccordionComponent
  ]
})
export class HeaderModule { }
