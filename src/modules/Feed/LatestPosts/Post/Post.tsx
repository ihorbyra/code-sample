import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';

import { theme } from '@layout';
import { ItemCaption, IPost } from '@components';
import { PostSkeleton } from '@modules/Skeletons';

import { actions } from '@store';
import * as S from './Post.styled';

const { imagesGroup } = theme.icons;

export const Post: FC<IPost> = ({
  id,
  caption,
  images,
}) => {
  const dispatch = useDispatch();

  const imgLength = images?.length;
  const [wasPictureLoaded, setWasPictureLoaded] = useState(false);

  const showPostDetailsScreen = (postId: number): void => {
    dispatch(actions.posts.addSelectedPost(postId));
    dispatch(actions.posts.toggleDetailsScreen());
    if (isMobileOnly) dispatch(actions.common.toggleScrollOnMobile());
  };

  if (!imgLength) {
    return null;
  }

  return (
    <S.Post
      onClick={() => showPostDetailsScreen(id)}
      className="post__item"
    >
      <S.PostImage
        src={images[0]}
        alt="Image Post"
        onLoad={() => setWasPictureLoaded(true)}
        opacity={wasPictureLoaded ? 1 : 0}
        position={wasPictureLoaded ? 'static' : 'absolute'}
      />
      {imgLength > 1 && (
        <S.MoreImage
          alt="More images"
          src={imagesGroup}
        />
      )}
      {!wasPictureLoaded && <PostSkeleton />}
      <ItemCaption
        {...caption}
      />
    </S.Post>
  );
};
