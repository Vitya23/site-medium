import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tagsFeed',
  templateUrl: './tagsFeed.component.html',
  styleUrls: ['./tagsFeed.component.scss'],
})
export class TagsFeedComponent implements OnInit {
  apiUrl: string;
  tagName: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.tagName = param.slug;
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
