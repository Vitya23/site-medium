import { CommentsInterface } from './../../../../types/comments.interface';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { map } from 'rxjs/operators';
import { deleteCommentsAction } from '../../store/actions/deleteComments.action';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnChanges {
  @Input('comments') comment: CommentsInterface;
  @Input() slugProps: string;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isAuthor$ = this.store.pipe(select(currentUserSelector)).pipe(
      map((currentUser: CurrentUserInterface | null) => {
        if (!this.comment.author || !currentUser) {
          return false;
        }
        console.log(this.comment.author.username);
        return currentUser.username === this.comment.author.username;
      })
    );
    console.log(this.comment);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  deleteComment(): void {
    this.store.dispatch(
      deleteCommentsAction({ slug: this.slugProps, id: this.comment.id })
    );
  }
}
