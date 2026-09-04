Tooltip 1

```html
<!-- Tooltip 1 -->
<div class="item-hints">
  <div class="hint" data-position="4">
    <span class="hint-radius"></span>
    <span class="hint-dot">Tip</span>
    <div class="hint-content do--split-children">
      <p>Use Navbar to navigate the website quickly and easily.</p>
    </div>
  </div>
</div>
```

```css
/* Tooltip 1 */
.item-hints {
  --purple: #720c8f;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  padding-right: 170px;
}
.item-hints .hint {
  margin: 150px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-hints .hint-dot {
  z-index: 3;
  border: 1px solid #ffe4e4;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  -webkit-transform: translate(-0%, -0%) scale(0.95);
  transform: translate(-0%, -0%) scale(0.95);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.item-hints .hint-radius {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -125px 0 0 -125px;
  opacity: 0;
  visibility: hidden;
  -webkit-transform: scale(0);
  transform: scale(0);
}
.item-hints .hint[data-position="1"] .hint-content {
  top: 85px;
  left: 50%;
  margin-left: 56px;
}
.item-hints .hint-content {
  width: 300px;
  position: absolute;
  z-index: 5;
  padding: 35px 0;
  opacity: 0;
  transition:
    opacity 0.7s ease,
    visibility 0.7s ease;
  color: #fff;
  visibility: hidden;
  pointer-events: none;
}
.item-hints .hint:hover .hint-content {
  position: absolute;
  z-index: 5;
  padding: 35px 0;
  opacity: 1;
  -webkit-transition:
    opacity 0.7s ease,
    visibility 0.7s ease;
  transition:
    opacity 0.7s ease,
    visibility 0.7s ease;
  color: #fff;
  visibility: visible;
  pointer-events: none;
}
.item-hints .hint-content::before {
  width: 0px;
  bottom: 29px;
  left: 0;
  content: "";
  background-color: #fff;
  height: 1px;
  position: absolute;
  transition: width 0.4s;
}
.item-hints .hint:hover .hint-content::before {
  width: 180px;
  transition: width 0.4s;
}
.item-hints .hint-content::after {
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transform: rotate(-225deg);
  transform: rotate(-225deg);
  bottom: 29px;
  left: 0;
  width: 80px;
  content: "";
  background-color: #fff;
  height: 1px;
  position: absolute;
  opacity: 1;
  -webkit-transition: opacity 0.5s ease;
  transition: opacity 0.5s ease;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}
.item-hints .hint:hover .hint-content::after {
  opacity: 1;
  visibility: visible;
}
.item-hints .hint[data-position="4"] .hint-content {
  bottom: 85px;
  left: 50%;
  margin-left: 56px;
}
```

Tooltip 2

```html
<!-- Tooltip 2 -->
<div class="tooltip-container">
  <div class="trigger-wrapper">
    <svg class="branch-path-svg" viewBox="0 0 300 60">
      <path
        class="branch-line line-left"
        d="M150,0 C150,25 60,25 60,60"
        fill="none"
        stroke="#a371f7"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        class="branch-line line-right"
        d="M150,0 C150,25 240,25 240,60"
        fill="none"
        stroke="#238636"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <circle
        cx="60"
        cy="60"
        r="3"
        class="branch-dot dot-left"
        fill="#a371f7"
      ></circle>
      <circle
        cx="240"
        cy="60"
        r="3"
        class="branch-dot dot-right"
        fill="#238636"
      ></circle>
    </svg>

    <button class="merge-btn">Review Code</button>
  </div>

  <div class="tooltips-wrapper">
    <div class="tooltip-content" style="border-left: 2px solid #a371f7;">
      <div class="tooltip-header" style="color: #a371f7;">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
        </svg>
        <span>Changes Requested</span>
      </div>
      <div class="tooltip-info">2 comments unresolved</div>
    </div>

    <div class="tooltip-content" style="border-left: 2px solid #238636;">
      <div class="tooltip-header" style="color: #238636;">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
          ></path>
        </svg>
        <span>Checks Passed</span>
      </div>
      <div class="tooltip-info">CI Reference #9082</div>
    </div>
  </div>
</div>
```

```css
/* From Uiverse.io by Esca-Byte */
.tooltip-container,
.tooltip-container * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.tooltip-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Fira Code", monospace;
  color: #c9d1d9;
  padding-bottom: 50px;
  margin: 100px auto;
  z-index: 1;
  pointer-events: none;
}

.trigger-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  pointer-events: auto;
}

.merge-btn {
  background: #161b22;
  border: 1px solid #30363d;
  color: #58a6ff;
  padding: 14px 40px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.merge-btn:hover {
  background: #21262d;
  border-color: #8b949e;
  color: #ffffff;
}

.branch-path-svg {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 300px;
  height: 60px;
  transform: translateX(-50%);
  z-index: -1;
  pointer-events: none;
  overflow: visible;
}

.branch-line {
  fill: none;
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  transition: stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
}

.line-left {
  stroke: #a371f7 !important;
}

.line-right {
  stroke: #238636 !important;
}

.tooltips-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 60px;
  width: 100%;
  pointer-events: auto;
}

.tooltip-content {
  background: #161b22;
  border: 1px solid #30363d;
  padding: 12px 16px;
  border-radius: 6px;
  color: #c9d1d9;
  font-size: 0.85rem;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 20;
  min-width: 180px;
  opacity: 0;
  transform: translateY(-10px);
  clip-path: inset(0 0 100% 0);
  transition:
    opacity 0.3s ease 0.3s,
    transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s,
    clip-path 0.4s ease 0.3s;
}

.tooltip-header {
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tooltip-info {
  color: #8b949e;
  font-size: 0.75rem;
}

.branch-dot {
  opacity: 0;
  transition: opacity 0.2s ease 0.4s;
}

.dot-left {
  fill: #a371f7;
}

.dot-right {
  fill: #238636;
}
.trigger-wrapper:hover .branch-line {
  stroke-dashoffset: 0;
}

.tooltip-container:hover .branch-line {
  stroke-dashoffset: 0;
}

.tooltip-container:hover .tooltip-content {
  opacity: 1;
  transform: translateY(0);
  clip-path: inset(0 0 0 0);
}

.tooltip-container:hover .branch-dot {
  opacity: 1;
}
```
