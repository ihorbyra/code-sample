import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';

import { theme } from '@layout';
import { Profile } from '@modules';
import { LogoSkeleton } from '@modules/Skeletons';
import { routes } from '@routes';
import { selectors } from '@store';

import * as S from './Header.styled';

const { arrowBackWithoutPaddings } = theme.icons;

export const Header: FC = () => {
  const showBackButton = Boolean(useMatch(routes.VIDEO));
  const feedLogo = useSelector(selectors.feed.getFeedLogo);
  const getFeedInfoIsEmpty = useSelector(selectors.feed.getFeedInfoIsEmpty);
  const isTranslationReady = useSelector(selectors.localization.selectIsTranslationReady);
  const navigate = useNavigate();

  const handleLogoClick = (): void => {
    smoothscroll.polyfill();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleBackClick = (): void => navigate(routes.HOME);

  return (
    <S.Header showBackButton={showBackButton}>
      {showBackButton && (
        <S.BackButton onClick={handleBackClick}>
          <S.ArrowImage
            alt="arrow back"
            src={arrowBackWithoutPaddings}
          />
        </S.BackButton>
      )}
      <S.FeedLogo onClick={handleLogoClick}>
        {getFeedInfoIsEmpty && (<LogoSkeleton />)}
        {!getFeedInfoIsEmpty && feedLogo && (
          <S.FeedLogoImg
            alt="feed logo"
            src={feedLogo}
          />
        )}
      </S.FeedLogo>

      {isTranslationReady && <Profile />}
    </S.Header>
  );
};
