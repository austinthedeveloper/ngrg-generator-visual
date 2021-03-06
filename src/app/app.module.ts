import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MaterialsModule } from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NgrxGeneratorComponent } from './components/ngrx-generator/ngrx-generator.component';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { reducers, metaReducers } from './store';
import { GeneratorCardComponent } from './components/generator-card/generator-card.component';



@NgModule({
  declarations: [
    AppComponent,
    NgrxGeneratorComponent,
    GeneratorCardComponent
  ],
  imports: [
    BrowserModule,
    MaterialsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ClipboardModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
