import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing/landing.component';
import { ConversationComponent } from './modules/conversation/conversation/conversation.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'chat/:id', component: ConversationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
