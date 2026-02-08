import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';

export interface ProductAnalysis {
  name: string;
  description: string;
  category: string;
  cuisineType: string;
  ingredients: string[];
  dietaryTags: string[];
  estimatedPrice?: number;
  preparationTime?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private _apiKey: string = this.getApiKey();
  private apiUrl = 'https://api.openai.com/v1';

  private getApiKey(): string {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Try to get from window object (set via script tag or build-time replacement)
      return (window as any).__OPENAI_API_KEY__ || '';
    }
    // For SSR or Node environments
    if (typeof process !== 'undefined' && process.env) {
      return process.env['NG_APP_OPENAI_API_KEY'] || '';
    }
    return '';
  }

  /**
   * Set the OpenAI API key at runtime
   * This allows setting the API key dynamically instead of using environment variables
   */
  setApiKey(key: string): void {
    this._apiKey = key;
  }

  /**
   * Get the current API key (for debugging purposes)
   */
  getApiKeyValue(): string {
    return this._apiKey;
  }

  /**
   * Analyze product image and generate product details
   * Uses gpt-4o-mini for vision tasks to save costs
   */
  analyzeProductImage(imageBase64: string): Observable<ProductAnalysis> {
    if (!this._apiKey) {
      return throwError(
        () => new Error('OpenAI API key is not configured. Please set it using setApiKey() method.')
      );
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this._apiKey}`,
    });

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this food product image and provide detailed information in JSON format. 
              Return a JSON object with the following structure:
              {
                "name": "suggested product name",
                "description": "detailed description of the dish",
                "category": "one of: Main Course, Appetizer, Dessert, Beverage, Specials",
                "cuisineType": "one of: Italian, French, Mexican, Japanese, Mediterranean, or other appropriate type",
                "ingredients": ["array of ingredient names"],
                "dietaryTags": ["array of applicable tags: Vegan Friendly, Gluten-Free, Nut-Free, Halal Certified"],
                "estimatedPrice": number (in USD, reasonable estimate),
                "preparationTime": number (in minutes)
              }
              Be specific and accurate based on what you see in the image.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1000,
    };

    return this.http
      .post<{ choices: Array<{ message: { content: string } }> }>(
        `${this.apiUrl}/chat/completions`,
        payload,
        { headers }
      )
      .pipe(
        map((response) => {
          try {
            const content = response.choices[0]?.message?.content;
            if (content) {
              return JSON.parse(content) as ProductAnalysis;
            } else {
              throw new Error('No content in AI response');
            }
          } catch (parseError) {
            throw new Error('Failed to parse AI response: ' + parseError);
          }
        }),
        catchError((error) => {
          console.error('AI API Error:', error);
          return throwError(
            () => new Error('Failed to analyze image. Please try again.')
          );
        })
      );
  }

  /**
   * Generate product description from text input
   * Uses JSON mode for chat completion
   */
  generateDescription(
    productName: string,
    ingredients: string[]
  ): Observable<{ description: string }> {
    if (!this._apiKey) {
      return throwError(
        () => new Error('OpenAI API key is not configured. Please set it using setApiKey() method.')
      );
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this._apiKey}`,
    });

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Generate a compelling product description for a dish called "${productName}" with ingredients: ${ingredients.join(', ')}. 
          Return a JSON object with a "description" field containing the description. 
          The description should be appetizing, highlight flavors and textures, and be suitable for a restaurant menu.`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 300,
    };

    return this.http
      .post<{ choices: Array<{ message: { content: string } }> }>(
        `${this.apiUrl}/chat/completions`,
        payload,
        { headers }
      )
      .pipe(
        map((response) => {
          try {
            const content = response.choices[0]?.message?.content;
            if (content) {
              return JSON.parse(content) as { description: string };
            } else {
              throw new Error('No content in AI response');
            }
          } catch (parseError) {
            throw new Error('Failed to parse AI response: ' + parseError);
          }
        }),
        catchError((error) => {
          console.error('AI API Error:', error);
          return throwError(
            () => new Error('Failed to generate description. Please try again.')
          );
        })
      );
  }
}

