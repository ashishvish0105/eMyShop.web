// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { provideHttpClient } from '@angular/common/http';
// import { provideHttpClientTesting } from '@angular/common/http/testing';
// import { UploadProduct } from './upload-product';
// import { AiService, ProductAnalysis } from '../../../../shared/services/ai.service';
// import { of, throwError, Observable } from 'rxjs';
// import { vi } from 'vitest';

// type AiServiceSpy = {
//   analyzeProductImage: (imageBase64: string) => Observable<ProductAnalysis>;
//   generateDescription: (productName: string, ingredients: string[]) => Observable<{ description: string }>;
// };

// describe('UploadProduct', () => {
//   let component: UploadProduct;
//   let fixture: ComponentFixture<UploadProduct>;
//   let aiService: AiServiceSpy;
//   let analyzeProductImageMock: ReturnType<typeof vi.fn>;
//   let generateDescriptionMock: ReturnType<typeof vi.fn>;

//   beforeEach(async () => {
//     analyzeProductImageMock = vi.fn();
//     generateDescriptionMock = vi.fn();
    
//     const aiServiceSpy: AiServiceSpy = {
//       analyzeProductImage: analyzeProductImageMock as unknown as (imageBase64: string) => Observable<ProductAnalysis>,
//       generateDescription: generateDescriptionMock as unknown as (productName: string, ingredients: string[]) => Observable<{ description: string }>,
//     };

//     await TestBed.configureTestingModule({
//       imports: [UploadProduct],
//       providers: [
//         provideHttpClient(),
//         provideHttpClientTesting(),
//         { provide: AiService, useValue: aiServiceSpy },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(UploadProduct);
//     component = fixture.componentInstance;
//     aiService = TestBed.inject(AiService) as unknown as AiServiceSpy;
//     fixture.detectChanges();
//     await fixture.whenStable();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('Form Initialization', () => {
//     it('should initialize with default values', () => {
//       expect(component.productName()).toBe('');
//       expect(component.price()).toBeNull();
//       expect(component.preparationTime()).toBeNull();
//       expect(component.description()).toBe('');
//       expect(component.category()).toBe('Main Course');
//       expect(component.cuisineType()).toBe('Italian');
//       expect(component.ingredients()).toEqual([]);
//       expect(component.isActive()).toBe(true);
//       expect(component.initialStock()).toBe(50);
//       expect(component.uploadedImages()).toEqual([]);
//       expect(component.isAnalyzingImage()).toBe(false);
//       expect(component.isGeneratingDescription()).toBe(false);
//       expect(component.errorMessage()).toBeNull();
//     });

//     it('should initialize dietary tags as all false', () => {
//       const tags = component.dietaryTags();
//       expect(tags.vegan).toBe(false);
//       expect(tags.glutenFree).toBe(false);
//       expect(tags.nutFree).toBe(false);
//       expect(tags.halal).toBe(false);
//     });
//   });

//   describe('analyzeImageWithAI', () => {
//     const mockImageDataUrl = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
//     const mockAnalysis: ProductAnalysis = {
//       name: 'Truffle Pasta',
//       description: 'Creamy pasta with black truffle',
//       category: 'Main Course',
//       cuisineType: 'Italian',
//       ingredients: ['Pasta', 'Truffle', 'Cream'],
//       dietaryTags: ['Gluten-Free', 'Vegan Friendly'],
//       estimatedPrice: 24.99,
//       preparationTime: 20,
//     };

//     it('should analyze image and populate form fields', (done) => {
//       analyzeProductImageMock.mockReturnValue(of(mockAnalysis));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       setTimeout(() => {
//         expect(component.productName()).toBe('Truffle Pasta');
//         expect(component.description()).toBe('Creamy pasta with black truffle');
//         expect(component.category()).toBe('Main Course');
//         expect(component.cuisineType()).toBe('Italian');
//         expect(component.ingredients()).toEqual(['Pasta', 'Truffle', 'Cream']);
//         expect(component.price()).toBe(24.99);
//         expect(component.preparationTime()).toBe(20);
//         expect(component.isAnalyzingImage()).toBe(false);
//         expect(component.errorMessage()).toBeNull();
//         done();
//       }, 100);
//     });

//     it('should set loading state during analysis', () => {
//       analyzeProductImageMock.mockReturnValue(of(mockAnalysis));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       expect(component.isAnalyzingImage()).toBe(true);
//     });

//     it('should extract base64 from data URL', () => {
//       analyzeProductImageMock.mockReturnValue(of(mockAnalysis));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       expect(analyzeProductImageMock).toHaveBeenCalledWith(
//         expect.stringContaining('iVBORw0KGgo')
//       );
//     });

//     it('should handle base64 string without data URL prefix', () => {
//       const base64Only = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
//       analyzeProductImageMock.mockReturnValue(of(mockAnalysis));

//       component.analyzeImageWithAI(base64Only);

//       expect(analyzeProductImageMock).toHaveBeenCalledWith(base64Only);
//     });

//     it('should update dietary tags correctly', (done) => {
//       analyzeProductImageMock.mockReturnValue(of(mockAnalysis));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       setTimeout(() => {
//         const tags = component.dietaryTags();
//         expect(tags.glutenFree).toBe(true);
//         expect(tags.vegan).toBe(true);
//         done();
//       }, 100);
//     });

//     it('should handle different dietary tag formats', (done) => {
//       const analysisWithDifferentTags: ProductAnalysis = {
//         ...mockAnalysis,
//         dietaryTags: ['vegan', 'nut-free', 'halal certified'],
//       };
//       analyzeProductImageMock.mockReturnValue(of(analysisWithDifferentTags));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       setTimeout(() => {
//         const tags = component.dietaryTags();
//         expect(tags.vegan).toBe(true);
//         expect(tags.nutFree).toBe(true);
//         expect(tags.halal).toBe(true);
//         done();
//       }, 100);
//     });

//     it('should handle API errors', (done) => {
//       const error = new Error('API Error');
//       analyzeProductImageMock.mockReturnValue(throwError(() => error));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       setTimeout(() => {
//         expect(component.isAnalyzingImage()).toBe(false);
//         expect(component.errorMessage()).toBe('API Error');
//         done();
//       }, 100);
//     });

//     it('should not analyze if already analyzing', () => {
//       component.isAnalyzingImage.set(true);
//       analyzeProductImageMock.mockReturnValue(of(mockAnalysis));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       expect(analyzeProductImageMock).not.toHaveBeenCalled();
//     });

//     it('should clear error message before analysis', () => {
//       component.errorMessage.set('Previous error');
//       analyzeProductImageMock.mockReturnValue(of(mockAnalysis));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       expect(component.errorMessage()).toBeNull();
//     });

//     it('should handle partial analysis data', (done) => {
//       const partialAnalysis: ProductAnalysis = {
//         name: 'Test Dish',
//         description: '',
//         category: 'Appetizer',
//         cuisineType: 'French',
//         ingredients: [],
//         dietaryTags: [],
//       };
//       analyzeProductImageMock.mockReturnValue(of(partialAnalysis));

//       component.analyzeImageWithAI(mockImageDataUrl);

//       setTimeout(() => {
//         expect(component.productName()).toBe('Test Dish');
//         expect(component.description()).toBe('');
//         expect(component.ingredients()).toEqual([]);
//         done();
//       }, 100);
//     });
//   });

//   describe('generateDescriptionWithAI', () => {
//     const mockDescription = {
//       description: 'A delicious dish with amazing flavors.',
//     };

//     it('should generate description successfully', (done) => {
//       component.productName.set('Test Dish');
//       component.ingredients.set(['Ingredient1', 'Ingredient2']);
//       generateDescriptionMock.mockReturnValue(of(mockDescription));

//       component.generateDescriptionWithAI();

//       setTimeout(() => {
//         expect(component.description()).toBe('A delicious dish with amazing flavors.');
//         expect(component.isGeneratingDescription()).toBe(false);
//         expect(component.errorMessage()).toBeNull();
//         done();
//       }, 100);
//     });

//     it('should set loading state during generation', () => {
//       component.productName.set('Test Dish');
//       component.ingredients.set(['Ingredient1']);
//       generateDescriptionMock.mockReturnValue(of(mockDescription));

//       component.generateDescriptionWithAI();

//       expect(component.isGeneratingDescription()).toBe(true);
//     });

//     it('should require product name and ingredients', () => {
//       component.productName.set('');
//       component.ingredients.set([]);

//       component.generateDescriptionWithAI();

//       expect(component.errorMessage()).toContain('product name and at least one ingredient');
//       expect(generateDescriptionMock).not.toHaveBeenCalled();
//     });

//     it('should require product name', () => {
//       component.productName.set('');
//       component.ingredients.set(['Ingredient1']);

//       component.generateDescriptionWithAI();

//       expect(component.errorMessage()).toContain('product name and at least one ingredient');
//     });

//     it('should require at least one ingredient', () => {
//       component.productName.set('Test Dish');
//       component.ingredients.set([]);

//       component.generateDescriptionWithAI();

//       expect(component.errorMessage()).toContain('product name and at least one ingredient');
//     });

//     it('should handle API errors', (done) => {
//       component.productName.set('Test Dish');
//       component.ingredients.set(['Ingredient1']);
//       const error = new Error('Generation failed');
//       generateDescriptionMock.mockReturnValue(throwError(() => error));

//       component.generateDescriptionWithAI();

//       setTimeout(() => {
//         expect(component.isGeneratingDescription()).toBe(false);
//         expect(component.errorMessage()).toBe('Generation failed');
//         done();
//       }, 100);
//     });

//     it('should not generate if already generating', () => {
//       component.productName.set('Test Dish');
//       component.ingredients.set(['Ingredient1']);
//       component.isGeneratingDescription.set(true);
//       generateDescriptionMock.mockReturnValue(of(mockDescription));

//       component.generateDescriptionWithAI();

//       expect(generateDescriptionMock).not.toHaveBeenCalled();
//     });

//     it('should clear error message before generation', () => {
//       component.productName.set('Test Dish');
//       component.ingredients.set(['Ingredient1']);
//       component.errorMessage.set('Previous error');
//       generateDescriptionMock.mockReturnValue(of(mockDescription));

//       component.generateDescriptionWithAI();

//       expect(component.errorMessage()).toBeNull();
//     });
//   });

//   describe('Ingredient Management', () => {
//     it('should add ingredient', () => {
//       component.newIngredient.set('Tomato');

//       component.addIngredient();

//       expect(component.ingredients()).toContain('Tomato');
//       expect(component.newIngredient()).toBe('');
//     });

//     it('should not add duplicate ingredients', () => {
//       component.ingredients.set(['Tomato']);
//       component.newIngredient.set('Tomato');

//       component.addIngredient();

//       expect(component.ingredients().length).toBe(1);
//     });

//     it('should not add empty ingredient', () => {
//       component.newIngredient.set('   ');

//       component.addIngredient();

//       expect(component.ingredients().length).toBe(0);
//     });

//     it('should remove ingredient', () => {
//       component.ingredients.set(['Tomato', 'Cheese']);

//       component.removeIngredient('Tomato');

//       expect(component.ingredients()).not.toContain('Tomato');
//       expect(component.ingredients()).toContain('Cheese');
//     });
//   });

//   describe('Image Management', () => {
//     it('should remove image by index', () => {
//       component.uploadedImages.set(['image1', 'image2', 'image3']);

//       component.removeImage(1);

//       expect(component.uploadedImages()).toEqual(['image1', 'image3']);
//     });

//     it('should handle file selection', (done) => {
//       const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
//       const input = document.createElement('input');
//       input.type = 'file';
//       Object.defineProperty(input, 'files', {
//         value: [file],
//         writable: false,
//       });

//       const event = new Event('change');
//       Object.defineProperty(event, 'target', {
//         value: input,
//         writable: false,
//       });

//       component.onFileSelected(event);

//       setTimeout(() => {
//         expect(component.uploadedImages().length).toBeGreaterThan(0);
//         done();
//       }, 100);
//     });

//     it('should ignore non-image files', () => {
//       const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
//       const input = document.createElement('input');
//       input.type = 'file';
//       Object.defineProperty(input, 'files', {
//         value: [file],
//         writable: false,
//       });

//       const event = new Event('change');
//       Object.defineProperty(event, 'target', {
//         value: input,
//         writable: false,
//       });

//       component.onFileSelected(event);

//       expect(component.uploadedImages().length).toBe(0);
//     });

//     it('should handle drag and drop', (done) => {
//       const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
//       const dataTransfer = new DataTransfer();
//       dataTransfer.items.add(file);

//       const dragEvent = new DragEvent('drop', {
//         dataTransfer: dataTransfer,
//       });

//       component.onDrop(dragEvent);

//       setTimeout(() => {
//         expect(component.uploadedImages().length).toBeGreaterThan(0);
//         done();
//       }, 100);
//     });

//     it('should prevent default on drag over', () => {
//       const dragEvent = new DragEvent('dragover');
//       const preventDefaultSpy = vi.spyOn(dragEvent, 'preventDefault');
//       const stopPropagationSpy = vi.spyOn(dragEvent, 'stopPropagation');

//       component.onDragOver(dragEvent);

//       expect(preventDefaultSpy).toHaveBeenCalled();
//       expect(stopPropagationSpy).toHaveBeenCalled();
//     });
//   });

//   describe('Dietary Tags Toggle', () => {
//     it('should toggle vegan tag', () => {
//       component.toggleVegan();

//       expect(component.dietaryTags().vegan).toBe(true);

//       component.toggleVegan();

//       expect(component.dietaryTags().vegan).toBe(false);
//     });

//     it('should toggle gluten free tag', () => {
//       component.toggleGlutenFree();

//       expect(component.dietaryTags().glutenFree).toBe(true);

//       component.toggleGlutenFree();

//       expect(component.dietaryTags().glutenFree).toBe(false);
//     });

//     it('should toggle nut free tag', () => {
//       component.toggleNutFree();

//       expect(component.dietaryTags().nutFree).toBe(true);

//       component.toggleNutFree();

//       expect(component.dietaryTags().nutFree).toBe(false);
//     });

//     it('should toggle halal tag', () => {
//       component.toggleHalal();

//       expect(component.dietaryTags().halal).toBe(true);

//       component.toggleHalal();

//       expect(component.dietaryTags().halal).toBe(false);
//     });
//   });

//   describe('Form Actions', () => {
//     it('should discard and reset form', () => {
//       component.productName.set('Test');
//       component.price.set(10);
//       component.description.set('Test description');
//       component.ingredients.set(['Ingredient1']);
//       component.uploadedImages.set(['image1']);

//       component.discard();

//       expect(component.productName()).toBe('');
//       expect(component.price()).toBeNull();
//       expect(component.description()).toBe('');
//       expect(component.ingredients()).toEqual([]);
//       expect(component.uploadedImages()).toEqual([]);
//       expect(component.category()).toBe('Main Course');
//       expect(component.cuisineType()).toBe('Italian');
//       expect(component.isActive()).toBe(true);
//       expect(component.initialStock()).toBe(50);
//       expect(component.errorMessage()).toBeNull();
//     });

//     it('should save draft', () => {
//       const consoleSpy = vi.spyOn(console, 'log');
//       component.productName.set('Test Dish');
//       component.price.set(15.99);

//       component.saveDraft();

//       expect(consoleSpy).toHaveBeenCalledWith(
//         'Saving draft...',
//         expect.objectContaining({
//           productName: 'Test Dish',
//           price: 15.99,
//         })
//       );
//     });

//     it('should publish product', () => {
//       const consoleSpy = vi.spyOn(console, 'log');
//       component.productName.set('Test Dish');
//       component.price.set(15.99);

//       component.publishProduct();

//       expect(consoleSpy).toHaveBeenCalledWith(
//         'Publishing product...',
//         expect.objectContaining({
//           productName: 'Test Dish',
//           price: 15.99,
//         })
//       );
//     });
//   });

//   describe('Helper Methods', () => {
//     it('should parse float correctly', () => {
//       expect(component.parseFloat('10.5')).toBe(10.5);
//       expect(component.parseFloat('0')).toBe(0);
//     });

//     it('should parse int correctly', () => {
//       expect(component.parseInt('10')).toBe(10);
//       expect(component.parseInt('0')).toBe(0);
//     });
//   });
// });
