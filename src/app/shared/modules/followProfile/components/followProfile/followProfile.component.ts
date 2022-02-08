import { followProfileAction } from './../../store/actions/followProfile.action';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-followProfile',
  templateUrl: './followProfile.component.html',
  styleUrls: ['./followProfile.component.scss'],
})
export class FollowProfileComponent implements OnInit {
  @Input('isFollowing') isFollowingProps: boolean;
  @Input('username') usernameProps: string;

  isFollowing: boolean;
  username: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isFollowing = this.isFollowingProps; //BAD WORK
    this.username = this.usernameProps;
  }

  handleFollow(): void {
    this.isFollowingProps = !this.isFollowingProps;
    this.store.dispatch(
      followProfileAction({
        isFollowing: this.isFollowingProps,
        username: this.username,
      })
    );
  }
}
