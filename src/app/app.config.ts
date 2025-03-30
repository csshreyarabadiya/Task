import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
 import { provideStore,provideStates} from '@ngxs/store'; 


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
 import { UserState } from './store/userState';

export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(),provideStore(),provideStates([UserState]),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
};
