import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: "root",
})
export class JwtDecodeService {
  constructor() {}

  getDecodedToken(token: string | null | undefined): AppJwtPayload | null {
    if (typeof token !== 'string' || token.trim().length === 0) {
      return null;
    }

    const normalizedToken = token.trim();
    if (!normalizedToken.includes('.') || normalizedToken.split('.').length !== 3) {
      return null;
    }

    try {
      return jwtDecode<AppJwtPayload>(normalizedToken);
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string | null | undefined): boolean {
    const decoded = this.getDecodedToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
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
