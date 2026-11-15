import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { COMPANY, LINKS } from '../../shared/site';

@Component({
  selector: 'app-micro-ftir',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Micro FT-IR applications</span>
        <h1>Micro FT-IR spectroscopy</h1>
        <p>
          An excellent method to find out what an unknown material or contaminant is. Micro FT-IR can analyze an
          area or material as small as 10 microns.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div>
          <h2>What micro FT-IR tells you</h2>
          <p>
            Polymers, plastics, coatings, powders, residues and liquids can be analyzed to find out a material's
            chemical properties and composition, and to determine its functional groups.
          </p>
          <ul class="ticks">
            @for (x of uses; track x) { <li><app-icon name="check" [size]="18" /> {{ x }}</li> }
          </ul>
        </div>
        <figure>
          <img src="images/ftir-map-spectra.jpg" width="900" height="400"
               alt="Small sample with the optically magnified area, its functional group map and the corresponding spectra" />
          <figcaption>
            A sample measuring about half an inch, the optically magnified area, and the map and spectra produced
            by micro FT-IR analysis.
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container split split--rev">
        <figure>
          <img src="images/material-identification.jpg" width="900" height="400" loading="lazy"
               alt="Reinforced hose magnified with a light microscope, with micro FT-IR spectra of both materials" />
          <figcaption>A reinforced hose under a light microscope, with micro FT-IR spectra of both materials.</figcaption>
        </figure>
        <div>
          <h2>What is FT-IR?</h2>
          <p>
            The Fourier Transform is a mathematical process used to convert raw data into a readable spectrum. The
            data is produced by collecting the light absorbed by the bonds of vibrating molecules, which provides a
            molecular fingerprint.
          </p>
          <p>
            An IR beam irradiates the sample over a range of frequencies (4000 cm⁻¹ to 400 cm⁻¹). The sample absorbs
            this energy at specific frequencies according to its bonds, and the energy is dispersed through
            vibrational modes. The resulting fingerprint spectrum is then matched against our large library.
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2>Micro FT-IR modes</h2>
          <p>A material's composition can be identified using transmission, reflection or ATR modes.</p>
        </div>
        <div class="modes">
          @for (m of modes; track m.title) {
            <article class="card mode">
              <h3>{{ m.title }}</h3>
              <p>{{ m.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container split">
        <div>
          <h2>Our micro FT-IR system</h2>
          <p>
            {{ company.short }} is equipped with a state-of-the-art Thermo Scientific™ Nicolet™ iN™10 Infrared
            Microscope. Fourier Transform Infrared Spectroscopy measures the absorption or reflectance of infrared
            radiation at different wavelengths to produce an infrared spectrum.
          </p>
          <h3>Pair it with SEM/EDS</h3>
          <p>
            SEM &amp; EDS analysis can be paired with micro FT-IR for a more thorough analysis of a material's
            properties: micro FT-IR provides the molecular structure, while SEM/EDS provides imaging and elemental
            composition.
          </p>
          <div class="actions">
            <a routerLink="/contact" class="btn btn--primary">Request Analysis</a>
            <a [href]="links.semEds" class="btn btn--outline">SEM/EDS services</a>
          </div>
        </div>
        <figure>
          <img src="images/ftir-oil.jpg" width="805" height="400" loading="lazy"
               alt="A liquid analyzed with the ATR attachment, with micro FT-IR spectra and functional groups" />
          <figcaption>Liquids can be analyzed with the ATR attachment.</figcaption>
        </figure>
      </div>
    </section>
  `,
  styleUrl: './page.scss',
})
export class MicroFtir {
  protected readonly company = COMPANY;
  protected readonly links = LINKS;
  protected readonly uses = [
    'Material identification',
    'Chemical analysis',
    'Functional groups',
    'Contaminant identification',
    'Failure analysis support',
  ];
  protected readonly modes = [
    { title: 'Transmission', text: 'Infrared light passes through a thin sample, ideal for particles, fibers and thin films.' },
    { title: 'Reflection', text: 'Infrared light reflected from the surface, for coatings and samples on reflective substrates.' },
    { title: 'ATR', text: 'Attenuated total reflectance, for liquids, soft materials and surfaces that need little preparation.' },
  ];
}
