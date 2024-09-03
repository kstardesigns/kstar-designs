import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './modules/header/header.module';
import { LandingModule } from './modules/landing/landing.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { SharedModule } from './modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { chatReducer } from './store/reducers/chat.reducer';
import { ChatEffects } from './store/effects/chat.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    LandingModule,
    ConversationModule,
    SharedModule,
    FormsModule,
    MatTooltipModule,
    StoreModule.forRoot({ chat: chatReducer }),
    EffectsModule.forRoot([ChatEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
