import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export interface CreateCommentsStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
