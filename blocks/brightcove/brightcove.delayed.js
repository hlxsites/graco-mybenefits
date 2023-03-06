// Loads the brightcove player after page is done loading.
const head = document.querySelector('head');
const script = document.createElement('script');
script.setAttribute('src', 'https://players.brightcove.net/940277650001/BkhQKcpdM_default/index.min.js');
head.append(script);
