import { createSelector } from '@reduxjs/toolkit';

import { i18nService } from '@services';
import { DTOLiveStream } from '@api/types';
import userLogin from '@assets/icons/userLogin.svg';
import { IVideoItem } from '@components';
import { theme } from '@layout';
import { RootState } from '@store';
import {
  getDuration, getPostedVideoTime, getShorterNumber,
} from '@utils';
import { routes } from '@routes';

import { selectIsTranslationReady } from '@store/localization/selectors';
import { ITitleColors } from './slice';

const {
  black,
  java,
  redOrange,
  white,
} = theme.colors;

const { redCircle } = theme.icons;

export const livesSelector = (state: RootState): DTOLiveStream[] => state.lives.data.lives;
const titleColorsSelector = (state: RootState): ITitleColors => state.lives.titleColors;
const counterSelector = (state: RootState): number => state.common.counter;
const removedIdsSelector = (state: RootState): number[] => state.lives.removedIds;

export const showSkeletonSelector = (state: RootState): boolean => state.lives.showSkeleton;

export const selectLives = createSelector(
  livesSelector,
  titleColorsSelector,
  counterSelector,
  selectIsTranslationReady,

  (lives: DTOLiveStream[] | [], titleColors) => {
    if (!lives.length) return [];

    return lives.map(({
      creatorImageUrl,
      creatorNickname,
      id,
      name,
      startTime,
      thumbnailUrl,
      viewersCount,
    }): IVideoItem => {
      let titleBackground = redOrange;
      let titleColor = white;

      if (titleColors[id]) {
        titleBackground = titleColors[id].titleBackground;
        titleColor = titleColors[id].titleColor;
      }

      const duration = new Date().getTime() - new Date(startTime).getTime();

      return {
        baseRedirectUrl: routes.VIDEO,
        id,
        isLive: true,
        caption: {
          picture: creatorImageUrl || userLogin,
          subTitle: `${i18nService.getTranslation('FP__TX__LIVE_STARTED')} ${getPostedVideoTime(startTime)}`,
          title: creatorNickname,
        },
        labels: [
          {
            background: white,
            color: black,
            icon: redCircle,
            key: 1,
            text: `${i18nService.getTranslation('FP__BADGE__TX_LIVE').toUpperCase()} ${getDuration(duration)}`,
          },
          {
            background: java,
            color: black,
            key: 2,
            text: `${getShorterNumber(viewersCount)} ${i18nService.getTranslation('FP__TX__WATCHING')}`,
          },
        ],
        poster: thumbnailUrl,
        title: {
          background: titleBackground,
          color: titleColor,
          text: name,
        },
      };
    });
  },
);

export const showLivestreamsSkeleton = createSelector(showSkeletonSelector, (show) => show);
export const getLivesLength = createSelector(livesSelector, (lives) => lives.length);
export const getRemovedIds = createSelector(removedIdsSelector, (ids) => ids);
