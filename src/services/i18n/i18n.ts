import i18next, { TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { env } from '@utils';
import { DTOTranslation } from '@api/localization/types';

const namespace = 'translation';
export const fallbackLanguage = 'en';

export function init(): Promise<TFunction> {
  return i18next
    .use(initReactI18next)
    .init({
      debug: env.isDev(),
      fallbackLng: fallbackLanguage,
      resources: {},
    });
}

export function changeLanguage(language: string): void {
  i18next.changeLanguage(language);
}

export function getTranslation(key: string, count?: number): string {
  return i18next.t(key, {
    count,
  });
}

export function addTranslations(language: string, resources: DTOTranslation): void {
  i18next.addResources(language, namespace, resources);
}
