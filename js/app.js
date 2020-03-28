"use strict";
/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
let isScrolling;
const navAttr = 'data-nav';
const activeClass = 'active';

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * @description Returns a NodeList of sections that have the passed attribute
 * @param {string} navAttr
 * @returns {NodeList}
 */
function getNavigationSections (navAttr) {
  // get all sections in the page
  let sections = document.querySelectorAll('section');

  if (sections.length > 0) {
    // check if the sections had the dataAttr attribute and remove ones that doesn't have it
    sections.forEach((section, index) => {
      if (!section.hasAttribute(navAttr)) {
        sections.splice(index, 1);
      }
    });
  }

  return sections;
}

/**
 * @description Check if the passed element is in the viewport
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isInViewPort (element) {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

/**
 * @description Handle setting a section to active and deactivate other sections.
 * @param {NodeList} sections
 * @param {HTMLElement} activeSection
 * @param {string} activeClass
 */
function handleSectionActivation (sections, activeSection, activeClass) {
  sections.forEach(section => {
    if (section.classList.contains(activeClass)) {
      section.classList.remove(activeClass);
    }

    activeSection.classList.add(activeClass);
  });
}

/**
 * @description Handle scrolling to an element with a given selector
 * @param {string} selector
 */
function scrollToElement(selector) {
  if (document.querySelector(selector)) {
    document.querySelector(selector).scrollIntoView({
      behavior: 'smooth'
    });
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/**
 * @description Generate the navigation bar elements
 * @param {NodeList} sections
 * @param {string} navAttr
 */
function buildNavElements (sections, navAttr) {
  if (sections.length > 0) {
    const fragment = document.createDocumentFragment();
    const navigationContainer = document.querySelector('#navbar__list');

    sections.forEach(section => {
      const menuItem = document.createElement('li');
      const menuItemContent = document.createElement('a');
      menuItemContent.className = 'menu__link';
      menuItemContent.setAttribute('href', `#${section.getAttribute('id')}`);
      menuItemContent.setAttribute('data-section', `#${section.getAttribute('id')}`);
      menuItemContent.innerText = section.getAttribute(navAttr);
      menuItem.appendChild(menuItemContent);
      fragment.appendChild(menuItem);
    });

    navigationContainer.appendChild(fragment);
  }
}

/**
 * @description Handle adding class 'active' to section when near top of viewport
 */
function handlePageScroll () {
  // Clear Timeout
  window.clearTimeout(isScrolling);

  // Set section as active after scroll ends
  isScrolling = setTimeout(() => {
    const sections = getNavigationSections(navAttr);
    let activeSection = null;

    if (sections.length > 0) {
      sections.forEach(section => {
        if (isInViewPort(section)) {
          activeSection = section;
        }
      });

      if (activeSection) {
        handleSectionActivation(sections, activeSection, activeClass);
      }
    }

  }, 0)

}

/**
 * @description Handle scrolling the anchor ID
 */
function handleNavItemClick (evt) {
  if (evt.target.nodeName === 'A') {
    evt.preventDefault();
    const sectionId = evt.target.getAttribute('data-section');
    history.pushState(null,null, sectionId);
    scrollToElement(sectionId);
  }
}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Make sure that the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const sections = getNavigationSections(navAttr);

  // Build menu
  buildNavElements(sections, navAttr);

  // Scroll to section on link click
  document.querySelector('#navbar__list').addEventListener('click', handleNavItemClick);

  // Set sections as active
  window.addEventListener('scroll', handlePageScroll, false);
});
