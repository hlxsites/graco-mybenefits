export default function decorate(block) {
  const videoId = block.children[0].children[1].textContent;
  const placeholder = block.children[1].children[1].querySelector('picture');

  block.innerHTML = `
    <div class="video-placeholder">
      ${placeholder.outerHTML}
      <button class="play-button" type="button" title="Play Video" aria-disabled="false">
        <span class="icon-placeholder" aria-hidden="true"></span>
        <span class="control-text" aria-live="polite">Play Video</span>
      </button>
    </div>
    <div class="video-template">
      <video-js data-video-id="${videoId}" data-account="940277650001" data-player="BkhQKcpdM" data-embed="default" controls="" data-application-id="" class="vjs-fluid"></video-js>
    </div>
  `;
  window.setTimeout(() => import('./brightcove.delayed.js'), 3000);
}
