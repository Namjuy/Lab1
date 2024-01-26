import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  
  constructor() {    
  }
  
  /**
   * Decodes a JWT token and returns the payload.
   * @param token - The JWT token to decode.
   * @returns The decoded payload.
   * @throws Error if the token is invalid or in an unexpected format.
   */
  public decodeToken(token: string) {
    const segments = token.split('.');
    if (segments.length !== 3) {
      throw new Error('Invalid JWT token format');
    }

    const base64Url = segments[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  }
  
}
