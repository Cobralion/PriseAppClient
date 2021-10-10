import { Config } from './../config/config';
import { Poem } from './../interfaces/poem.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PoemService {

  private anyPoemFolder: string = "sprueche/any";

  constructor(private http: HttpClient) { }

  getRandomPoem(): Observable<Poem | any> {
    return this.http.get<Poem>(Config.apiLocation + this.anyPoemFolder)
    .pipe(map(v => {
      v.value = v.value?.replace('\n', '<br />');
      return v;
    }),
    catchError(err => this.handelErrors(err)),);
  }

  private handelErrors(error: any) {
    if(error.status === 0 || error.status === 504)
      return of({heading: 'Ein Fehler is passiert D:', value: 'Ein Netzwerkfehler ist aufgetreten, probier es später nochmal...'});
    return of({heading: 'Ein Fehler is passiert D:', value: JSON.stringify({status: error.status, message: error.statusText})});
  }

}
