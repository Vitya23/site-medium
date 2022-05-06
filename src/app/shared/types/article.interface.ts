import { PopularTagType } from './popularTag.type';
import { ProfileInterface } from './profile.interface';

export interface ArticleInterface {
  articleId?: number;
  author: ProfileInterface;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: PopularTagType[];
  title: string;
  updatedAt: string;
}
