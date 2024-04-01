import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';

import { actions, selectors } from '@store';
import { Modal } from '@components';
import { SelectedPost } from './SelectedPost';

export const PostDetailsScreen: FC = () => {
  const dispatch = useDispatch();

  const showPostDetailsScreen = useSelector(selectors.posts.getShowDetailsScreen);
  const selectedPost = useSelector(selectors.posts.getSelectedPost);

  const togglePostDetailsScreen = (): void => {
    dispatch(actions.posts.toggleDetailsScreen());
    if (isMobileOnly) dispatch(actions.common.toggleScrollOnMobile());
  };

  if (!selectedPost || !showPostDetailsScreen) {
    return null;
  }

  return (
    <Modal
      showModal={showPostDetailsScreen}
      closeModal={togglePostDetailsScreen}
    >
      <SelectedPost {...selectedPost} />
    </Modal>
  );
};
