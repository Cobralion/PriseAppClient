import { StoreService } from './../services/store.service';
import { PoemService } from './../services/poem.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Poem } from '../interfaces/poem.interface';
import {MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('poemlist') poemlist?: MatSelectionList;

  model: Poem = {
    index: -1,
    heading: 'Laden...',
    value: ''
  };

  poemFavored: boolean = false;

  poems: Poem[] = [];

  constructor(private poemService: PoemService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.loadNextPoem();
    this.poems = this.storeService.load();
  }

  loadNextPoem() {
    this.poemlist?.deselectAll();
    this.poemService.getRandomPoem().subscribe(v => {
      this.model = v;
      this.poemFavored = this.checkIfPoemFavored(this.model.index);
    });

  }

  favorPoem() {
    if(!this.poems.includes(this.model))
      this.poems.push(this.model);

      this.poemFavored = true;
    this.storeService.store(this.poems);
  }

  unfavorPoem() {
    const index = this.poems.indexOf(this.model);
    if (index > -1) {
      this.poems.splice(index, 1);
    }

    this.poemFavored = false;
    this.storeService.store(this.poems);
  }

  loadPoem(index?: number) {
    this.model = this.poems.find(v => v.index === index)!;
    this.poemFavored = true;
  }

  checkIfPoemFavored(index?: number): boolean {
    return this.poems.find(v => v.index === index) !== undefined;
  }

}
