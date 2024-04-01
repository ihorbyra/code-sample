import { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { IPost } from '@components';
import { EPostSource } from '@api/types';
import { actions, selectors } from '@store';
import { theme } from '@layout';
import { Post } from './Post';
import * as S from '../LatestPosts.styled';

interface IAnimatedItem {
  item: IPost;
  showFullWidthOnMobile: boolean;
  nextBunchLoaded: boolean;
}

const { liveItem } = theme.animationDurations;

export const AnimatedItem: FC<IAnimatedItem> = ({
  item,
  showFullWidthOnMobile,
  nextBunchLoaded,
}) => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const postsToBeRemoved = useSelector(selectors.posts.getRemovedIds);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={Boolean(!postsToBeRemoved.includes(item.id))}
      appear
      enter
      exit
      timeout={liveItem}
      onExited={() => dispatch(actions.posts.removeItemOnAnimationDone(item.id))}
    >
      {(classSuffix) => {
        const itemClasSuffix = (nextBunchLoaded && item.source !== EPostSource.webSockets) ? '' : `item-${classSuffix}`;
        return (
          <S.PostWrapper
            ref={nodeRef}
            className={`item ${itemClasSuffix}`}
            showFullWidthOnMobile={showFullWidthOnMobile}
          >
            <Post {...item} />
          </S.PostWrapper>
        );
      }}
    </CSSTransition>

  );
};
