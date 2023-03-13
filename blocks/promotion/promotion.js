/**
 * Decorate the block
 * @param block
 * @returns {Promise<void>}
 */
export default async function decorate(block) {
  block.querySelector(':scope > div').classList.add('promotion-content');
  const picture = block.querySelector('picture');
  const parent = picture.parentElement; // Remove p tag.
  const img = document.createElement('div');
  img.classList.add('promotion-image');
  img.append(picture);
  block.prepend(img);
  parent.remove();
}
