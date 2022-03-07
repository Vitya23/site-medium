import { commentSelector } from './../../store/selectors';
import { CommentsInterface } from './../../../../types/comments.interface';
import { CommentsService } from './../../services/comments.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createCommentsAction } from './../../store/actions/createComments.action';

import { getCommentsAction } from './../../store/actions/getComments.action';
import { select, Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { Observable, Subscription } from 'rxjs';
import {
  commentsSelector,
  errorSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorSelector,
} from '../../store/selectors';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { GetCommentsResponseInterface } from '../../types/getCommentsResponse.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input('slug') slugProps: string;
  @Input('article') articleProps: ArticleInterface | null;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  comments$: Observable<GetCommentsResponseInterface | null>;
  isSubmitting$: Observable<boolean>;
  validationErrors$: Observable<BackendErrorsInterface | null>;

  form: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
    this.fetchData();
  }

  initializeForm() {
    this.form = this.fb.group({
      body: '',
    });
  }

  onSubmit() {
    this.store.dispatch(
      createCommentsAction({ slug: this.slugProps, body: this.form.value.body })
    );

    this.form.reset();
  }

  fetchData(): void {
    this.store.dispatch(getCommentsAction({ slug: this.slugProps }));
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.comments$ = this.store.pipe(select(commentsSelector));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorSelector));
  }
}
