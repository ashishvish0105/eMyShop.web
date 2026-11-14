import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  readonly currentYear = new Date().getFullYear();

  activeAccordion:
    | 'explore'
    | 'account'
    | 'support'
    | null = null;

  desktopFeedback = '';
  desktopFeedbackType: FeedbackType = 'success';

  mobileFeedback = '';
  mobileFeedbackType: FeedbackType = 'success';

  // Mobile accordion toggle
  toggleAccordion(
    section: 'explore' | 'account' | 'support'
  ): void {
    this.activeAccordion =
      this.activeAccordion === section
        ? null
        : section;
  }

  // Newsletter form submission
  onNewsletterSubmit(
    event: Event,
    email: string,
    source: NewsletterSource
  ): void {
    event.preventDefault();

    this.subscribe(email, source);
  }

  // Newsletter validation
  subscribe(
    email: string,
    source: NewsletterSource
  ): void {

    const normalizedEmail = email.trim();

    const isValidEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      this.setFeedback(
        source,
        'Please enter a valid email address.',
        'error'
      );

      return;
    }

    // TODO: Integrate newsletter subscription API here.
    this.setFeedback(
      source,
      'Thank you for subscribing to eMyshop!',
      'success'
    );
  }

  // Update newsletter feedback
  private setFeedback(
    source: NewsletterSource,
    message: string,
    type: FeedbackType
  ): void {

    if (source === 'desktop') {
      this.desktopFeedback = message;
      this.desktopFeedbackType = type;
      return;
    }

    this.mobileFeedback = message;
    this.mobileFeedbackType = type;
  }
}

type NewsletterSource = 'desktop' | 'mobile';
type FeedbackType = 'success' | 'error';
