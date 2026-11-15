import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { ContactForm } from '../../shared/contact-form';
import { COMPANY } from '../../shared/site';

@Component({
  selector: 'app-contact',
  imports: [Icon, ContactForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Contact</span>
        <h1>Request an analysis</h1>
        <p>Tell us about your sample and what you need to know. For immediate assistance call {{ company.phone }}.</p>
      </div>
    </section>
    <section class="section">
      <div class="container grid">
        <div class="card form-card">
          <h2>Send us a request</h2>
          <app-contact-form submitLabel="Send Request" />
        </div>
        <aside class="info">
          <div class="card info__card">
            <app-icon name="phone" />
            <div><h3>Call us</h3><a [href]="company.phoneHref">{{ company.phone }}</a></div>
          </div>
          <div class="card info__card">
            <app-icon name="pin" />
            <div>
              <h3>Visit or ship samples to</h3>
              <p>{{ company.name }}<br />{{ company.street }}<br />{{ company.city }}</p>
              <a [href]="company.mapUrl" target="_blank" rel="noopener">Open in Google Maps</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  `,
  styleUrl: '../micro-ftir/page.scss',
  styles: `
    .grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px; align-items: start; }
    .form-card { padding: 32px; h2 { font-size: 1.5rem; margin-bottom: 20px; } }
    .info { display: grid; gap: 20px; }
    .info__card {
      padding: 24px; display: flex; gap: 16px; align-items: flex-start;
      app-icon { color: var(--c-primary); background: var(--c-soft); padding: 10px; border-radius: 10px; }
      h3 { margin: 0 0 4px; font-size: 1.05rem; }
      p { margin: 0 0 6px; }
    }
    @media (max-width: 860px) { .grid { grid-template-columns: 1fr; } .form-card { padding: 22px; } }
  `,
})
export class Contact {
  protected readonly company = COMPANY;
}
