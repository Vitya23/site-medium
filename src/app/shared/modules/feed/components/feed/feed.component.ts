import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {
  isLoadingSelector,
  errorSelector,
  feedSelector,
} from './../../store/selectors';
import { Observable, Subscription } from 'rxjs';
import { getFeedAction } from './../../store/actions/getFeed.action';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetFeedResponseInterface } from '../../types/GetFeedResponseInterface.interface';
import { parseUrl, stringify } from 'query-string';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;
  limit = environment.limit;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params.page || '1');
        console.log(this.currentPage);
        this.fetchFeed();
      }
    );
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringifyParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifyParams}`;

    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}
