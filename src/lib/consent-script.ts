import type { TagConfig } from './analytics'

/**
 * Consent Mode v2 defaults. Must run before any Google tag, so it's an
 * inline script at the top of the page: everything denied until the visitor
 * chooses, then restored from their saved choice on later visits.
 */
export function consentDefaults(cfg: TagConfig) {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;window.__npTags=${JSON.stringify(cfg).replace(/</g, '\\u003c')};
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
var m=document.cookie.match(/(?:^|; )np_consent=a([01])\\.m([01])/);if(m){var a=m[1]==='1'?'granted':'denied',k=m[2]==='1'?'granted':'denied';gtag('consent','update',{analytics_storage:a,ad_storage:k,ad_user_data:k,ad_personalization:k})}`
}

