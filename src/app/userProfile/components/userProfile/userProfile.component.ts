import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { userProfileSelector } from './../../store/selectors';
import { filter, map } from 'rxjs/operators';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { getUserProfileAction } from './../../store/actions/getUserProfile.action';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { ProfileInterface } from './../../../shared/types/profile.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { errorSelector, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-userProfile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSub: Subscription;
  slug: string;
  apiUrl: string;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('onInit');
    this.initializeValues();

    this.initializeListeners();
  }
  ngOnDestroy(): void {
    this.userProfileSub.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(userProfileSelector), filter(Boolean)),
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
    ]).pipe(
      map(
        ([userProfile, currentUser]: [
          ProfileInterface,
          CurrentUserInterface
        ]) => {
          return currentUser.username === userProfile.username;
        }
      )
    );
  }

  initializeListeners(): void {
    console.log('sd');

    this.userProfileSub = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
      });

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return (this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`);
  }
}
