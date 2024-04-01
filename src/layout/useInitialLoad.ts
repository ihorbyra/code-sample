import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';

import { setStorageItem, device } from '@utils';
import { actions, selectors } from '@store';
import {
  EIdentityActions, EQueryParam, useQueryParam,
} from '@utils/url';

export const useInitialLoad = (): void => {
  const dispatch = useDispatch();
  const [, setSearchParam] = useSearchParams();

  const idToken = useQueryParam(EQueryParam.idToken);
  const refreshToken = useQueryParam(EQueryParam.refreshToken);
  const action = useQueryParam(EQueryParam.action);
  const unmute = useQueryParam(EQueryParam.unmute);

  const showScrollOnMobile = useSelector(selectors.common.showScrollOnMobile);
  const userLanguage = useSelector(selectors.profile.selectUserLanguage);
  const isAuthorized = useSelector(selectors.profile.isUserAuthorized);

  device.useWindowResize();

  useEffect(() => {
    if (isAuthorized && userLanguage) {
      dispatch(actions.localization.fetchLanguageTranslationInit(userLanguage));
    }
  }, [userLanguage, isAuthorized, dispatch]);

  useEffect(() => {
    if (idToken && refreshToken) {
      setStorageItem<string>('idToken', idToken);
      setStorageItem<string>('refreshToken', refreshToken);
      const searchParam = unmute ? 'unmute=true' : '';
      setSearchParam(searchParam);
    }
  }, [idToken, refreshToken, unmute, setSearchParam, dispatch]);

  useEffect(() => {
    if (action && action === EIdentityActions.signOut) {
      dispatch(actions.profile.signOutInit());
      setSearchParam('');
    }
  }, [action, setSearchParam, dispatch]);

  useEffect(() => {
    const timer = setInterval(
      () => dispatch(actions.common.incrementCounter()),
      1000,
    );

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    const layoutContent = document.getElementById('layout-content');
    if (isMobileOnly && layoutContent) {
      layoutContent.style.overflow = showScrollOnMobile ? 'hidden' : 'visible';
    }
  }, [showScrollOnMobile]);
};
