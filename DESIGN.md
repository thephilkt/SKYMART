---
name: SKYMART
description: A calm Thai marketplace organized as a precise sequence of useful product arrivals.
colors:
  action-blue: "#246bfd"
  action-blue-deep: "#154fd1"
  signal-orange: "#ff6b35"
  success-green: "#16794b"
  focus-blue: "#0d5ce4"
  paper: "#f6f7f9"
  surface: "#ffffff"
  graphite: "#17191d"
  muted-graphite: "#60656f"
  line: "#dfe2e7"
  line-strong: "#bec3cb"
  aluminum: "#c9cdd4"
  aluminum-dark: "#777f8b"
typography:
  display:
    fontFamily: "Anuphan Variable, Noto Sans Thai, sans-serif"
    fontSize: "clamp(52px, 5.7vw, 82px)"
    fontWeight: 680
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Anuphan Variable, Noto Sans Thai, sans-serif"
    fontSize: "clamp(34px, 4vw, 60px)"
    fontWeight: 620
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Anuphan Variable, Noto Sans Thai, sans-serif"
    fontSize: "clamp(20px, 2vw, 29px)"
    fontWeight: 640
    lineHeight: 1.28
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Anuphan Variable, Noto Sans Thai, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Anuphan Variable, Noto Sans Thai, sans-serif"
    fontSize: "12px"
    fontWeight: 640
    lineHeight: 1.4
rounded:
  badge: "6px"
  control: "10px"
  container: "14px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-deep}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "42px"
  buying-dock:
    backgroundColor: "rgba(255, 255, 255, 0.96)"
    textColor: "{colors.graphite}"
    rounded: "{rounded.container}"
    padding: "14px 20px 16px"
  product-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.container}"
---

# Design System: SKYMART

## Overview

**Creative North Star: "The Aerial Product Route"**

SKYMART turns marketplace browsing into a calm sequence of useful arrivals. Cool white space, graphite type, precise blue actions, and restrained warm signals keep the interface quiet enough for product photography and decision-critical facts to lead.

Its defining material language is transportation hardware made approachable: brushed-aluminum routes carry products toward frosted markers, shallow plinths give each object physical weight, and the active item docks into a bright buying surface. The system is clean and premium without borrowing another brand's trade dress; clarity, explicit state, and Thai legibility remain functional constraints.

**Key Characteristics:**

- Product-led composition with restrained interface chrome.
- Brushed metal, frosted glass, and controlled shadow create purposeful depth.
- Precise blue actions use warm orange and green only for meaningful signals.
- The horizontal desktop runway becomes a vertical mobile stepper.
- Category discovery begins early instead of hiding beneath a promotional wall.

## Colors

The palette is cool, quiet, and engineered: neutral paper and graphite carry the experience, blue identifies action, and warm or green accents communicate exceptional state.

### Primary

- **Precision Blue:** The sole high-energy action color for primary buttons, search submission, active controls, and delivery icons.
- **Deep Action Blue:** The hover and high-contrast companion to Precision Blue.

### Secondary

- **Arrival Orange:** A rare warm signal for cart count, orbit details, and commerce cues that need to puncture the cool interface.
- **Ready Green:** Stock, success, and completion feedback; always paired with text or iconography rather than used alone.

### Neutral

- **Cool Paper:** The page field that separates white commerce surfaces without visual noise.
- **Clean Surface:** Cards, inputs, drawers, and buying docks.
- **Graphite:** Primary text, dark actions, category fields, and footer structure.
- **Muted Graphite:** Secondary copy and metadata.
- **Quiet Line:** Routine dividers and field boundaries.
- **Structural Line:** Stronger separators, quantity controls, and trust-strip edges.
- **Brushed Aluminum / Dark Aluminum:** The physical route, scrollbars, and hardware details.

### Named Rules

**The Quiet Chrome Rule.** Product imagery may carry saturated color; interface chrome remains cool and exact.

**The Rare Signal Rule.** Orange and green mark specific commerce states, never broad decoration.

## Typography

**Display Font:** Anuphan Variable (with Noto Sans Thai and sans-serif fallbacks)  
**Body Font:** Anuphan Variable (with Noto Sans Thai and sans-serif fallbacks)

**Character:** One variable Thai-first grotesk carries the full system. Tight display tracking creates confidence while open body leading protects scanability and localization.

### Hierarchy

- **Display:** Heavy-but-not-black, tightly tracked, and compact; reserved for the storefront proposition and major page moments.
- **Headline:** Controlled editorial scale for section headings and clear route transitions.
- **Title:** Compact product and dock titles that sit close to seller, rating, and price evidence.
- **Body:** Comfortable default reading rhythm for Thai copy and transactional explanations; supporting prose generally stays near 55–58 characters wide.
- **Label:** Small, firm metadata for sellers, categories, badges, and status; sentence case is preferred over decorative all-caps.

### Named Rules

**The Thai-First Measure Rule.** Never tighten type or narrow a control until longer Thai text has been tested without clipping.

## Layout

The desktop shell is fluid but capped at 1400px with 24px outer gutters. Large surfaces use asymmetric two-column compositions, while catalog content settles into four columns, then three below 1100px and two below 800px. Section spacing is deliberately generous, commonly 80–120px, so product and category shifts read as distinct stages rather than a continuous feed.

The signature desktop route spans the viewport, enlarging the active stop from 21% to 34% before docking its details into a centered 990px buying rail. At 800px and below, that route becomes a single-column vertical stepper laid over a 66px metal spine; the active row grows from 58px to 74px and receives the frosted marker. Buying actions collapse into a two-column band, while decision-critical delivery information stays full-width above them.

**The Early Category Rule.** Let the next category index begin within the first scroll; do not let an oversized promotional hero postpone useful browsing.

## Elevation & Depth

Depth is structural rather than ornamental. White surfaces lift gently from cool paper, the runway uses a rebuilt brushed-metal asset with a recessed slot and grounded cast shadow, and each product lands on a radial plinth with a compact drop shadow. Frosted route markers add a shallow translucent layer; stronger drawer and dock shadows are reserved for surfaces that truly sit above the page.

### Shadow Vocabulary

- **Ambient Surface:** A soft, broad lift for summaries and cards that must remain visible against paper.
- **Buying Dock:** A medium structural shadow that makes the active product's decision rail read as a docked surface.
- **Route Marker:** A small cool shadow beneath frosted active markers.
- **Product Plinth:** A compact dark drop shadow beneath the radial base to give merchandise physical weight.
- **Drawer Lift:** A directional left shadow that separates an open cart drawer from the dimmed page.

### Named Rules

**The Grounded Object Rule.** Every runway product sits on a visible plinth; floating cutouts without contact depth break the arrival metaphor.

**The Earned Elevation Rule.** Use strong shadows only for active, docked, or overlay surfaces.

## Shapes

The form language is controlled, not universally rounded. Fourteen-pixel corners belong to major containers and product media; ten-pixel corners belong to buttons, search, and everyday controls; six-pixel corners belong to compact badges. Full circles are reserved for icon buttons, status dots, swatches, and counts. The metal route may use a more generous industrial radius because it represents a physical object, while category rows remain linear and edge-defined.

**The Radius Has a Job Rule.** Choose corner shape by hierarchy and function; do not apply pill styling as a generic sign of friendliness.

## Components

### Buttons

- **Shape:** Firm rounded rectangles with a 48px minimum touch height; primary purchase actions may rise to 58px.
- **Primary:** Precision Blue with white text and compact horizontal padding; success replaces blue with Ready Green while preserving geometry.
- **Hover / Focus:** Hover deepens blue and lifts by 1px. Keyboard focus uses a visible three-pixel blue outline with a three-pixel offset.
- **Secondary:** Transparent with a structural gray border; hover strengthens the border to graphite and fills the surface white.

### Chips

- **Style:** Compact white or pale-blue badges with six-pixel corners, small firm labels, and no inflated pill silhouette.
- **State:** Color supports the label but never carries status alone.

### Cards / Containers

- **Corner Style:** Fourteen-pixel major container corners; product imagery tightens to ten pixels on mobile.
- **Background:** Clean white surfaces over Cool Paper, with pale gray media wells.
- **Shadow Strategy:** Catalog cards stay mostly flat; summaries, docks, and overlays receive earned elevation.
- **Border:** Fine cool gray boundaries or tonal separation, not heavy outlines.
- **Internal Padding:** Compact 14–26px bands, expanding only when the content hierarchy requires it.

### Inputs / Fields

- **Style:** White fields with graphite text, controlled ten-pixel corners, and quiet structural borders; the hero search instead uses a strong graphite underline.
- **Focus:** Border shifts to Precision Blue with a subtle blue halo, supplemented by the global visible focus outline.
- **Error / Disabled:** Disabled controls reduce opacity and keep the same footprint; validation must combine text or icon feedback with color.

### Navigation

The sticky 72px header uses a lightly translucent Cool Paper surface, a quiet bottom rule, and restrained blur. The wordmark is compact and heavy, with only its accent fragment in blue. Desktop search and links recede beside a graphite cart action; below 800px, navigation becomes a 64px mobile bar with 44px menu and cart targets.

### Product Runway

The Aerial Carousel is the signature component, originating from candidate 3 under direction seed `61952f2f`. Desktop stops share a horizontal brushed-aluminum rail; the active stop expands, rises seven pixels, animates the product into place, and updates an accessible tab panel in the buying dock. Frosted route markers label the path, product plinths preserve weight, arrow keys cycle the tabs, and reduced-motion settings collapse animation duration.

On mobile, preserve the same semantic route as a vertical stepper rather than substituting a generic horizontal scroller. The active marker is frosted, taller, and fully legible; non-active labels recede but remain discoverable.

### Category Route

The category index is a dark graphite transition immediately after the runway. Large indexed rows combine a number, image, compact category cue, Thai title, description, and directional arrow; mobile removes only the descriptive copy, preserving the route itself.

## Do's and Don'ts

### Do:

- **Do** keep price, seller, stock, delivery, rating, and the next action visible around the active product.
- **Do** preserve the rebuilt brushed-metal route, frosted active markers, and visible product plinth depth.
- **Do** convert the runway to the vertical mobile stepper at 800px and below.
- **Do** begin category discovery early and maintain generous stage-to-stage spacing.
- **Do** retain 44px-or-larger mobile targets, visible focus, and reduced-motion behavior.

### Don't:

- **Don't** replace the runway with a promotional banner followed by an undifferentiated product grid.
- **Don't** saturate interface chrome or use orange and green as general decoration.
- **Don't** round every surface into pills or soften the linear category route.
- **Don't** hide decision-critical facts behind hover, ambiguous icons, or color-only status.
- **Don't** collapse mobile into a clipped desktop carousel or postpone categories below a full-screen hero.
