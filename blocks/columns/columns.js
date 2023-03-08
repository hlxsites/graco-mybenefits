export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  if (block.children.length > 1) {
    for (let i = 0; i < cols.length; i += 1) {
      block.children[1].children[i].classList.add(cols[i].textContent);
    }
    block.firstElementChild.remove();
  }
}
