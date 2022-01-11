import { map } from 'rxjs/operators';
import {
  isLoadingSelector,
  errorSelector,
  feedSelector,
} from './../../store/selectors';
import { Observable } from 'rxjs';
import { getFeedAction } from './../../store/actions/getFeed.action';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetFeedResponseInterface } from '../../types/GetFeedResponseInterface.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));

    this.feed$.subscribe((e) => {
      console.log(e);
    });
  }
  fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }
}
