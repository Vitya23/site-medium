import {
  isLoadingSelector,
  errorSelector,
} from './../../../feed/store/selectors';
import { getPopularTagsAction } from './../../store/actions/getPopularTags.action';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { popularTagsSelector } from '../../store/selectors';

@Component({
  selector: 'app-popularTags',
  templateUrl: './popularTags.component.html',
  styleUrls: ['./popularTags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  popularTags$: Observable<PopularTagType[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
