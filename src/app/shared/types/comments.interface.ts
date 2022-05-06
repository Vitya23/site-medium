import { ProfileInterface } from './profile.interface';
export interface CommentsInterface {
  articleId: number;
  id: number;
  createdAt: string;
  updateAt: string;
  body: string;
  author: ProfileInterface;
}
