# Landing Page Project

## Table of Contents

* [Helper Functions](#helper-functions)

## Helper Functions

#### getNavigationSections(navAttr) :
Returns a NodeList of sections that have the passed attribute

**Parameters:**
* _navAttr_: `string` The attribute used to identify which section should be considered in the navigation menu.


#### isInViewPort(element):
Check if the passed element is in the viewport relative to the window height and width.

**Parameters:**
* _element_: `HTMLElement` to check its' position in the viewport.


#### handleElementActivation (siblings, activeElement, activeClass):
Handle setting an element to active and deactivate other siblings.

**Parameters:**
* _siblings_: `NodeList`.
* _activeElement_: `HTMLElement`.
* _activeClass_: `string`.


#### scrollToElement (selector):
Handle scrolling to an element with a given selector.

**Parameters:**
* _selector_: `string`.

#### scrollToTop ():
Handle smooth scroll to top by getting the distance to document top and scroll the window towards the top every `30 ms` by calling itself recursively
