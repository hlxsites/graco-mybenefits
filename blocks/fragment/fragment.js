import { decorateButtons, decorateIcons, decorateSections, decorateBlocks } from '../../scripts/lib-franklin.js';

/**
 * decorates the hero,
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const ref = block.querySelector('a');
  if (ref && ref.getAttribute('href')) {
    const resp = await fetch(`${ref.getAttribute('href')}.plain.html`);
    if (resp.ok) {
      const content = await resp.text();
      const main = document.createElement('main');
      main.innerHTML = content;
      decorateButtons(main);
      decorateSections(main);
      decorateBlocks(main);
      const section = main.querySelector('.section');
      block.closest('.section').classList.add(...section.classList);
      block.parentElement.outerHTML = section.innerHTML;
    }
  }

  decorateIcons(block);
}
