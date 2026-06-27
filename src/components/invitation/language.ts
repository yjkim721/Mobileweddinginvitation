export function isEnglishLanguage() {
  if (typeof window === 'undefined') {
    return false;
  }

  const lang = new URLSearchParams(window.location.search)
    .get('lang')
    ?.toLowerCase();

  return lang === 'eng' || lang === 'en';
}
