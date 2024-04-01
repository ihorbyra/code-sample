import { DTOLiveStream } from '@api/types';

export const updateLives = (list: DTOLiveStream[], item: DTOLiveStream): DTOLiveStream[] => {
  const updatedIndex = list.findIndex((element) => element.id === item.id);

  if (updatedIndex === -1) {
    return [item, ...list];
  }

  const newArray = [...list];
  newArray[updatedIndex] = item;
  return newArray;
};
