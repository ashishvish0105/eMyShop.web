import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { TrustComponent } from '../trust/trust.component';
import { CtaComponent } from '../cta/cta.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { BenefitsComponent } from '../benefits/benefits.component';
import { HeroComponent } from '../hero/hero.component';


@Component({
  selector: 'app-create-store-leading',
  standalone: true,
  imports: [TrustComponent, CtaComponent, DashboardComponent, HowItWorksComponent, BenefitsComponent, HeroComponent],
  templateUrl: './create-store-leading.component.html',
  styleUrl: './create-store-leading.component.scss'
})
export class CreateStoreLeadingComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private gsapContext?: gsap.Context;

  readonly benefits = [
    { icon: '◈', title: 'Your own online store', description: 'Give your shop a digital storefront customers can browse anytime.' },
    { icon: '◎', title: 'Reach more customers', description: 'Help nearby shoppers discover your products beyond walk-in traffic.' },
    { icon: '▦', title: 'Simple product management', description: 'Add product photos, prices and descriptions in one place.' },
    { icon: '↗', title: 'Online payments', description: 'Offer convenient digital payment options through your platform.' },
    { icon: '⌂', title: 'Home delivery', description: 'Make delivery available when it works for your business.' },
    { icon: '⌖', title: 'Store pickup', description: 'Let customers order online and collect directly from your shop.' },
    { icon: '☷', title: 'Order management', description: 'Keep incoming orders and their status organized in one dashboard.' },
    { icon: '✳', title: 'A stronger digital presence', description: 'Build visibility and create more ways for customers to shop local.' }
  ];

  readonly steps = [
    { number: '01', title: 'Register your shop', description: 'Add a few details about your business and create your shop profile.' },
    { number: '02', title: 'Build your online store', description: 'Upload products, set prices and make your storefront your own.' },
    { number: '03', title: 'Start receiving orders', description: 'Let customers order for delivery or convenient in-store pickup.' }
  ];

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const element = this.host.nativeElement;
      gsap.registerPlugin(ScrollTrigger);

      this.gsapContext = gsap.context(() => {
        gsap.from('.hero-copy > *', {
          y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
        });

        gsap.from('.hero-visual', {
          y: 32, opacity: 0, scale: 0.97, duration: 1, delay: 0.15, ease: 'power3.out'
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((item) => {
          gsap.from(item, {
            y: 32,
            opacity: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 86%', once: true }
          });
        });

        gsap.to('.floating-product', {
          y: -12, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.35
        });

        gsap.to('.hero-orbit', {
          rotate: 360, duration: 36, ease: 'none', repeat: -1, transformOrigin: '50% 50%'
        });

        gsap.to('.hero-photo', {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      }, element);

      this.destroyRef.onDestroy(() => this.gsapContext?.revert());
    });
  }
}
