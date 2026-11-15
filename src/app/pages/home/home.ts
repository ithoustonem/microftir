import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { ContactForm } from '../../shared/contact-form';
import { BENEFITS, CAPABILITIES, CASES, COMPANY, FAQS, LINKS, MATERIALS, SERVICES, STATS, STEPS } from '../../shared/site';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, ContactForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly company = COMPANY;
  protected readonly links = LINKS;
  protected readonly capabilities = CAPABILITIES;
  protected readonly benefits = BENEFITS;
  protected readonly stats = STATS;
  protected readonly services = SERVICES;
  protected readonly steps = STEPS;
  protected readonly materials = MATERIALS;
  protected readonly cases = CASES;
  protected readonly faqs = FAQS;

  protected readonly activeMaterial = signal(MATERIALS[0].key);
  protected readonly material = computed(() => MATERIALS.find((m) => m.key === this.activeMaterial())!);
  protected readonly openFaq = signal<number | null>(0);

  toggleFaq(i: number) {
    this.openFaq.update((cur) => (cur === i ? null : i));
  }
}
