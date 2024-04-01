import {
  FC, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '@store';
import { stat } from '@utils';
import { BuyCoins } from '@modules/Microtransactions/BuyCoins';
import { version } from '../../../package.json';
import { NoContent } from './components/NoContent';
import { RightNow } from './RightNow';
import { LatestPosts, PostDetailsScreen } from './LatestPosts';
import { LatestVideos } from './LatestVideos';
import * as S from './Feed.styled';

const currentVersion = `v. ${version}`;

const Feed: FC = () => {
  const dispatch = useDispatch();
  const [sectionWasLoaded, setSectionWasLoaded] = useState(false);

  useEffect(() => {
    dispatch(actions.microTransactions.fetchStickersInit());

    setTimeout(() => {
      setSectionWasLoaded(true);
    }, 10000);

    if (stat.isCloseVideoData()) {
      const next = (videoData: stat.IPlayVideoData): void => {
        dispatch(actions.video.closeStream({
          ...videoData,
        }));
      };
      stat.closePlayVideoData(next);
    }
  }, []);

  return (
    <>
      <NoContent />
      <PostDetailsScreen />
      <S.FeedWrapper>
        <S.Feed>
          <S.FeedItemSection>
            <RightNow sectionWasLoaded={sectionWasLoaded} />
          </S.FeedItemSection>

          <S.FeedItemSection>
            <LatestVideos />
          </S.FeedItemSection>

          <S.FeedItemSection>
            <LatestPosts sectionWasLoaded={sectionWasLoaded} />
          </S.FeedItemSection>

          <BuyCoins />
          <S.EmptyBlock />
        </S.Feed>
        <S.Version>
          <span>{currentVersion}</span>
        </S.Version>
      </S.FeedWrapper>
    </>
  );
};

export default Feed;
