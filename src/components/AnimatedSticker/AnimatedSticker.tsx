import {
  useEffect, useRef, FC,
} from 'react';
import Lottie, { Options } from 'react-lottie';
import isString from 'lodash/isString';

interface ILottieOptions extends Options {
  renderer?: string;
  path?: string;
  animationData: string | null;
}

interface IAnimatedSticker {
  size?: number | string | undefined;
  id: string | undefined;
  intersectionObserver?: IntersectionObserver | null;
  inView: boolean;
  lottieFile: string | null;
  renderer?: string;
}

export const AnimatedSticker: FC<IAnimatedSticker> = ({
  size,
  id,
  intersectionObserver,
  inView,
  lottieFile,
  renderer = 'canvas',
}) => {
  const elRef = useRef(null);

  const lottieOptions: ILottieOptions = {
    loop: true,
    autoplay: false,
    renderer,
    animationData: null,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
  };
  if (isString(lottieFile)) {
    lottieOptions.path = lottieFile;
  } else {
    lottieOptions.animationData = lottieFile;
  }

  useEffect(() => {
    const current = elRef?.current;
    if (intersectionObserver && current) {
      intersectionObserver.observe(current);
    }

    return () => {
      if (intersectionObserver && current) {
        intersectionObserver.unobserve(current);
      }
    };
  }, [intersectionObserver]);

  return (
    <div
      ref={elRef}
      id={id}
    >
      <Lottie
        isClickToPauseDisabled
        height={size}
        width={size}
        isPaused={!inView}
        options={lottieOptions}
      />
    </div>
  );
};
