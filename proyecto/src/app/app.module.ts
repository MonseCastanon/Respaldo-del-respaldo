import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgxPayPalModule } from 'ngx-paypal';
import { SafePipe } from './auth/pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
    //FormularioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    SocialLoginModule,
    NgxPayPalModule,
  ],
  providers: [
    provideAnimationsAsync(), // ? Facebook
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          lang: 'en',
          providers: [
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('924167296588662')
            }
          ],
          onError: (err) => {
            console.error(err);
          }
        } as SocialAuthServiceConfig,
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
