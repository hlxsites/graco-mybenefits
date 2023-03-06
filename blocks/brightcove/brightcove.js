export default function decorate(block) {
  const videoId = block.children[0].children[1].textContent;

  block.innerHTML = `
    <div class="video-spacer"></div>
    <div class="video-template">
      <video-js data-video-id="${videoId}" data-account="940277650001" data-player="BkhQKcpdM" data-embed="default" controls="" data-application-id="" class="vjs-fluid"></video-js>
    </div>
  `;

  window.setTimeout(() => import('./brightcove.delayed.js'), 3000);
}
