import { readBlockConfig, decorateIcons, decorateSections } from '../../scripts/lib-franklin.js';

// media query match that indicates mobile/tablet width
const MQ = window.matchMedia('(min-width: 990px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && MQ.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!MQ.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || MQ.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || MQ.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (MQ.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || MQ.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

const createUtility = (section) => {
  const img = document.createElement('img');
  img.setAttribute('src', '/icons/external_link_gray.svg');
  img.setAttribute('alt', 'External Link');

  const utility = document.createElement('div');
  utility.classList.add('nav-utility');

  const list = section.querySelector('ul');
  list.classList.add('nav-list');
  list.querySelectorAll('li').forEach((item) => {
    item.classList.add('nav-item');
    const a = item.querySelector('a');
    if (a && a.getAttribute('href').includes('http')) {
      a.append(img.cloneNode(true));
    } else if (!a) {
      const anchor = document.createElement('a');
      anchor.setAttribute('href', '#');
      anchor.textContent = item.textContent;
      item.innerHTML = anchor.outerHTML;
    }
  });

  utility.append(list);
  return utility;
};

const createLogo = (section) => {
  const logo = document.createElement('div');
  logo.classList.add('nav-logo');
  const a = section.querySelector('a');
  const href = a.getAttribute('href');
  const text = a.textContent;

  logo.innerHTML = `
      <a class="image" href="${href}">
        <span class="sr-only">${text}</span>
        <img src="/icons/graco_logo.svg" class="site-header__brand-logo d-inline-block align-top" alt="${a.textContent}">
      </a>
      <div class="nav-link">
        <a href="${href}">
            <span class="nav-link-text">${text}</span>
        </a>
      </div>
  `;
  return logo;
};

const createSections = (section) => {
  const sections = document.createElement('div');
  sections.classList.add('nav-sections');
  const list = section.querySelector('ul');
  list.classList.add('nav-list');

  list.querySelectorAll('li').forEach((li) => li.classList.add('nav-item'));

  sections.append(list);
  return sections;
};

const createHamburger = () => {
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');

  hamburger.innerHTML = `
      <ul class="nav-list">
        <li class="nav-item">
          <a class="nav-link js-mobile-menu-toggle mobile-menu-icon" href="#">
            <img src="/icons/menu.svg" class="mobile-icon open" alt="Main Menu">
            <img src="/icons/close.svg" class="mobile-icon close" alt="Close Main Menu">
          </a>
        </li>
      </ul>
  `;

  const link = hamburger.querySelector('.js-mobile-menu-toggle');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('body').classList.toggle('menu-is-open');
  });

  return hamburger;
};

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const config = readBlockConfig(block);
  block.textContent = '';

  // fetch nav content
  const navPath = config.nav || '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    const nav = document.createElement('nav');
    decorateSections(tmp);

    const primary = document.createElement('div');
    primary.classList.add('nav-primary');

    const utility = createUtility(tmp.querySelector('[data-section="utility"]'));
    const logo = createLogo(tmp.querySelector('[data-section="logo"]'));
    const sections = createSections(tmp.querySelector('[data-section="sections"]'));

    const hamburger = createHamburger();

    nav.append(utility);
    primary.append(logo);
    primary.append(sections);
    primary.append(hamburger);
    nav.append(primary);
    decorateIcons(nav);
    block.append(nav);
  }
}
