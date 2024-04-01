import {
  FC, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';

import { VideoItem } from '@components';
import { theme } from '@layout';
import { Headline } from '@modules/Feed/components';
import { actions, selectors } from '@store';
import { VideosSkeleton } from '@modules/Skeletons';
import {
  getStorageItem, removeStorageItem, useOnline,
} from '@utils';

import * as S from './LatestVideos.styled';

const { liveItem } = theme.animationDurations;

export const LatestVideos: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const nodeRef = useRef(null);

  const [isOnline, backOnline] = useOnline();
  const videos = useSelector(selectors.videos.selectVideos);
  const canLoadMore = useSelector(selectors.videos.canLoadMore);
  const showLoadMore = useSelector(selectors.videos.getShowLoadMore);
  const isMoreLoading = useSelector(selectors.videos.isMoreLoading);
  const showVideosSkeleton = useSelector(selectors.videos.showVideosSkeleton);
  const showLivestreamsSkeleton = useSelector(selectors.lives.showLivestreamsSkeleton);
  const isTranslationReady = useSelector(selectors.localization.selectIsTranslationReady);
  const teamId = useSelector(selectors.teams.selectTeamId);

  useEffect(() => {
    const shouldNewVideosBeFetched = Boolean(getStorageItem('shouldNewVideosBeFetched')) && isOnline;
    if (backOnline || shouldNewVideosBeFetched) {
      const lastViewDate = getStorageItem<string>('publishedDateOfLastFetchedVideo');
      dispatch(actions.videos.fetchNewFeedVideosInit({
        diff: true,
        teamId,
        lastViewDate,
      }));
      if (shouldNewVideosBeFetched) removeStorageItem('shouldNewVideosBeFetched');
    }
  }, [backOnline, isOnline]);

  const loadMoreVideo = (): void => {
    if (!isMoreLoading) {
      dispatch(actions.videos.fetchFeedVideosInit(videos.length));
    }
  };

  if ((showVideosSkeleton || showLivestreamsSkeleton) || !isTranslationReady) {
    return <VideosSkeleton />;
  }

  if (!videos.length) {
    return null;
  }

  return (
    <>
      <Headline
        showAnimation
        title={t('FP__FEED__TX__LATEST_VIDEOS')}
      />

      <S.VideoGrid>
        {videos.map((video) => (
          <VideoItem
            key={video.id}
            {...video}
          />
        ))}

      </S.VideoGrid>
      {showLoadMore && (
        <CSSTransition
          nodeRef={nodeRef}
          in={canLoadMore}
          exit
          timeout={liveItem / 2}
          onExited={() => dispatch(actions.videos.handleShowLoadMore())}
        >
          {(classSuffix) => (
            <S.LoadMore
              onClick={loadMoreVideo}
              ref={nodeRef}
              className={`load-more load-more-${classSuffix}`}
            >
              {t('FP__FEED__TX__LOAD_MORE')}
            </S.LoadMore>
          )}
        </CSSTransition>
      )}
    </>
  );
};
