import { updateArticleAction } from './../../store/actions/editArticle.action';
import { ArticleInterface } from './../../../shared/types/article.interface';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { getArticleAction } from '../../store/actions/getArticle.action';
import {
  articleSelector,
  isSubmittingSelector,
  validationErrorSelector,
} from '../../store/selectors';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-editArticle',
  templateUrl: './editArticle.component.html',
  styleUrls: ['./editArticle.component.scss'],
})
export class EditArticleComponent implements OnInit, OnDestroy {
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  isLoading$: Observable<boolean>;
  initialValues$: Observable<ArticleInputInterface>;
  slug: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
    console.log('init');
  }
  ngOnDestroy(): void {
    console.log('destroy');
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        console.log(article);
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({ articleInput, slug: this.slug }));
  }
}
