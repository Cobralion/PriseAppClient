import { Config } from './../config/config';
import { Poem } from './../interfaces/poem.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PoemService {

  private anyPoemFolder: string = "sprueche/any";

  constructor(private http: HttpClient) { }

  getRandomPoem(): Observable<Poem> {
    return this.http.get<Poem>(Config.apiLocation + this.anyPoemFolder)
    .pipe(map(v => {
      v.value = v.value?.replace('\n', '<br />');
      return v;
    }));
  }

}
