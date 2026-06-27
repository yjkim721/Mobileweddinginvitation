import { useEffect, useState } from 'react';

const LANGUAGE_CHANGE_EVENT = 'wedding-language-change';

export function isEnglishLanguage() {
  if (typeof window === 'undefined') {
    return false;
  }

  const lang = new URLSearchParams(window.location.search)
    .get('lang')
    ?.toLowerCase();

  return lang === 'eng' || lang === 'en';
}

export function setInvitationLanguage(language: 'ko' | 'eng') {
  if (typeof window === 'undefined') {
    return;
  }

  const nextUrl = new URL(window.location.href);

  if (language === 'eng') {
    nextUrl.searchParams.set('lang', 'eng');
  } else {
    nextUrl.searchParams.delete('lang');
  }

  if (nextUrl.toString() === window.location.href) {
    return;
  }

  window.history.pushState({}, '', nextUrl.toString());
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
}

export function useInvitationLanguage() {
  const [isEnglish, setIsEnglish] = useState(isEnglishLanguage);

  useEffect(() => {
    const handleLanguageChange = () => {
      setIsEnglish(isEnglishLanguage());
    };

    window.addEventListener(
      LANGUAGE_CHANGE_EVENT,
      handleLanguageChange,
    );
    window.addEventListener('popstate', handleLanguageChange);

    return () => {
      window.removeEventListener(
        LANGUAGE_CHANGE_EVENT,
        handleLanguageChange,
      );
      window.removeEventListener('popstate', handleLanguageChange);
    };
  }, []);

  return isEnglish;
}
