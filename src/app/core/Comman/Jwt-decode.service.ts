import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: "root",
})
export class JwtDecodeService {
  constructor() {}
// Method to decode a given token string

  getDecodedToken(token: string): AppJwtPayload | null {
    try {
      return jwtDecode<AppJwtPayload>(token);
    } catch (error) {
      console.error('Invalid token format', error);
      return null;
    }
  }

  // Example helper to check if the token is expired
  isTokenExpired(token: string): boolean {
    const decoded = this.getDecodedToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
    return decoded.exp < currentTime;
  }
}

export interface AppJwtPayload {
  sub: string;         // User ID (GUID)
  jti: string;         // Unique Token Identifier
  unique_name: string; // Username
  email: string;       // User Email
  role: string;        // User Role (e.g., 'Customer')
  nbf: number;         // Not Before timestamp
  exp: number;         // Expiration timestamp
  iat: number;         // Issued At timestamp
  iss: string;         // Issuer URL
  aud: string;         // Audience URL
}
