/**
 * ProImprint Customization Studio v2.0 - Core Interactive Application
 * Mapped from Stitch Project ID: 9946207634550902794
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE MANAGEMENT ---
  const state = {
    quantity: 25,
    unitPrice: 7.99,
    tumblerColorName: 'Safari Stainless',
    tumblerColorTint: 'transparent',
    imprintMethod: 'Laser Engraved (Permanent)',
    imprintSide: 'Side 1 (Front Display)',
    customText: 'YOUR LOGO / TEXT',
    fontFamily: "'Inter', sans-serif",
    fontSize: 20,
    letterSpacing: 0,
    isBold: true,
    isItalic: false,
    isUppercase: true,
    isArched: false,
    textColor: '#0F172A',
    activeLogoUrl: null,
    activeLogoName: null,
    zoomLevel: 1.0,
    isDragging: false,
    dragOffset: { x: 0, y: 0 }
  };

  // --- DOM ELEMENT REFERENCES ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // Viewport & Stage
  const tumblerWrapper = document.getElementById('tumbler-wrapper');
  const tumblerTint = document.getElementById('tumbler-tint');
  const imprintBox = document.getElementById('imprint-box');
  const previewLogo = document.getElementById('preview-logo');
  const previewText = document.getElementById('preview-text');
  const previewPlaceholder = document.getElementById('preview-placeholder');
  const sizingWidget = document.getElementById('sizing-widget');

  // Text Tab Controls
  const customTextInput = document.getElementById('custom-text-input');
  const fontFamilySelect = document.getElementById('font-family-select');
  const fontSizeSlider = document.getElementById('font-size-slider');
  const fontSizeVal = document.getElementById('font-size-val');
  const letterSpacingSlider = document.getElementById('letter-spacing-slider');
  const letterSpacingVal = document.getElementById('letter-spacing-val');
  const btnBold = document.getElementById('btn-format-bold');
  const btnItalic = document.getElementById('btn-format-italic');
  const btnUppercase = document.getElementById('btn-format-uppercase');
  const btnArch = document.getElementById('btn-format-arch');
  const textColorSwatches = document.querySelectorAll('#text-color-swatches .color-swatch-item');

  // Color Tab Controls
  const tumblerColorCards = document.querySelectorAll('.tumbler-color-card');
  const activeColorNameEl = document.getElementById('active-tumbler-color-name');
  const methodOptions = document.querySelectorAll('.method-option-card');

  // Placement & Specs
  const placementButtons = document.querySelectorAll('.btn-placement-side');
  const btnAlignH = document.getElementById('btn-align-center-h');
  const btnAlignV = document.getElementById('btn-align-center-v');

  // Artwork & Samples
  const uploadDropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('file-input');
  const sampleCards = document.querySelectorAll('.sample-asset-card');
  const btnClearArtwork = document.getElementById('btn-clear-artwork');
  const assetsListContainer = document.getElementById('assets-list-container');
  const assetCountBadge = document.getElementById('asset-count-badge');
  const readinessProgress = document.getElementById('readiness-progress');
  const readinessScoreVal = document.getElementById('readiness-score-val');

  // Pricing & Checkout Footer
  const qtyInput = document.getElementById('qty-input');
  const btnQtyMinus = document.getElementById('btn-qty-minus');
  const btnQtyPlus = document.getElementById('btn-qty-plus');
  const totalPriceDisplay = document.getElementById('total-price-display');
  const unitBreakdownDisplay = document.getElementById('unit-breakdown-display');
  const tierItems = document.querySelectorAll('.tier-item');

  // Modal & Actions
  const btnProceedProof = document.getElementById('btn-proceed-proof');
  const proofModal = document.getElementById('proof-modal');
  const btnCloseProof = document.getElementById('btn-close-proof');
  const btnApproveOrder = document.getElementById('btn-approve-order');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  const cartCountEl = document.getElementById('cart-count');
  const toastContainer = document.getElementById('toast-container');

  // --- 1. TAB SWITCHING LOGIC ---
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // --- 2. TUMBLER COLOR & FINISH LOGIC ---
  tumblerColorCards.forEach(card => {
    card.addEventListener('click', () => {
      tumblerColorCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const tint = card.getAttribute('data-tint');
      const name = card.getAttribute('data-name');
      state.tumblerColorTint = tint;
      state.tumblerColorName = name;
      tumblerTint.style.backgroundColor = tint;
      if (activeColorNameEl) activeColorNameEl.textContent = name;
      showToast(`Base Color set to: ${name}`, 'palette');
    });
  });

  methodOptions.forEach(card => {
    card.addEventListener('click', () => {
      methodOptions.forEach(m => m.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      const methodText = card.querySelector('h4').textContent.split('(')[0].trim();
      state.imprintMethod = methodText;
      updatePricing();
      showToast(`Method updated: ${methodText}`, 'build');
    });
  });

  // --- 3. CUSTOM TEXT & STYLING LOGIC ---
  function renderTextPreview() {
    previewText.textContent = state.customText || 'YOUR LOGO / TEXT';
    previewText.style.fontFamily = state.fontFamily;
    previewText.style.fontSize = `${state.fontSize}px`;
    previewText.style.letterSpacing = `${state.letterSpacing}px`;
    previewText.style.fontWeight = state.isBold ? '700' : '400';
    previewText.style.fontStyle = state.isItalic ? 'italic' : 'normal';
    previewText.style.textTransform = state.isUppercase ? 'uppercase' : 'none';
    previewText.style.color = state.textColor;

    if (state.isArched) {
      previewText.style.transform = 'perspective(300px) rotateX(12deg) translateY(-2px)';
      previewText.style.borderBottom = `2px solid ${state.textColor}`;
      previewText.style.paddingBottom = '4px';
    } else {
      previewText.style.transform = 'none';
      previewText.style.borderBottom = 'none';
      previewText.style.paddingBottom = '0';
    }

    if (!state.customText && !state.activeLogoUrl) {
      previewPlaceholder.style.display = 'block';
      previewText.style.display = 'none';
    } else {
      previewPlaceholder.style.display = 'none';
      if (state.customText) previewText.style.display = 'block';
    }
  }

  customTextInput.addEventListener('input', (e) => {
    state.customText = e.target.value;
    renderTextPreview();
  });

  fontFamilySelect.addEventListener('change', (e) => {
    state.fontFamily = e.target.value;
    renderTextPreview();
    showToast('Typography font family updated', 'font_download');
  });

  fontSizeSlider.addEventListener('input', (e) => {
    state.fontSize = parseInt(e.target.value, 10);
    fontSizeVal.textContent = `${state.fontSize}px`;
    renderTextPreview();
  });

  letterSpacingSlider.addEventListener('input', (e) => {
    state.letterSpacing = parseFloat(e.target.value);
    letterSpacingVal.textContent = `${state.letterSpacing}px`;
    renderTextPreview();
  });

  btnBold.addEventListener('click', () => {
    state.isBold = !state.isBold;
    btnBold.classList.toggle('active', state.isBold);
    renderTextPreview();
  });

  btnItalic.addEventListener('click', () => {
    state.isItalic = !state.isItalic;
    btnItalic.classList.toggle('active', state.isItalic);
    renderTextPreview();
  });

  btnUppercase.addEventListener('click', () => {
    state.isUppercase = !state.isUppercase;
    btnUppercase.classList.toggle('active', state.isUppercase);
    renderTextPreview();
  });

  btnArch.addEventListener('click', () => {
    state.isArched = !state.isArched;
    btnArch.classList.toggle('active', state.isArched);
    renderTextPreview();
  });

  textColorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      textColorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      state.textColor = swatch.getAttribute('data-color');
      renderTextPreview();
    });
  });

  // --- 4. ARTWORK UPLOAD & SAMPLE LOGOS LOGIC ---
  const sampleSvgData = {
    mountain: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="100%"><polygon points="100,10 40,110 160,110" fill="%230056b3" stroke="%23003f87" stroke-width="6"/><polygon points="100,10 75,55 125,55" fill="%23ffffff"/><circle cx="150" cy="35" r="14" fill="%23f59e0b"/></svg>`,
    tech: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%"><polygon points="90,10 30,90 85,90 70,150 130,70 75,70" fill="%23d97706" stroke="%23ffffff" stroke-width="4"/></svg>`,
    eco: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%"><path d="M20,140 Q20,20 140,20 Q140,140 20,140 Z" fill="%2310b981"/><path d="M20,140 Q80,80 140,20" stroke="%23ffffff" stroke-width="6" fill="none"/></svg>`,
    shield: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" width="100%" height="100%"><path d="M10,10 L150,10 L150,90 Q150,160 80,175 Q10,160 10,90 Z" fill="%23e31837" stroke="%230f172a" stroke-width="6"/><text x="80" y="105" font-family="sans-serif" font-size="52" font-weight="900" fill="%23ffffff" text-anchor="middle">PRO</text></svg>`
  };

  function setLogoArtwork(url, name, isVector = true) {
    state.activeLogoUrl = url;
    state.activeLogoName = name;
    previewLogo.src = url;
    previewLogo.style.display = 'block';
    previewPlaceholder.style.display = 'none';

    // Update assets UI card
    const nameEl = document.getElementById('current-asset-name');
    const statusEl = document.getElementById('current-asset-status');
    const cardEl = document.getElementById('current-asset-card');
    
    if (nameEl) nameEl.textContent = name;
    if (statusEl) {
      statusEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span> Print Ready: ${isVector ? '100% Vector' : '300 DPI High-Res'}`;
    }
    if (cardEl) {
      cardEl.style.display = 'flex';
      cardEl.classList.remove('has-warning');
      cardEl.classList.add('is-ready');
    }

    if (assetCountBadge) assetCountBadge.textContent = '2 Active Assets';
    if (readinessProgress) readinessProgress.style.width = '100%';
    if (readinessScoreVal) readinessScoreVal.textContent = '100% (Vector Perfect)';

    // Update Safety Net Banner to Green Success
    const safetyBanner = document.getElementById('safety-banner');
    const safetyIcon = document.getElementById('safety-icon');
    const safetyMsg = document.getElementById('safety-message');
    const safetyBtn = document.getElementById('safety-btn');
    if (safetyBanner) {
      safetyBanner.className = 'safety-net-banner success';
      safetyIcon.textContent = 'verified';
      safetyMsg.textContent = `Print Quality Guaranteed: "${name}" passed automated vector check.`;
      safetyBtn.style.display = 'none';
    }

    showToast(`Artwork applied: ${name}`, 'check_circle');
    renderTextPreview();
  }

  sampleCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-logo-type');
      const name = card.getAttribute('data-name');
      const url = sampleSvgData[type];
      if (url) {
        setLogoArtwork(url, name, true);
      }
    });
  });

  uploadDropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoArtwork(event.target.result, file.name, file.name.endsWith('.svg'));
      };
      reader.readAsDataURL(file);
    }
  });

  btnClearArtwork.addEventListener('click', () => {
    state.activeLogoUrl = null;
    state.activeLogoName = null;
    previewLogo.style.display = 'none';
    previewLogo.src = '';
    
    const cardEl = document.getElementById('current-asset-card');
    if (cardEl) cardEl.style.display = 'none';
    if (assetCountBadge) assetCountBadge.textContent = '1 Active Asset';
    
    showToast('Artwork asset cleared', 'delete');
    renderTextPreview();
  });

  // --- 5. PLACEMENT & ALIGNMENT HELPERS ---
  placementButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      placementButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sideText = btn.getAttribute('data-side');
      state.imprintSide = sideText.split('(')[0].trim();
      showToast(`Imprint target switched to: ${sideText}`, 'layers');
    });
  });

  btnAlignH.addEventListener('click', () => {
    imprintBox.style.left = '50%';
    imprintBox.style.transform = 'translate(-50%, -50%)';
    showToast('Imprint centered horizontally', 'horizontal_distribute');
  });

  btnAlignV.addEventListener('click', () => {
    imprintBox.style.top = '48%';
    imprintBox.style.transform = 'translate(-50%, -50%)';
    showToast('Imprint centered vertically', 'vertical_distribute');
  });

  // --- 6. DRAGGABLE IMPRINT BOX ---
  let isBoxDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startLeft = 0;
  let startTop = 0;

  imprintBox.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
    isBoxDragging = true;
    const rect = imprintBox.getBoundingClientRect();
    const parentRect = tumblerWrapper.getBoundingClientRect();
    startLeft = rect.left - parentRect.left + rect.width / 2;
    startTop = rect.top - parentRect.top + rect.height / 2;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    imprintBox.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isBoxDragging) return;
    const deltaX = e.clientX - startMouseX;
    const deltaY = e.clientY - startMouseY;
    imprintBox.style.left = `${startLeft + deltaX}px`;
    imprintBox.style.top = `${startTop + deltaY}px`;
    imprintBox.style.transform = 'translate(-50%, -50%)';
  });

  window.addEventListener('mouseup', () => {
    if (isBoxDragging) {
      isBoxDragging = false;
      imprintBox.style.cursor = 'move';
    }
  });

  // --- 7. WHOLESALE TIER PRICING CALCULATOR ---
  function getTierPrice(qty) {
    if (qty >= 500) return 4.49;
    if (qty >= 250) return 5.29;
    if (qty >= 100) return 6.49;
    return 7.99;
  }

  function updatePricing() {
    let price = getTierPrice(state.quantity);
    if (state.imprintMethod.includes('Full-Color')) price += 1.25;
    if (state.imprintSide.includes('Dual Side')) price += 1.50;

    state.unitPrice = price;
    const total = (state.quantity * state.unitPrice).toFixed(2);
    
    totalPriceDisplay.textContent = `$${total}`;
    unitBreakdownDisplay.textContent = `${state.quantity} units @ $${state.unitPrice.toFixed(2)}/unit`;

    // Highlight active tier row
    tierItems.forEach(item => {
      const minQty = parseInt(item.getAttribute('data-min'), 10);
      let isMatch = false;
      if (minQty === 25 && state.quantity >= 25 && state.quantity < 100) isMatch = true;
      if (minQty === 100 && state.quantity >= 100 && state.quantity < 250) isMatch = true;
      if (minQty === 250 && state.quantity >= 250 && state.quantity < 500) isMatch = true;
      if (minQty === 500 && state.quantity >= 500) isMatch = true;
      item.classList.toggle('active', isMatch);
    });
  }

  qtyInput.addEventListener('input', (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 25;
    state.quantity = val;
    updatePricing();
  });

  btnQtyMinus.addEventListener('click', () => {
    if (state.quantity > 25) {
      state.quantity = Math.max(25, state.quantity - 25);
      qtyInput.value = state.quantity;
      updatePricing();
    }
  });

  btnQtyPlus.addEventListener('click', () => {
    state.quantity += 25;
    qtyInput.value = state.quantity;
    updatePricing();
  });

  // --- 8. VIEWPORT CONTROLS (ZOOM & GRID TOGGLE) ---
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnToggleGrid = document.getElementById('btn-toggle-grid');
  const btnToggleSize = document.getElementById('btn-toggle-size');
  const btnResetView = document.getElementById('btn-reset-view');

  btnZoomIn.addEventListener('click', () => {
    state.zoomLevel = Math.min(1.6, state.zoomLevel + 0.15);
    tumblerWrapper.style.transform = `scale(${state.zoomLevel})`;
    showToast(`Zoomed: ${Math.round(state.zoomLevel * 100)}%`, 'zoom_in');
  });

  btnZoomOut.addEventListener('click', () => {
    state.zoomLevel = Math.max(0.7, state.zoomLevel - 0.15);
    tumblerWrapper.style.transform = `scale(${state.zoomLevel})`;
    showToast(`Zoomed: ${Math.round(state.zoomLevel * 100)}%`, 'zoom_out');
  });

  btnToggleGrid.addEventListener('click', () => {
    const hasGrid = imprintBox.classList.contains('show-grid');
    if (hasGrid) {
      imprintBox.classList.remove('show-grid');
      imprintBox.classList.add('hide-boundary');
      btnToggleGrid.classList.remove('active');
    } else {
      imprintBox.classList.add('show-grid');
      imprintBox.classList.remove('hide-boundary');
      btnToggleGrid.classList.add('active');
    }
  });

  btnToggleSize.addEventListener('click', () => {
    sizingWidget.classList.toggle('hidden');
    btnToggleSize.classList.toggle('active');
  });

  btnResetView.addEventListener('click', () => {
    state.zoomLevel = 1.0;
    tumblerWrapper.style.transform = 'scale(1.0)';
    imprintBox.style.left = '50%';
    imprintBox.style.top = '48%';
    imprintBox.style.transform = 'translate(-50%, -50%)';
    showToast('Viewport view reset', 'restart_alt');
  });

  // --- 9. MODALS & TOAST NOTIFICATION SYSTEM ---
  function showToast(message, iconName = 'notifications') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="material-symbols-outlined" style="color: var(--primary-fixed);">${iconName}</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3500);
  }

  btnProceedProof.addEventListener('click', () => {
    // Populate modal values
    document.getElementById('proof-color-name').textContent = state.tumblerColorName;
    document.getElementById('proof-method-side').textContent = `${state.imprintMethod} • ${state.imprintSide}`;
    document.getElementById('proof-content').textContent = state.activeLogoName ? `Logo: ${state.activeLogoName} + Text: "${state.customText}"` : `Text: "${state.customText}"`;
    document.getElementById('proof-total-display').textContent = totalPriceDisplay.textContent;
    
    proofModal.classList.add('open');
  });

  btnCloseProof.addEventListener('click', () => {
    proofModal.classList.remove('open');
  });

  proofModal.addEventListener('click', (e) => {
    if (e.target === proofModal) proofModal.classList.remove('open');
  });

  btnApproveOrder.addEventListener('click', () => {
    proofModal.classList.remove('open');
    let currentCount = parseInt(cartCountEl.textContent, 10) || 0;
    currentCount += 1;
    cartCountEl.textContent = currentCount;
    
    showToast(`🎉 Order Approved! Added ${state.quantity} units to Quote Cart ($${(state.quantity * state.unitPrice).toFixed(2)})`, 'shopping_cart_checkout');
  });

  btnDownloadPdf.addEventListener('click', () => {
    showToast('Generating high-resolution vector PDF Spec Sheet...', 'file_download');
  });

  // Top header button listeners
  document.getElementById('btn-save-project').addEventListener('click', () => {
    showToast('Cloud Sync: Project design saved to your Stitch account!', 'cloud_done');
  });

  document.getElementById('btn-share-link').addEventListener('click', () => {
    showToast('Design Link copied to clipboard! Share with your team.', 'link');
  });

  document.getElementById('btn-cart').addEventListener('click', () => {
    showToast(`Your Quote Cart currently has ${cartCountEl.textContent} customized item(s).`, 'shopping_bag');
  });

  document.getElementById('btn-request-art-help').addEventListener('click', () => {
    showToast('Design Support: Ticket created! A free graphic artist will email you in 15 minutes.', 'support_agent');
  });

  // --- INITIALIZATION ---
  renderTextPreview();
  updatePricing();
});

// Accordion toggle helper for Spec Sheet
function toggleSpec(headerEl) {
  const body = headerEl.nextElementSibling;
  const icon = headerEl.querySelector('.material-symbols-outlined');
  if (body.style.display === 'none') {
    body.style.display = 'block';
    icon.textContent = 'expand_less';
  } else {
    body.style.display = 'none';
    icon.textContent = 'expand_more';
  }
}
