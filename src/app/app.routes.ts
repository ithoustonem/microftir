import { Routes } from '@angular/router';

const SITE = 'Houston Electron Microscopy, Inc.';

export const routes: Routes = [
  {
    path: '',
    title: `Micro FT-IR Analysis Lab in Houston | ${SITE}`,
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    data: {
      description:
        'Micro FT-IR analysis in Houston: identify unknown contaminants, polymers, coatings, fibers and liquids down to 10 microns. Paired with SEM/EDS.',
    },
  },
  {
    path: 'micro-ftir',
    title: `Micro FT-IR Spectroscopy Applications | ${SITE}`,
    loadComponent: () => import('./pages/micro-ftir/micro-ftir').then((m) => m.MicroFtir),
    data: {
      description:
        'How micro FT-IR spectroscopy identifies materials: transmission, reflection and ATR modes on a Thermo Scientific Nicolet iN10 infrared microscope.',
    },
  },
  {
    path: 'contact',
    title: `Request an Analysis | ${SITE}`,
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    data: { description: 'Request micro FT-IR or SEM/EDS analysis. Call +1 281-888-4261 or send us your sample details.' },
  },
  // Old URLs from the previous site.
  { path: 'index.html', redirectTo: '', pathMatch: 'full' },
  { path: 'microftir.html', redirectTo: 'micro-ftir', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
