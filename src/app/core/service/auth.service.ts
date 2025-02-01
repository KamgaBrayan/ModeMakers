/*
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = 'http://localhost:3001';
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser$: Observable<User | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User | null>(
            this.getUserFromStorage()
        );
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    private getUserFromStorage(): User | null {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    }

    login(credentials: LoginRequest): Observable<User> {
        return this.http.post<User>(`${this.API_URL}/auth/login`, credentials)
            .pipe(
                tap(user => {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                })
            );
    }

    register(userData: RegisterRequest): Observable<User> {
        return this.http.post<User>(`${this.API_URL}/auth/register`, userData)
            .pipe(
                tap(user => {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                })
            );
    }

    // Méthode utile pour le développement
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_URL}/users`);
    }
}
*/
