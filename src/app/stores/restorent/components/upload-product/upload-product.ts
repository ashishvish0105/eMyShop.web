import { Component, signal, inject, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiService, ProductAnalysis } from '../../../../shared/services/ai.service';

@Component({
  selector: 'app-upload-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './upload-product.html',
  styleUrl: './upload-product.scss',
})
export class UploadProduct {
  private aiService = inject(AiService);

  @ViewChild('fileinput', { static: false }) fileInput?: ElementRef<HTMLInputElement>;

  // Form data
  productName = signal('');
  price = signal<number | null>(null);
  preparationTime = signal<number | null>(null);
  description = signal('');
  category = signal('Main Course');
  cuisineType = signal('Italian');
  ingredients = signal<string[]>([]);
  newIngredient = signal('');
  dietaryTags = signal<{
    vegan: boolean;
    glutenFree: boolean;
    nutFree: boolean;
    halal: boolean;
  }>({
    vegan: false,
    glutenFree: false,
    nutFree: false,
    halal: false,
  });
  isActive = signal(true);
  initialStock = signal(50);
  uploadedImages = signal<string[]>([]);

  // Loading states
  isAnalyzingImage = signal(false);
  isGeneratingDescription = signal(false);
  errorMessage = signal<string | null>(null);

  openFileDialog(): void {
    this.fileInput?.nativeElement?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          // Remove data:image/jpeg;base64, prefix if present
          const base64 = result.includes(',')
            ? result.split(',')[1]
            : result;
          this.uploadedImages.update((images) => [...images, result]);
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Reset input to allow selecting the same file again
    input.value = '';
  }

  analyzeImageWithAI(imageDataUrl: string): void {
    if (this.isAnalyzingImage()) return;

    // Extract base64 from data URL
    const base64 = imageDataUrl.includes(',')
      ? imageDataUrl.split(',')[1]
      : imageDataUrl;

    this.isAnalyzingImage.set(true);
    this.errorMessage.set(null);

    this.aiService.analyzeProductImage(base64).subscribe({
      next: (analysis: ProductAnalysis) => {
        // Populate form with AI analysis
        if (analysis.name) this.productName.set(analysis.name);
        if (analysis.description) this.description.set(analysis.description);
        if (analysis.category) this.category.set(analysis.category);
        if (analysis.cuisineType) this.cuisineType.set(analysis.cuisineType);
        if (analysis.ingredients && analysis.ingredients.length > 0) {
          this.ingredients.set([...analysis.ingredients]);
        }
        if (analysis.estimatedPrice) this.price.set(analysis.estimatedPrice);
        if (analysis.preparationTime)
          this.preparationTime.set(analysis.preparationTime);

        // Update dietary tags
        if (analysis.dietaryTags) {
          const tags = analysis.dietaryTags.map((tag) =>
            tag.toLowerCase().replace(/\s+/g, '')
          );
          this.dietaryTags.update((current) => ({
            ...current,
            vegan: tags.includes('veganfriendly') || tags.includes('vegan'),
            glutenFree:
              tags.includes('gluten-free') || tags.includes('glutenfree'),
            nutFree: tags.includes('nut-free') || tags.includes('nutfree'),
            halal: tags.includes('halalcertified') || tags.includes('halal'),
          }));
        }

        this.isAnalyzingImage.set(false);
      },
      error: (error) => {
        console.error('AI Analysis Error:', error);
        this.errorMessage.set(
          error.message || 'Failed to analyze image. Please try again.'
        );
        this.isAnalyzingImage.set(false);
      },
    });
  }

  generateDescriptionWithAI(): void {
    if (this.isGeneratingDescription()) return;
    if (!this.productName() || this.ingredients().length === 0) {
      this.errorMessage.set(
        'Please provide a product name and at least one ingredient.'
      );
      return;
    }

    this.isGeneratingDescription.set(true);
    this.errorMessage.set(null);

    this.aiService
      .generateDescription(this.productName(), this.ingredients())
      .subscribe({
        next: (result) => {
          if (result.description) {
            this.description.set(result.description);
          }
          this.isGeneratingDescription.set(false);
        },
        error: (error) => {
          console.error('AI Description Error:', error);
          this.errorMessage.set(
            error.message || 'Failed to generate description. Please try again.'
          );
          this.isGeneratingDescription.set(false);
        },
      });
  }

  addIngredient(): void {
    const ingredient = this.newIngredient().trim();
    if (ingredient && !this.ingredients().includes(ingredient)) {
      this.ingredients.update((ingredients) => [...ingredients, ingredient]);
      this.newIngredient.set('');
    }
  }

  removeIngredient(ingredient: string): void {
    this.ingredients.update((ingredients) =>
      ingredients.filter((ing) => ing !== ingredient)
    );
  }

  removeImage(index: number): void {
    this.uploadedImages.update((images) => images.filter((_, i) => i !== index));
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            this.uploadedImages.update((images) => [...images, result]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  saveDraft(): void {
    // TODO: Implement save draft functionality
    console.log('Saving draft...', {
      productName: this.productName(),
      price: this.price(),
      description: this.description(),
    });
  }

  publishProduct(): void {
    // TODO: Implement publish functionality
    console.log('Publishing product...', {
      productName: this.productName(),
      price: this.price(),
      description: this.description(),
    });
  }

  discard(): void {
    // Reset form
    this.productName.set('');
    this.price.set(null);
    this.preparationTime.set(null);
    this.description.set('');
    this.category.set('Main Course');
    this.cuisineType.set('Italian');
    this.ingredients.set([]);
    this.newIngredient.set('');
    this.dietaryTags.set({
      vegan: false,
      glutenFree: false,
      nutFree: false,
      halal: false,
    });
    this.isActive.set(true);
    this.initialStock.set(50);
    this.uploadedImages.set([]);
    this.errorMessage.set(null);
  }

  // Helper methods for template
  parseFloat(value: string): number {
    return parseFloat(value);
  }

  parseInt(value: string): number {
    return parseInt(value, 10);
  }

  toggleVegan(): void {
    this.dietaryTags.update((tags) => ({
      ...tags,
      vegan: !tags.vegan,
    }));
  }

  toggleGlutenFree(): void {
    this.dietaryTags.update((tags) => ({
      ...tags,
      glutenFree: !tags.glutenFree,
    }));
  }

  toggleNutFree(): void {
    this.dietaryTags.update((tags) => ({
      ...tags,
      nutFree: !tags.nutFree,
    }));
  }

  toggleHalal(): void {
    this.dietaryTags.update((tags) => ({
      ...tags,
      halal: !tags.halal,
    }));
  }
}
