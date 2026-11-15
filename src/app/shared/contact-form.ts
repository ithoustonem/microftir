import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Analysis request form; posts to the Node server's /api/contact endpoint. */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (status() === 'sent') {
      <div class="done" role="status">
        <strong>Thank you, your request was sent.</strong>
        <p>We'll get back to you shortly. For immediate assistance call +1 281-888-4261.</p>
      </div>
    } @else {
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div class="grid" [class.grid--compact]="compact()">
          <label class="field">Name *
            <input formControlName="name" autocomplete="name" required />
          </label>
          <label class="field">Email *
            <input formControlName="email" type="email" autocomplete="email" required />
          </label>
          @if (!compact()) {
            <label class="field">Company
              <input formControlName="company" autocomplete="organization" />
            </label>
            <label class="field">Phone
              <input formControlName="phone" type="tel" autocomplete="tel" />
            </label>
          }
          <label class="field field--full">What do you need analyzed? *
            <textarea formControlName="message" required
                      placeholder="Describe the sample and the question you need answered"></textarea>
          </label>
        </div>
        <!-- Honeypot field for bots; hidden from people. -->
        <input class="hp" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
        @if (error()) { <p class="err" role="alert">{{ error() }}</p> }
        <button class="btn btn--primary" type="submit" [disabled]="status() === 'sending'">
          {{ status() === 'sending' ? 'Sending…' : submitLabel() }}
        </button>
      </form>
    }
  `,
  styles: `
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
    .grid--compact { grid-template-columns: 1fr; }
    .field--full { grid-column: 1 / -1; }
    .hp { position: absolute; left: -9999px; width: 1px; height: 1px; }
    .err { color: #b42318; font-size: 0.9rem; }
    .btn { width: 100%; }
    .done { padding: 8px 0; strong { color: var(--c-ink); display: block; margin-bottom: 6px; } }
    @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
  `,
})
export class ContactForm {
  readonly compact = input(false);
  readonly submitLabel = input('Send Request');

  protected readonly status = signal<Status>('idle');
  protected readonly error = signal('');

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    phone: [''],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
    website: [''],
  });

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Please fill in your name, a valid email and a short description.');
      return;
    }
    this.error.set('');
    this.status.set('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form.getRawValue()),
      });
      if (!res.ok) throw new Error(String(res.status));
      this.status.set('sent');
    } catch {
      this.status.set('error');
      this.error.set('Sorry, the request could not be sent. Please call +1 281-888-4261.');
    }
  }
}
