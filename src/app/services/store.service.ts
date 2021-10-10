import { Poem } from './../interfaces/poem.interface';
import { Injectable } from '@angular/core';
import { JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  poemStore: string = 'poemStore';

  constructor() { }

  load(): Poem[] {
    var poems = JSON.parse(localStorage.getItem(this.poemStore) ?? '[]');
    return poems;
  }

  store(poems: Poem[]) {
    var jsonPoems = JSON.stringify(poems);
    localStorage.removeItem(this.poemStore);
    localStorage.setItem(this.poemStore, jsonPoems);
  }
}
