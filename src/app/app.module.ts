import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddHeaderInterceptor } from './user/add-header.interceptor';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule } from '@angular/material';
import { CoreModule } from './core/core.module';

@NgModule({
	declarations: [ AppComponent, MainNavComponent ],
	imports: [
		BrowserModule,
		CoreModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatToolbarModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatButtonModule,
		RouterModule.forRoot([
			{ path: 'singup', component: UserComponent },
			{ path: 'welcome', component: WelcomeComponent },
			{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
			{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
		])
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AddHeaderInterceptor,
			multi: true
		}
	],

	bootstrap: [ AppComponent ]
})
export class AppModule {}
