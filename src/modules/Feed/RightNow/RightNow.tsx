import {
  FC, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ScrollableSection } from '@components';
import { Headline } from '@modules/Feed/components';
import { actions, selectors } from '@store';
import { LivestreamsSkeleton } from '@modules/Skeletons';
import {
  getStorageItem, removeStorageItem, useOnline,
} from '@utils';

import { AnimatedItem } from './AnimatedItem';

import * as S from './RightNow.styled';

interface IRightNow {
  sectionWasLoaded: boolean;
}

export const RightNow: FC<IRightNow> = ({ sectionWasLoaded }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showAnimation, setShowAnimation] = useState(sectionWasLoaded);
  const [isOnline, backOnline] = useOnline();
  const lives = useSelector(selectors.lives.selectLives);
  const livesToBeRemoved = useSelector(selectors.lives.getRemovedIds);
  const showLivestreamsSkeleton = useSelector(selectors.lives.showLivestreamsSkeleton);
  const isTranslationReady = useSelector(selectors.localization.selectIsTranslationReady);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 10000);
  }, []);

  useEffect(() => {
    const shouldLivesBeFetched = Boolean(getStorageItem('shouldLivesBeFetched')) && isOnline;
    if (shouldLivesBeFetched) {
      dispatch(actions.lives.fetchLivesInit());
      removeStorageItem('shouldLivesBeFetched');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  useEffect(() => {
    if (backOnline) {
      dispatch(actions.lives.fetchLivesInit());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backOnline]);

  const showFadeOutAnimation = lives.length === 1 && livesToBeRemoved.includes(lives[0].id);

  if (showLivestreamsSkeleton || !isTranslationReady) {
    return <LivestreamsSkeleton />;
  }

  if (!lives.length) {
    return null;
  }

  return (
    <>
      <Headline
        showAnimation
        title={t('FP__FEED__TX__RIGHT_NOW')}
        showFadeOutAnimation={showFadeOutAnimation}
      />
      <S.LivesWrapper showAnimation={showAnimation}>
        <ScrollableSection>
          {lives.map((item) => (
            <AnimatedItem
              key={item.id}
              item={item}
              showFullWidthOnMobile={Boolean(lives.length === 1)}
            />
          ))}
        </ScrollableSection>
      </S.LivesWrapper>
    </>
  );
};
