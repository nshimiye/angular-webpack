import './polyfills';
import { enableProdMode } from '@angular/core';
// import { platformBrowser } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

enableProdMode();
// platformBrowser().bootstrapModule(AppModule);
platformBrowserDynamic().bootstrapModule(AppModule);
