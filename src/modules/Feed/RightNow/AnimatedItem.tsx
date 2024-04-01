import { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { VideoItem, IVideoItem } from '@components';
import { actions, selectors } from '@store';
import { theme } from '@layout';

import * as S from './RightNow.styled';

interface IAnimatedItem {
  item: IVideoItem
  showFullWidthOnMobile: boolean
}

const { liveItem } = theme.animationDurations;

export const AnimatedItem: FC<IAnimatedItem> = ({
  item, showFullWidthOnMobile,
}) => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const livesToBeRemoved = useSelector(selectors.lives.getRemovedIds);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={Boolean(!livesToBeRemoved.includes(item.id))}
      appear
      enter
      exit
      timeout={liveItem}
      onExited={() => dispatch(actions.lives.removeItemOnAnimationDone(item.id))}
    >
      {(classSuffix) => (
        <S.VideoItemWrapper
          className={`item item-${classSuffix}`}
          showFullWidthOnMobile={showFullWidthOnMobile}
          ref={nodeRef}
        >
          <VideoItem {...item} />
        </S.VideoItemWrapper>
      )}
    </CSSTransition>
  );
};
