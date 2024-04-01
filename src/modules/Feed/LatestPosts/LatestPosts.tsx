import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ScrollableSection } from '@components';
import { actions, selectors } from '@store';
import { PostsSkeleton } from '@modules/Skeletons';
import { Headline } from '../components';
import { AnimatedItem } from './Post';

import * as S from './LatestPosts.styled';

interface ILatestPosts {
  sectionWasLoaded: boolean;
}

export const LatestPosts: FC<ILatestPosts> = ({ sectionWasLoaded }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showAnimation, setShowAnimation] = useState(sectionWasLoaded);
  const posts = useSelector(selectors.posts.getPosts);
  const postsToBeRemoved = useSelector(selectors.posts.getRemovedIds);
  const showPostsSkeleton = useSelector(selectors.posts.getShowSkeleton);
  const isMoreLoading = useSelector(selectors.posts.getIsMoreLoading);
  const canLoadMore = useSelector(selectors.posts.getCanLoadMore);
  const nextBunchLoaded = useSelector(selectors.posts.geNextBunchLoaded);
  const isTranslationReady = useSelector(selectors.localization.selectIsTranslationReady);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 10000);

    if (!posts.length) {
      dispatch(actions.posts.fetchPostsInit(0));
    }
  }, []);

  const onReachEnd = useCallback(
    () => {
      if (!isMoreLoading && canLoadMore) dispatch(actions.posts.fetchPostsInit(posts.length));
    },
    [isMoreLoading, canLoadMore, posts.length],
  );

  const showFadeOutAnimation = posts.length === 1 && postsToBeRemoved.includes(posts[0].id);

  if (showPostsSkeleton || !isTranslationReady) {
    return <PostsSkeleton />;
  }

  if (!posts?.length) {
    return null;
  }

  return (
    <>
      <Headline
        showAnimation
        showFadeOutAnimation={showFadeOutAnimation}
        title={t('FP__FEED__TX__LATEST_POSTS')}
      />
      <S.PostsSectionWrapper showAnimation={showAnimation}>
        <ScrollableSection
          isPosts
          onReachEnd={onReachEnd}
        >
          {posts.map((post) => (
            <AnimatedItem
              key={post.id}
              item={post}
              nextBunchLoaded={nextBunchLoaded}
              showFullWidthOnMobile={posts.length === 1}
            />
          ))}
        </ScrollableSection>
      </S.PostsSectionWrapper>
    </>
  );
};
