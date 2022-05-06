import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { currentUserSelector } from './../../../auth/store/selectors';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ActivatedRoute } from '@angular/router';
import { getArticleAction } from './../../store/actions/getArticle.action';
import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors';
import { map } from 'rxjs/operators';
import { deleteArticleAction } from '../../store/actions/deleteArticle.action';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  articleId: any;
  article: ArticleInterface | null;
  articleSub: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector)),
    ]).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false;
          }
          return currentUser.username === article.author.username;
        }
      )
    );
  }
  initializeListeners(): void {
    this.articleSub = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle() {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
