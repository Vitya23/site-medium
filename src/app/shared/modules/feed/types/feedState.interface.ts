import { GetFeedResponseInterface } from './GetFeedResponseInterface.interface';
export interface FeedStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponseInterface | null;
}
