import {
  FC, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Headline } from '@modules/Feed/components';
import { selectors } from '@store';
import { ColoredFigures } from './ColoredFigures';

import * as S from './NoContent.styled';

export const NoContent: FC = () => {
  const { t } = useTranslation();

  const showNoContent = useSelector(selectors.feed.showNoContent);

  const [show, setShow] = useState(showNoContent);

  useEffect(() => {
    setShow(showNoContent);
  }, [showNoContent]);

  const handleTransitionEnd = (): void => {
    setShow((p) => !p);
  };

  if (!show) return null;

  return (
    <S.NoContentWrapper
      showNoContent={showNoContent}
      onTransitionEnd={handleTransitionEnd}
    >
      <ColoredFigures />
      <S.NoContent>
        <Headline
          showAnimation={false}
          showFadeOutAnimation={false}
          title={t('FP__FEED__TX__NO_CONTENT')}
        />
      </S.NoContent>
    </S.NoContentWrapper>
  );
};
