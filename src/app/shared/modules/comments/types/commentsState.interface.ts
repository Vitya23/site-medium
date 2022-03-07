import { CommentsInterface } from './../../../types/comments.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { GetCommentsResponseInterface } from './getCommentsResponse.interface';

export interface CommentsStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  error: string | null;
  validationErrors: BackendErrorsInterface | null;
  data: any;
  comment: CommentsInterface;
}
