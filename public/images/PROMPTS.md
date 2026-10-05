# Image Generation Prompts & Visual Registry

This document records the exact prompts, generation parameters, reference images, and post-processing used for the hero crossfade and page header images for ALAQ Solutions.

## Visual Direction & Style Baseline
- **Anchor Reference**: Dispatch desk in steel fabrication office (`hero_paper_orders_1790776097131.jpg`).
- **Tone**: Gritty dark industrial realism, cool deep navy (`#0B1F3A`) and slate shadows, desaturated steel gray, soft industrial window daylight.
- **Constraints**: No corporate stock-photo look, no warm wood, no city plants, no readable text or legible numbers, no brand logos, zero people (empty shops and offices).
- **Format**: 16:9 aspect ratio, exported as WebP (desktop ~2400px, mobile ~900px), all under 250 KB desktop and under 80 KB mobile.

---

## Hero Sequence: Same Viewpoint, 4 Stages of the Dispatch Desk

All 4 images share the **identical camera viewpoint**: the dark steel dispatch desk overlooking the fabrication shop floor through the wide office window.

### 1. Stage 1: Paper Chaos (The Old Way)
- **Files**: `hero-01-paper-orders.webp` (138.0 KB) | `hero-01-paper-orders-mobile.webp` (43.3 KB)
- **Description**: Stacks of printed cut lists, blueprints, clipboards, and purchase orders on the metal desk.
- **Prompt**:
  > Cinematic editorial documentary photograph of an operations dispatch desk in an industrial structural steel fabrication office. In the foreground corners and sides, dense stacks of paper purchase orders, printed fabrication work orders, architectural blueprints, clipboards, and manila file folders rest on a dark metal industrial desk. In the background, out-of-focus window overlooking a steel shop floor with soft industrial morning daylight. Center of the frame is quiet, dark, and composed with low detail and shallow depth of field. Muted, moody color palette with cool navy slate tones and desaturated steel grays. No readable words or legible numbers on paper, no brand logos, no human faces, realistic professional commercial photography, 35mm lens.

### 2. Stage 2: Cluttered with Spreadsheet (The Old Way, Digital)
- **Files**: `hero-02-cramped-spreadsheet.webp` (125.4 KB) | `hero-02-cramped-spreadsheet-mobile.webp` (41.1 KB)
- **Reference**: Generated using Stage 1 as image reference for exact camera alignment.
- **Description**: Same desk and shop floor window. Still cluttered with paper stacks, now with a dated monitor showing a dense, blurred spreadsheet grid.
- **Prompt**:
  > In the exact same camera angle and viewpoint as the reference dispatch desk overlooking the steel fabrication shop floor through the large office window: the desk is still cluttered with paper purchase orders and cut lists, but now includes a dark desktop computer monitor on the right side of the desk showing a dense, completely blurred, abstract spreadsheet with soft screen illumination. Gritty dark industrial realism, cool deep navy and slate shadows, desaturated steel grays, soft natural window light. No people in the shop or office, no readable text, no numbers, no brand logos. Center of frame is quiet and low contrast.

### 3. Stage 3: Half-Cleared with Scanner (The Turning Point)
- **Files**: `hero-03-organized-flow.webp` (116.8 KB) | `hero-03-organized-flow-mobile.webp` (36.8 KB)
- **Reference**: Generated using Stage 1 as image reference.
- **Description**: Same desk and window. Front desk half-cleared, one neat paper stack, compact desktop scanner, and monitor glowing soft blue with an abstract document wireframe.
- **Post-processing**: Subtle optical softening on the paper stack surface to eliminate any garbled lines.
- **Prompt**:
  > In the exact same camera angle and viewpoint as the reference dispatch desk overlooking the steel fabrication shop floor: the desk is now half cleared. The paper piles on the front desk are much smaller and organized into a single neat stack. A compact modern document scanner sits on the desk. The computer monitor on the right glows with a calm, soft blue screen showing an abstract, blurred document intake wireframe layout. Gritty dark industrial realism, cool deep navy and slate shadows, desaturated steel grays, same window overlooking the empty shop floor. No people, no readable text, no numbers, no brand logos. Center of frame is calm and low contrast.

### 4. Stage 4: Clean and Organized (The New Way)
- **Files**: `hero-04-modern-dashboard.webp` (93.7 KB) | `hero-04-modern-dashboard-mobile.webp` (28.4 KB)
- **Reference**: Generated using Stage 1 as image reference.
- **Description**: Same desk and window. Desk completely clear and clean dark metal. Modern monitor glowing soft blue with an abstract ERP operations dashboard (charts/cards, no text).
- **Prompt**:
  > In the exact same camera angle and viewpoint as the reference dispatch desk overlooking the steel fabrication shop floor through the window: the desk is now clean, tidy, and organized. All loose paper clutter and piles are gone. On the right side of the desk, a sleek modern monitor glows with a calm soft blue abstract operations dashboard with minimalist blurred cards and a clean data graph. The metal desk surface is dark, clean, and spacious. Gritty dark industrial realism, cool deep navy and slate shadows, desaturated steel grays, same window overlooking the empty shop floor. No people, no readable text, no numbers, no brand logos. Center of frame is open, quiet, and low contrast.

---

## Page Headers

### Industries Header
- **Files**: `header-industries.webp` (243.7 KB) | `header-industries-mobile.webp` (76.3 KB)
- **Description**: Structural steel building frame under construction with crisp industrial geometry against overcast sky.
- **Prompt**:
  > Cinematic architectural documentary photography of a large structural steel building frame under construction. Imposing steel columns and roof trusses against an overcast morning sky. Open, spacious composition with calm low-detail center. Cool slate blue and industrial metal tones, crisp geometry, realistic depth of field, no crane logos, no worker faces, clean commercial construction photography.

### Solutions Header
- **Files**: `header-solutions.webp` (147.8 KB) | `header-solutions-mobile.webp` (45.4 KB)
- **Description**: Structural steel fabrication shop floor with aligned heavy I-beams and precision metal cut plates.
- **Prompt**:
  > Cinematic documentary photography of a modern high-precision structural steel fabrication shop floor. Heavy structural I-beams and precision metal cut parts aligned neatly on workbenches. Soft industrial natural daylight from high warehouse windows with gentle atmospheric haze and subtle cool navy tint. Center of the frame is open and low contrast for title overlay. Muted steel gray, slate, and industrial tones. Realistic commercial photography, shallow depth of field, no human faces, no logos.

### How It Works Header
- **Files**: `header-how-it-works.webp` (88.0 KB) | `header-how-it-works-mobile.webp` (25.0 KB)
- **Description**: Close-up of paper feeding into a desktop scanner on dark metal desk with soft blue LED light bar; fabrication shop blurred behind.
- **Post-processing**: Optical softening on paper surface so no text is readable.
- **Prompt**:
  > Cinematic close-up photograph of a paper purchase order feeding smoothly into a modern desktop scanner on a dark industrial metal desk. A quiet soft blue LED light bar glows along the scanner feed slot, illuminating the edge of the paper with calm blue light. Out of focus in the dark background, a structural steel fabrication shop floor with high steel beams and soft industrial window light. Gritty dark industrial realism, cool deep navy and slate shadows, desaturated steel grays, shallow depth of field with macro focus on the scanner. No readable text, no logos, no people, no hands. Center of frame is dark and calm.

### About Header
- **Files**: `header-about.webp` (55.5 KB) | `header-about-mobile.webp` (10.9 KB)
- **Description**: Detroit River and Windsor waterfront at quiet dusk / blue hour with the Ambassador Bridge span and industrial riverfront silhouette.
- **Prompt**:
  > Cinematic photograph of the Detroit River and Windsor waterfront at quiet dusk during blue hour. Deep navy twilight sky and calm dark reflective water with cool slate blue shadows. In the distance across the water, the atmospheric silhouette of industrial waterfront architecture and distant bridge spans under twilight. Moody, calm, cinematic atmosphere, gritty realistic documentary photography. Deep navy and slate tones, soft long exposure water reflections, no people, no readable text, no logos.

---

## Hero Sequence 2.0: Minimal Data Automation (3 Stages)

Shows raw scattered data cells being organized by an AI scan into structured, linked ERP records.

Shared properties:
- **Camera angle**: Fixed perspective, identical framing and scale across all 3 stages.
- **Lighting**: Soft ambient directional light from upper left.
- **Background**: Deep charcoal to slate gradient (#0C1118 to #111A26).
- **Composition**: Visual elements restricted to lower right quadrant. Upper half and center-left completely open and dark for text overlay.
- **Style**: Matte, low contrast, no text/numbers, single restrained soft-blue accent (#6FA0FF).
- **Target Sizes**: 16:9 2400px desktop (<200 KB) and 16:10 900px mobile (<50 KB).

### 1. Stage 1: Raw Data
- **Files**: `hero-data-01-raw.webp` (45.3 KB) | `hero-data-01-raw-mobile.webp` (12.8 KB)
- **Description**: Loose, slightly tilted grid of small rounded rectangular cells in muted gray tones, scattered and uneven, with faint stray lines.
- **Prompt**:
  > Minimalist premium abstract product UI visualization on a smooth dark charcoal and deep slate background (#0C1118 to #111A26). In the lower right quadrant of the frame, a loose, slightly tilted perspective grid of small rounded rectangular spreadsheet data cells in muted matte gray and dark slate tones, scattered, uneven, and slightly fragmented with faint thin stray lines connecting them, representing messy unstructured raw data. The top half and center-left of the image are completely dark, spacious, and empty with subtle vignetting. Soft gentle ambient lighting from upper left. Very low contrast, restrained, clean, matte texture, subtle depth of field. Strictly no text, no numbers, no words, no letters, no logos, no bright glows, no neon, no people, no glossy 3D plastic.

### 2. Stage 2: AI Organizing
- **Files**: `hero-data-02-organizing.webp` (53.0 KB) | `hero-data-02-organizing-mobile.webp` (14.5 KB)
- **Reference**: Generated using Stage 1 as image reference for exact camera alignment.
- **Description**: The same cells moving toward alignment with a thin soft-blue scan line sweeping across.
- **Prompt**:
  > Minimalist premium abstract product UI visualization on the exact same smooth dark charcoal and deep slate background, same camera angle and soft lighting from upper left. In the lower right quadrant, the same grid of rounded rectangular data cells from the reference image is now organizing into straighter rows. A single thin, elegant soft-blue line (#6FA0FF) sweeps across the grid like a precise subtle scan line. The cells behind the scan line have straightened into orderly rows, while maintaining muted matte slate tones with a subtle soft blue tint on one passed cell. The top half and center-left remain completely dark, spacious, and empty. Very low contrast, restrained, clean, matte texture, subtle depth of field. Strictly no text, no numbers, no words, no letters, no logos, no bright glows, no neon, no people.

### 3. Stage 3: Structured ERP
- **Files**: `hero-data-03-structured.webp` (47.8 KB) | `hero-data-03-structured-mobile.webp` (12.9 KB)
- **Reference**: Generated using Stage 2 as image reference.
- **Description**: The cells structured into aligned linked records (order header and line items) with thin connecting data lines and one soft-blue record highlight.
- **Prompt**:
  > Minimalist premium abstract product UI visualization on the exact same smooth dark charcoal and deep slate background, same camera angle and soft lighting from upper left. In the lower right quadrant, the data cells from the reference image are now fully transformed into a perfectly aligned, structured table layout with clear rows and columns, organized into two neat linked blocks resembling an ERP order header and line items, connected by clean thin straight data relation lines. Exactly one subtle soft-blue highlight (#6FA0FF) on a single header cell record, with all other cells in clean, muted matte gray and dark slate tones. The scan line is gone. The top half and center-left remain completely dark, spacious, and empty. Very low contrast, restrained, clean, matte texture, subtle depth of field. Strictly no text, no numbers, no words, no letters, no logos, no bright glows, no neon, no people.
