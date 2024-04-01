import { FC, memo } from 'react';
import { Pagination } from 'swiper';

import { ScrollableSection, ItemCaption } from '@components';
import * as S from './PostDetailsScreen.styled';

interface ISelectedPost {
  id: number;
  images: string[];
  publishDate: string;
  caption: {
    description: string;
    picture: string;
    subTitle?: string;
    title: string;
  };
}

export const SelectedPost: FC<ISelectedPost> = memo(({
  images,
  caption,
}) => (
  <S.ModalContainer>
    <S.PostDetailsScreen>
      {
        images.length > 1
          ? (
            <ScrollableSection
              slidesPerView={1}
              freeMode={false}
              pagination={{
                dynamicBullets: true,
                dynamicMainBullets: 3,
              }}
              modules={[Pagination]}
              singleView
              withFraction
              amountOfItems={images.length}
            >
              {images.map((item) => (
                <S.PostImage
                  key={item}
                  src={item}
                />

              ))}
            </ScrollableSection>
          )
          : <S.PostImage src={images[0]} />
      }
      <S.ItemCaptionWrapper>
        <ItemCaption
          showFullDescription
          {...caption}
        />
      </S.ItemCaptionWrapper>
    </S.PostDetailsScreen>
  </S.ModalContainer>
));

SelectedPost.displayName = 'SelectedPost';
