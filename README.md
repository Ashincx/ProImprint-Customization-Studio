# ProImprint Customization Studio v2.0 🎨

An enterprise-grade, high-fidelity interactive 3D product customization web application designed and mapped from **Stitch Project ID: `9946207634550902794`** (*ProImprint Customizer — 40 Oz Safari Tumbler*).

---

## ✨ Overview

**ProImprint Customizer Studio** empowers B2B promotional product buyers and marketing managers to design, visualize, verify, and quote custom promotional products in real time. Built with **Vanilla HTML5, CSS3, and modern ES6 JavaScript**, it provides maximum performance, exact token fidelity, and a responsive workspace experience without heavy external framework dependencies.

---

## 🚀 Key Features

### 1. **Interactive 3D Product Stage (`40 Oz Safari Tumbler`)**
- **Dynamic Color Tinting**: Real-time surface coloring that tints the stainless steel tumbler (`Safari Stainless`, `Midnight Matte Black`, `Royal Safari Blue #0056b3`, `Expedition Crimson #E31837`, `Pine Forest Green #004c32`, and `Sunset Amber #F59E0B`).
- **Draggable & Scalable Imprint Bounding Box**: Interactive target area (`3.5" W x 4.0" H`) where users can drag, reposition, and align custom logos and text anywhere on the tumbler surface.
- **Glassmorphism Viewport Controls**: Intuitive controls for Zoom In/Out (`+ / -`), Grid display toggles, sizing reference widgets, and 1-click view resets.

### 2. **Automated "Safety Net" Quality Inspection**
- **Real-Time Vector & DPI Verification**: Automatically checks uploaded logo files (`SVG, PNG, AI, EPS`).
- **Status Warnings**: Displays instant feedback banner alerts (`Critical Red` for low resolution/out-of-bounds, `Warning Amber` for draft status, and `Success Green` when verified 100% vector-ready artwork is detected).

### 3. **4-Tab Customization Engine**
- **🖼️ Tab 1: Artwork / Logo Engine**:
  - **Drag-and-Drop Upload Zone**: Supports vector (`SVG`, `AI`, `EPS`) and raster (`PNG`, `JPG`) files up to 50MB.
  - **Instant 1-Click Sample Library**: Includes 4 pre-loaded professional vector logos (`Summit Mountain Blue`, `Apex Spark Tech Gold`, `GreenLeaf Organics`, `Shield Crest`) for immediate 1-click testing.
  - **Print Readiness Progress Gauge**: Live 0–100% vector quality score bar.
- **🔤 Tab 2: Advanced Typography Controls**:
  - Live text input (`"YOUR LOGO / TEXT"`) with instant tumbler preview updates.
  - **Curated Font Library**: Select between modern (`Inter`), technical monospaced (`JetBrains Mono`), elegant serif (`Playfair Display`), bold corporate (`Montserrat`), tall impact (`Oswald`), and script (`Pacifico`).
  - **Precision Sliders**: Adjust font size (`12px to 48px`) and letter spacing (`-2px to 10px`).
  - **Text Styling & Arching**: Toggle Bold, Italic, Uppercase, or apply a **Curved Arch 3D perspective effect** to wrap text around the tumbler.
  - **Imprint Color Swatches**: Pick between `Laser Engraved White/Silver`, `Matte Obsidian Black`, `Primary Blue`, `Crimson`, `Pine Green`, or `Gold`.
- **🎨 Tab 3: Color & Imprint Technology**:
  - Switch between 6 tumbler body finishes and 3 industrial imprint application methods:
    1. *CO₂ Laser Engraving (Permanent & Dishwasher Safe)*
    2. *1-Color High-Opacity Screen Print*
    3. *Full-Color Digital UV Print (Tactile Finish)*
- **📐 Tab 4: Placement & Technical Specifications**:
  - Toggle between Side 1 (Front Display), Side 2 (Back Display), or Dual-Side Imprint (`+$1.50/unit`).
  - 1-click horizontal and vertical auto-centering alignment helpers.
  - Expandable accordion spec sheet detailing capacity (`40 oz / 1.18L`), double-wall vacuum insulation tech (34h cold / 12h hot), and lid/straw/handle construction.

### 4. **Wholesale Tier Pricing Calculator & Pre-Production Proofs**
- **Live Tier-Based Discounting**:
  - `25–99 units`: **$7.99/unit**
  - `100–249 units`: **$6.49/unit**
  - `250–499 units`: **$5.29/unit**
  - `500+ units`: **$4.49/unit**
- **Live Quote Computation**: Automatically includes imprint method upcharges (`+$1.25` for Full Color UV, `+$1.50` for Dual Side) and updates total quote instantly.
- **Digital Proof Confirmation Modal**: Generates an official pre-production summary displaying exact SKU, body color, imprint method, side placement, custom content, and verification status with **PDF Spec Sheet download** and **Approve & Add to Cart** actions.

---

## 🛠️ Technology Stack & Architecture

| Component | Technology / Implementation |
| :--- | :--- |
| **Structure** | Semantic **HTML5** with custom data attributes (`data-purpose`, `data-tab`, `data-color`). |
| **Styling** | **Vanilla CSS3** structured around exact HSL/Hex design tokens (`#0056b3`, `#E31837`, `#004c32`, `#10b981`), CSS variables (`:root`), flex/grid layouts, and glassmorphism (`backdrop-filter: blur()`). |
| **Logic & State** | **Vanilla ES6+ JavaScript** (`app.js`) utilizing reactive state management, DOM event delegation, dynamic style transforms, and custom toast notification overlays. |
| **Typography** | Google Fonts (`Inter`, `JetBrains Mono`, `Playfair Display`, `Montserrat`, `Oswald`, `Pacifico`) and Material Symbols Outlined. |

---

## 💻 Getting Started / Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ashincx/ProImprint-Customization-Studio.git
   cd ProImprint-Customization-Studio
   ```
2. **Launch in Browser**:
   - Simply double-click `index.html` to open directly in any modern web browser (`Chrome`, `Edge`, `Firefox`, `Safari`), OR
   - Run a lightweight local development server:
     ```bash
     npx serve .
     # OR
     python -m http.server 8000
     ```

---

## 📁 Repository Structure

```text
ProImprint-Customization-Studio/
├── index.html          # Main application UI structure & modals
├── index.css           # Design system tokens, styling & responsive grid
├── app.js              # State management, 3D preview engine & pricing logic
├── stitch_screen.html  # Downloaded original Stitch prototype reference
└── README.md           # Project documentation
```

---

## 📜 License

Designed & Developed for **ProImprint Customization Engine v2.0**. Mapped from **Stitch ID: `9946207634550902794`**. All rights reserved.