import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  block.innerHTML = `
    <div class="content">
      <div class="copyright">© Graco Inc. All rights reserved.</div>
    </div>
    <div class="logo">
      <img src="/icons/graco_logo_white.svg" alt="Graco Logo">
    </div>
  `;
}
