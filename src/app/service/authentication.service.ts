import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host = environment.apiUrl;
  private token: string | null;
  private loggedInUsername: string | null;
  constructor(private http: HttpClient) { }

  /**
   * Connexion de l'tuilisateur
   * @param user l'utilisateur
   * @returns un obervable de HttpResponse ou de HttpErrorResponse
   */
  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    // {obeserve: 'response'} est une option permettant de récuperer toute la réponse y compris les headers
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/user/login`, user, {observe: 'response'});
  }

  /**
   * Inscription d'un utilisateur
   * @param user l'utilisateur
   * @returns un observable de User ou de HttpErrorResponse
   */
  public register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(`${this.host}/user/register`, user, {observe: 'response'});
  }

  /**
   * Permet de déconnecter l'utilisateur en supprimer les infos du localStorage
   */
  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }


  /**
   * Enregistre le token de l'utilisateur dans le localStorage
   * @param token le jwt token
   */
  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
  
  /**
   * Rend l'objet User en string avant de l'enregistrer dans le cache localStorage
   * @param user l'objet user
   */
  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  /**
   * Essaie de récupérer l'objet User depuis le cache
   * @returns l'objet User ou null
   */
  public getUserFromLocalCache(): User {
    const stringUser = localStorage.getItem('user');
    return stringUser ? JSON.parse(stringUser) : null;
  }
  
  /**
   * Récupère le token depuis le cache
   */
  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  /**
   * Récupère le token de l'utilisateur
   * @returns le token actuel de l'utilisateur ou null
   */
  public getToken(): string | null {
    return this.token;
  }

  
}
