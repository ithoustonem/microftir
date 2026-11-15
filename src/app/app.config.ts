import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, provideRouter, withInMemoryScrolling } from '@angular/router';
import { Meta, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { routes } from './app.routes';

/** Sets the meta description from each route's `data.description`. */
function metaDescriptions() {
  const router = inject(Router);
  const route = inject(ActivatedRoute);
  const meta = inject(Meta);
  router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
    let r = route;
    while (r.firstChild) r = r.firstChild;
    const description = r.snapshot.data['description'];
    if (description) {
      meta.updateTag({ name: 'description', content: description });
      meta.updateTag({ property: 'og:description', content: description });
    }
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(metaDescriptions),
  ],
};
