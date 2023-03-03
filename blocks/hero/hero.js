/**
 * decorates the hero,
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.querySelector('img').setAttribute('loading', 'eager');
  block.querySelector('div').classList.add('hero-heading');

  const image = document.createElement('div');
  image.classList.add('hero-image');
  image.append(block.querySelector('picture'));
  const angle = document.createElement('div');
  angle.classList.add('hero-angle');
  image.append(angle);
  block.prepend(image);
}
