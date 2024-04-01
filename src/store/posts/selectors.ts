import { createSelector } from '@reduxjs/toolkit';

import { DTOPosts, EPostSource } from '@api/types';
import userLogin from '@assets/icons/userLogin.svg';
import { IItemCaption } from '@components';
import { RootState } from '@store';
import { getCaptionSubtitle } from '@store/utils';
import { selectIsTranslationReady } from '@store/localization/selectors';

export const postsSelector = (state: RootState): DTOPosts[] => state.posts.posts;
export const selectedPostSelector = (state: RootState): DTOPosts | null => state.posts.selectedPost;
export const showPostsSkeletonSelector = (state: RootState): boolean => state.posts.showSkeleton;
const isMoreLoadingSelector = (state: RootState): boolean => state.posts.isMoreLoading;
const canLoadMoreSelector = (state: RootState): boolean => state.posts.canLoadMore;
const nextBunchLoadedSelector = (state: RootState): boolean => state.posts.nextBunchLoaded;
const detailsScreenSelector = (state: RootState): boolean => state.posts.showDetailsScreen;
const counterSelector = (state: RootState): number => state.common.counter;
const removedIdsSelector = (state: RootState): number[] => state.posts.removedIds;

interface IGetPosts {
  id: number;
  images: string[];
  caption: IItemCaption;
  publishDate: string;
  source: EPostSource;
}

export const getPosts = createSelector(
  postsSelector,
  counterSelector,
  selectIsTranslationReady,

  ((posts) => {
    if (!posts.length) return [];

    return posts.map(({
      creatorImageUrl,
      creatorNickname,
      id,
      images,
      publishDate,
      startTime,
      type,
      videoName,
      durationMilliseconds,
      source,
    }): IGetPosts => ({
      id,
      images,
      publishDate,
      caption: {
        description: videoName,
        picture: creatorImageUrl || userLogin,
        subTitle: getCaptionSubtitle({
          duration: durationMilliseconds,
          publishDate,
          startTime,
          type,
        }),
        title: creatorNickname,
      },
      source: source || EPostSource.restApi,
    }));
  }),
);

export const getSelectedPost = createSelector(selectedPostSelector, (selectedPost) => {
  if (!selectedPost) return null;
  const {
    id,
    images,
    publishDate,
    videoName,
    creatorImageUrl,
    durationMilliseconds,
    creatorNickname,
    startTime,
    type,
  } = selectedPost;
  return {
    id,
    images,
    publishDate,
    caption: {
      description: videoName,
      picture: creatorImageUrl || userLogin,
      subTitle: getCaptionSubtitle({
        duration: durationMilliseconds,
        publishDate,
        startTime,
        type,
      }),
      title: creatorNickname,
    },
  };
});

export const getShowSkeleton = createSelector(showPostsSkeletonSelector, (value) => value);
export const getIsMoreLoading = createSelector(isMoreLoadingSelector, (value) => value);
export const getCanLoadMore = createSelector(canLoadMoreSelector, (value) => value);
export const geNextBunchLoaded = createSelector(nextBunchLoadedSelector, (value) => value);
export const getShowDetailsScreen = createSelector(detailsScreenSelector, (value) => value);
export const getRemovedIds = createSelector(removedIdsSelector, (ids) => ids);
