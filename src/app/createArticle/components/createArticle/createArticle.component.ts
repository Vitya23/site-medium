import { createArticleAction } from './../../store/actions/createArticle.action';
import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  isSubmittingSelector,
  validationErrorSelector,
} from '../../store/selectors';

@Component({
  selector: 'app-createArticle',
  templateUrl: './createArticle.component.html',
  styleUrls: ['./createArticle.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }

  onSubmit(articleInput: any): void {
    this.store.dispatch(createArticleAction({ articleInput }));
  }
}
