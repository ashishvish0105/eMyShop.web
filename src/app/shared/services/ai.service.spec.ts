import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AiService, ProductAnalysis } from './ai.service';
import { provideHttpClient } from '@angular/common/http';

describe('AiService', () => {
  let service: AiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AiService, provideHttpClient()],
    });
    service = TestBed.inject(AiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('analyzeProductImage', () => {
    const mockBase64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const mockApiResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              name: 'Truffle Pasta',
              description: 'Creamy pasta with black truffle',
              category: 'Main Course',
              cuisineType: 'Italian',
              ingredients: ['Pasta', 'Truffle', 'Cream', 'Parmesan'],
              dietaryTags: ['Gluten-Free', 'Vegan Friendly'],
              estimatedPrice: 24.99,
              preparationTime: 20,
            } as ProductAnalysis),
          },
        },
      ],
    };

    it('should analyze product image successfully', (done) => {
      service.analyzeProductImage(mockBase64Image).subscribe({
        next: (result) => {
          expect(result).toBeDefined();
          expect(result.name).toBe('Truffle Pasta');
          expect(result.description).toBe('Creamy pasta with black truffle');
          expect(result.category).toBe('Main Course');
          expect(result.cuisineType).toBe('Italian');
          expect(result.ingredients).toEqual(['Pasta', 'Truffle', 'Cream', 'Parmesan']);
          expect(result.dietaryTags).toEqual(['Gluten-Free', 'Vegan Friendly']);
          expect(result.estimatedPrice).toBe(24.99);
          expect(result.preparationTime).toBe(20);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.model).toBe('gpt-4o-mini');
      expect(req.request.body.response_format).toEqual({ type: 'json_object' });
      expect(req.request.body.messages[0].content[1].image_url.url).toContain(
        mockBase64Image
      );
      req.flush(mockApiResponse);
    });

    it('should use gpt-4o-mini model for vision tasks', (done) => {
      service.analyzeProductImage(mockBase64Image).subscribe({
        next: () => done(),
        error: done.fail,
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      expect(req.request.body.model).toBe('gpt-4o-mini');
      req.flush(mockApiResponse);
    });

    it('should use JSON mode for response format', (done) => {
      service.analyzeProductImage(mockBase64Image).subscribe({
        next: () => done(),
        error: done.fail,
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      expect(req.request.body.response_format).toEqual({ type: 'json_object' });
      req.flush(mockApiResponse);
    });

    it('should handle API errors gracefully', (done) => {
      service.analyzeProductImage(mockBase64Image).subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.message).toContain('Failed to analyze image');
          done();
        },
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      req.flush(
        { error: { message: 'API Error' } },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

    it('should handle missing content in response', (done) => {
      service.analyzeProductImage(mockBase64Image).subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.message).toContain('No content in AI response');
          done();
        },
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      req.flush({
        choices: [{ message: {} }],
      });
    });

    it('should handle invalid JSON in response', (done) => {
      service.analyzeProductImage(mockBase64Image).subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.message).toContain('Failed to parse AI response');
          done();
        },
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      req.flush({
        choices: [
          {
            message: {
              content: 'invalid json {',
            },
          },
        ],
      });
    });

    it('should include proper headers with API key', (done) => {
      service.analyzeProductImage(mockBase64Image).subscribe({
        next: () => done(),
        error: done.fail,
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Authorization')).toContain('Bearer');
      req.flush(mockApiResponse);
    });

    it('should handle empty choices array', (done) => {
      service.analyzeProductImage(mockBase64Image).subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.message).toContain('No content in AI response');
          done();
        },
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      req.flush({
        choices: [],
      });
    });
  });

  describe('generateDescription', () => {
    const mockProductName = 'Margherita Pizza';
    const mockIngredients = ['Tomato', 'Mozzarella', 'Basil'];
    const mockApiResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              description: 'A classic Italian pizza with fresh tomatoes, mozzarella, and basil.',
            }),
          },
        },
      ],
    };

    it('should generate description successfully', (done) => {
      service.generateDescription(mockProductName, mockIngredients).subscribe({
        next: (result) => {
          expect(result).toBeDefined();
          expect(result.description).toBe(
            'A classic Italian pizza with fresh tomatoes, mozzarella, and basil.'
          );
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.model).toBe('gpt-4o-mini');
      expect(req.request.body.response_format).toEqual({ type: 'json_object' });
      expect(req.request.body.messages[0].content).toContain(mockProductName);
      expect(req.request.body.messages[0].content).toContain('Tomato');
      req.flush(mockApiResponse);
    });

    it('should use JSON mode for chat completion', (done) => {
      service.generateDescription(mockProductName, mockIngredients).subscribe({
        next: () => done(),
        error: done.fail,
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      expect(req.request.body.response_format).toEqual({ type: 'json_object' });
      req.flush(mockApiResponse);
    });

    it('should handle API errors gracefully', (done) => {
      service.generateDescription(mockProductName, mockIngredients).subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.message).toContain('Failed to generate description');
          done();
        },
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      req.flush(
        { error: { message: 'API Error' } },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

    it('should include ingredients in the prompt', (done) => {
      service.generateDescription(mockProductName, mockIngredients).subscribe({
        next: () => done(),
        error: done.fail,
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      const content = req.request.body.messages[0].content;
      expect(content).toContain(mockProductName);
      expect(content).toContain('Tomato, Mozzarella, Basil');
      req.flush(mockApiResponse);
    });

    it('should handle empty description in response', (done) => {
      service.generateDescription(mockProductName, mockIngredients).subscribe({
        next: (result) => {
          expect(result.description).toBe('');
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
      req.flush({
        choices: [
          {
            message: {
              content: JSON.stringify({ description: '' }),
            },
          },
        ],
      });
    });
  });
});

