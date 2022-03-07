import { ProfileInterface } from './profile.interface';
export interface CommentsInterface {
  id: number;
  createdAt: string;
  updateAt: string;
  body: string;
  author: ProfileInterface;
}
