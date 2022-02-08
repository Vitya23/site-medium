import { FormGroup, FormBuilder } from '@angular/forms';
import { BackendErrorsInterface } from './../../../../types/backendErrors.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';

@Component({
  selector: 'app-articleForm',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: BackendErrorsInterface | null;

  @Output('articleSubmit')
  articleSubmitEvent: EventEmitter<ArticleInputInterface> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList,
    });
  }

  onSubmit(): void {
    this.form.get('tagList').setValue([this.form.value.tagList]);
    this.articleSubmitEvent.emit(this.form.value);
  }
}
