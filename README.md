# Pure-JS-Carousel Comprehensive Build Steps


## Markup
  - carousel wrapper
  - slides wrapper  [data-module=carousel]
  - slide (content)
  - indicator nav 
  - indicator button
  - prev button
  - next button

## Features
  - support drag (mobile and desktop)
  - means some clicks will need to be ignored
  - previous/next controls to go to relative slides
  - pager to go to a specific slide
  - auto-advance
  - don't auto-advance if the carousel is behind a modal
  - don't auto-advance when hovered or focused
  - when resuming auto-advance after pause, enforce a minimum delay before advancing
  - if there are animations,
  - stop the animations during slide change
  - don't auto-advance while the animation is playing

## JS
  (if the markup isn't just the minimum, skip to 3)
  1. add carousel wrapper
  2. add any necessary attributes to the slides wrapper and the slides
  3. build the pager
  4. add click event listeners to the pager buttons (to handle direct slide selection)
  5. build the controls with click event listeners (to handle relative slide selection)
  6. event listeners on the full slide:
   - touch and mouse event handlers to support dragging
   - click handler to conditionally ignore clicks, to support dragging
   - mouse event handlers to support pause-on-hover
  
  ### Functions:
  - auto-advance
    -- make sure not hovered, focused, or behind a modal
    -- shiftslide(1), with pausable timer
  - prev
    -- shiftSlide(-1)
  - next
    -- shiftSlide(1)
  
  - shiftSlide(n)
    -- goToSlide(remainder of Euclidean division, Boute method)
  - pager button click
    -- goToSlide(n)
  - goToSlide(index)
    -- slide `index` is made active
    -- outgoing slide is made inactive
