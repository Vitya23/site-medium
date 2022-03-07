import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import {
  isLoadingSelector,
  errorSelector,
  feedSelector,
} from './../../store/selectors';
import { Observable, Subscription } from 'rxjs';
import { getFeedAction } from './../../store/actions/getFeed.action';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetFeedResponseInterface } from '../../types/GetFeedResponseInterface.interface';
import { parseUrl, stringify } from 'query-string';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    const apiUrlChanged =
      !changes.apiUrlProps.firstChange &&
      changes.apiUrlProps.currentValue !== changes.apiUrlProps.previousValue;
    if (apiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
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
}
