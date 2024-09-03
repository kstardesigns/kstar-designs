import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation/conversation.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ChatComponent } from './chat/chat.component';
import { UserInputComponent } from './user-input/user-input.component';
import { SystemOutputComponent } from './system-output/system-output.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ConversationComponent,
    ToolbarComponent,
    ChatComponent,
    UserInputComponent,
    SystemOutputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ConversationModule { }
