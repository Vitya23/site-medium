import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yourFeed',
  templateUrl: './yourFeed.component.html',
  styleUrls: ['./yourFeed.component.scss'],
})
export class YourFeedComponent implements OnInit {
  apiUrl = '/articles/feed';
  constructor() {}

  ngOnInit() {}
}
