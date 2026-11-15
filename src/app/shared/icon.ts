import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Small inline line icons, so the site needs no icon font. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" [attr.width]="size()" [attr.height]="size()">
      @switch (name()) {
        @case ('target') { <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/> }
        @case ('layers') { <path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="m2 13 10 5 10-5"/><path d="m2 17.5 10 5 10-5" opacity=".5"/> }
        @case ('scope') { <path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/> }
        @case ('library') { <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M9 7h7M9 11h5"/> }
        @case ('phone') { <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/> }
        @case ('pin') { <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/> }
        @case ('check') { <path d="M20 6 9 17l-5-5"/> }
        @case ('arrow') { <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/> }
        @case ('plus') { <path d="M12 5v14M5 12h14"/> }
        @case ('menu') { <path d="M3 6h18M3 12h18M3 18h18"/> }
        @case ('close') { <path d="M18 6 6 18M6 6l12 12"/> }
        @case ('spectrum') { <path d="M2 18h20"/><path d="M2 6c2 0 2 10 4 10s1.5-6 3-6 1.5 8 3 8 2-12 4-12 1.5 9 3 9 1-3 3-3"/> }
      }
    </svg>
  `,
  styles: `:host { display: inline-flex; line-height: 0; }`,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(24);
}
