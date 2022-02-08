import { UserProfileModule } from './userProfile/userProfile.module';
import { EditArticleModule } from './editArticle/editArticle.module';
import { CreateArticleModule } from './createArticle/createArticle.module';
import { GlobalFeedModule } from './globalFeed/globalFeed.module';
import { AuthInterceptor } from './shared/services/authinterceptor.service';
import { PersistanceService } from './shared/services/persistance.service';
import { TopBarModule } from './shared/modules/topBar/topBar.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { YourFeedModule } from './yourFeed/yourFeed.module';
import { TagsFeedModule } from './tagsFeed/tagsFeed.module';
import { ArticleModule } from './article/article.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagsFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
