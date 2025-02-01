import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Precommand } from '../../shared/models/precommand.model';

@Injectable({
  providedIn: 'root'
})
export class PrecommandsService {
  private apiUrl = 'http://localhost:3001'; // JSON Server URL

  constructor(private http: HttpClient) { }

  // Get all precommands
  getAllPrecommands(): Observable<Precommand[]> {
    return this.http.get<Precommand[]>(`${this.apiUrl}/precommands`);
  }

  // Get precommand by ID
  getPrecommandById(id: number): Observable<Precommand> {
    return this.http.get<Precommand>(`${this.apiUrl}/precommands/${id}`);
  }

  // Get precommands by status
  getPrecommandsByStatus(status: string): Observable<Precommand[]> {
    return this.http.get<Precommand[]>(`${this.apiUrl}/precommands?status=${status}`);
  }

  // Create new precommand
  createPrecommand(precommand: Precommand): Observable<Precommand> {
    const validatedPrecommand = this.validatePriceFields(precommand);
    return this.http.post<Precommand>(`${this.apiUrl}/precommands`, validatedPrecommand);
  }

  // Update precommand
  updatePrecommand(id: number, precommand: Partial<Precommand>): Observable<Precommand> {
    const validatedPrecommand = this.validatePriceFields(precommand);
    return this.http.put<Precommand>(`${this.apiUrl}/precommands/${id}`, validatedPrecommand);
  }

  // Delete precommand
  deletePrecommand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/precommands/${id}`);
  }

  validatePriceFields(precommand: any): any {
    const validated = { ...precommand };

    // Ensure prices are not negative
    validated.proposedPrice = Math.max(0, validated.proposedPrice || 0);
    validated.finalPrice = Math.max(0, validated.finalPrice || 0);

    // Ensure quantity is at least 1
    validated.quantity = Math.max(1, validated.quantity || 1);

    return validated;
  }
}
