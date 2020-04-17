# Magento 2 custom jQuery widgets

A collection of useful custom jQuery widgets for Magento 2.

## Category filter

This widget allows to filter listing of article or pushs by categories.

#### Setup

* Add a data-filter="all" to the button that needed to display all categories
* Add a data-role="filter" on every links that is going to filter listing by categories
* Add a data-role="filters" on filter links listing
* Add a data-role="category" on every listing item that you would like to filter
* Add a data-lazy="path" on every images that need to be lazy loaded in categories

## Input file custom

This widget allows to custom input file element.

#### Setup 

```html
<div data-mage-init='{ "<categoryFilter>": {...} }'></div>
```

#### Options

* input : String (example : '[data-role=input-file]')
* button : String (example : '[data-role=input-file-trigger]')
* message : String (example : '[data-role=input-file-message]')

## List to select

This widget transform list elements to select elements (useful for mobile resolution).

#### Setup 

```html
<div data-mage-init='{ "<listToSelect>": {...} }'></div>
```

#### Options

* mobileOnly : Boolean
* mobileBreakPoint : Number

## Password show

This widget allows user to show its password during form completing.

#### Setup 

```html
<input typ="password" />
<div class="check-password" data-mage-init='{ "<listToSelect>": {...} }'></div>
```

#### Options

* actionType : String (onClick, onRelease)
* mobileBreakPoint : Number

## Password strength

This widget allows user to check if its password is strong enough.

#### Setup 

```html
<input type="password" data-mage-init='{ "<passwordStrength>": {...} }'></div>
```

## Scroll to

This widget allows to add animated scroll to target element on link click.

#### Setup

* Your target ID must correspond to the href value of your link element
* Your links must have a ul li parent structure

```html
<div data-mage-init='{ "<scrollTo>": {...} }'></div>
```

#### Options

* linksElement: String (example : '[data-role=links]'),
* animateDuration: Number
* stickyHeader: Boolean

## Sticky header

Add sticky to Magento main header.

```html
<div data-mage-init='{ "<stickyHeader>": {...} }'></div>
```