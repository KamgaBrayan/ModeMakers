import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import stylistData from '../../utils/db.json';
import { Stylist } from '../../shared/models/stylist.model';

@Injectable({
  providedIn: 'root'
})
export class StylistService {
  private apiUrl = 'https://example.com/api/stylists'; // assuming this is the API URL
  constructor(private http: HttpClient) {}

  private mapToStylist(profile: any): Stylist {
    return {
      id: profile.id,
      name: profile.name,
      roles: profile.roles,
      specialty: profile.specialty || '',
      photos: profile.photos || [],
      biography: profile.biography || '',
      calendar: profile.calendar || [],
      experience: profile.experience || '',
      localisation: profile.localisation || '',
      phone: profile.phone || '',
      category: profile.category || []
    };
  }

  getAllStylists(): Observable<Stylist[]> {
    return of(stylistData.profiles.map(profile => this.mapToStylist(profile)));
  }

  getStylistById(id: number): Observable<Stylist> {
    return of(stylistData.profiles.find(profile => profile.id === id))
      .pipe(map(profile => this.mapToStylist(profile)));
  }

  getStylistsByRole(role: string): Observable<Stylist[]> {
    return of(stylistData.profiles
      .filter(profile => profile.roles.includes(role))
      .map(profile => this.mapToStylist(profile)));
  }

  getCurrentUser(): Observable<Stylist> {
    return of(stylistData.profiles.find(profile => profile.roles.includes('ROLE_USER')))
      .pipe(map(profile => this.mapToStylist(profile)));
  }

  updateProfile(stylist: Stylist): Observable<Stylist> {
    return this.http.put<Stylist>(`${this.apiUrl}/${stylist.id}`, stylist);
  }
}
