import { createSelector } from '@reduxjs/toolkit';

import { DTOVod } from '@api/types';
import userLogin from '@assets/icons/userLogin.svg';
import { theme } from '@layout';
import { i18nService } from '@services';
import { RootState } from '@store';
import {
  getDuration,
  getShorterNumber,
} from '@utils';
import { routes } from '@routes';

import { selectIsTranslationReady } from '@store/localization/selectors';
import { ITitleColors } from './slice';
import { getCaptionSubtitle } from '../utils';

const {
  black,
  blueRibbon,
  java,
  redOrange,
  white,
} = theme.colors;

export const videosSelector = (state: RootState): DTOVod[] => state.videos.videos;
export const showVideosSkeletonSelector = (state: RootState): boolean => state.videos.showSkeleton;
const titleColorsSelector = (state: RootState): ITitleColors => state.videos.titleColors;
const canLoadMoreSelector = (state: RootState): boolean => state.videos.canLoadMore;
const showLoadMoreSelector = (state: RootState): boolean => state.videos.showLoadMore;
const isMoreLoadingSelector = (state: RootState): boolean => state.videos.isMoreLoading;
const counterSelector = (state: RootState): number => state.common.counter;

export const selectVideos = createSelector(
  videosSelector,
  titleColorsSelector,
  counterSelector,
  selectIsTranslationReady,

  (videos: DTOVod[], titleColors) => videos.map(({
    durationMilliseconds,
    id,
    images,
    creatorImageUrl,
    creatorNickname,
    publishDate,
    startTime,
    type,
    videoName,
    viewsCount,
  }) => {
    const {
      titleBackground = redOrange,
      titleColor = white,
    } = titleColors[id];

    return {
      baseRedirectUrl: routes.VIDEO,
      caption: {
        picture: creatorImageUrl || userLogin,
        subTitle: getCaptionSubtitle({
          duration: durationMilliseconds,
          publishDate,
          startTime,
          type,
        }),
        title: creatorNickname,
      },
      description: null,
      id,
      isLive: false,
      labels: [
        {
          background: blueRibbon,
          color: white,
          key: 1,
          text: getDuration(durationMilliseconds),
        },
        {
          background: java,
          color: black,
          key: 2,
          text: `${getShorterNumber(viewsCount)} ${i18nService.getTranslation('FP__TX__VIEWS', viewsCount)}`,
        },
      ],
      poster: images[0],
      title: {
        background: titleBackground,
        color: titleColor,
        text: videoName,
      },
    };
  }),
);

export const showVideosSkeleton = createSelector(showVideosSkeletonSelector, (show) => show);
export const canLoadMore = createSelector(canLoadMoreSelector, (isAll) => isAll);
export const getShowLoadMore = createSelector(showLoadMoreSelector, (value) => value);
export const isMoreLoading = createSelector(isMoreLoadingSelector, (isLoading) => isLoading);
