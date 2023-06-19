import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// shared
import { ToolbarModule } from './shared/components/toolbar/toolbar.module';

// aplicação
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,

        // material
        MatSnackBarModule,
        MatDialogModule,
        MatIconModule,

        // shared
        ToolbarModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
