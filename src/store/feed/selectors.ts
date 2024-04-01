import { createSelector } from '@reduxjs/toolkit';
import isEmpty from 'lodash/isEmpty';

import { RootState } from '@store/types';
import { DTOFeedInfo } from '@api/feed/types';
import { videosSelector, showVideosSkeletonSelector } from '../videos/selectors';
import { livesSelector, showLivestreamsSkeleton } from '../lives/selectors';
import { postsSelector, showPostsSkeletonSelector } from '../posts/selectors';

const feedInfoSelector = (state: RootState): DTOFeedInfo => state.feed.feedInfo;

export const showNoContent = createSelector(
  videosSelector,
  showVideosSkeletonSelector,
  livesSelector,
  showLivestreamsSkeleton,
  postsSelector,
  showPostsSkeletonSelector,

  (
    videos,
    showVideosSkeleton,
    lives,
    showLivesSkeleton,
    posts,
    showPostsSkeleton,
  ) => !videos.length && !showVideosSkeleton
      && !lives.length && !showLivesSkeleton
      && !posts.length && !showPostsSkeleton,
);

export const getFeedLogo = createSelector(feedInfoSelector, (feedInfo) => feedInfo.imageUrl || '');
export const getTeamName = createSelector(feedInfoSelector, (feedInfo) => feedInfo.teamName || '');
export const getFeedInfoIsEmpty = createSelector(feedInfoSelector, (feedInfo) => isEmpty(feedInfo));
