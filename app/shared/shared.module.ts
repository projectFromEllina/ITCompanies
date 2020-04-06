﻿import {NgModule} from '@angular/core';
import {WaiterLoaderComponent} from "./components/waiter-loader/waiter-loader.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ShowMoreComponent} from "./components/show-more/show-more.component";
import {CustomPopupComponent} from "./components/custom-popup/custom-popup.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    WaiterLoaderComponent,
    NotFoundComponent,
    CustomPopupComponent,
    ShowMoreComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WaiterLoaderComponent,
    CustomPopupComponent,
    ShowMoreComponent
  ]
})
export class SharedModule {
}
