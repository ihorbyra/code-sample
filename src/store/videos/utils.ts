import get from 'lodash/get';
import { DateTime } from 'luxon';

import {
  arrays, getStorageItem, setStorageItem,
} from '@utils';
import { DTOVodAndPost } from '@api/types';

const compareVideoPublishedDate = (
  oldVideoPublishedDate: string | undefined,
  newVideoPublishedDate: string | undefined,
): boolean => {
  if (!oldVideoPublishedDate || !newVideoPublishedDate) {
    return true;
  }
  const oldVideoPublishedDateUnixTime = DateTime.fromISO(oldVideoPublishedDate)
    .toMillis();
  const newVideoPublishedDateUnixTime = DateTime.fromISO(newVideoPublishedDate)
    .toMillis();
  return oldVideoPublishedDateUnixTime < newVideoPublishedDateUnixTime;
};

function removeItemFromList<T extends arrays.IMinimumArrayData>(state: T[], removeId: number): T[] {
  return state.filter(({ id }) => id !== removeId);
}

export function updateFeed<T extends arrays.IMinimumArrayData>(state: T[], newVideos: T[]): T[] {
  let updatedList = [...state];

  if (arrays.checkNewItemsById(state, newVideos)) {
    updatedList = [...newVideos, ...state];
  } else {
    const newItem = get(newVideos, '0');
    const oldItem = state.find((item) => +item.id === +newItem.id);
    const newItemPublishDate = get(newItem, 'publishDate');
    const oldItemPublishDate = get(oldItem, 'publishDate');

    if (compareVideoPublishedDate(oldItemPublishDate, newItemPublishDate)) {
      const filteredList = removeItemFromList<T>(state, newItem.id);
      updatedList = [newItem, ...filteredList];
    }
  }

  return updatedList;
}

export const updatePublishedDateOfLastFetchedItem = (data: DTOVodAndPost[]): void => {
  const publishedDateOfLastFetchedVideo = getStorageItem<string>('publishedDateOfLastFetchedVideo');
  if (data.length) {
    const publishDate = get(data, '0.publishDate');
    const publishDateUnixTime = DateTime.fromISO(publishedDateOfLastFetchedVideo)
      .toMillis();
    const lastPublishDateUnixTime = DateTime.fromISO(publishDate)
      .toMillis();

    if (!publishedDateOfLastFetchedVideo || publishDateUnixTime < lastPublishDateUnixTime) {
      setStorageItem('publishedDateOfLastFetchedVideo', publishDate);
    }
  }
};
