import Iconify from '@iconify/iconify'

export class IconifyIcon extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['icon', 'inline', 'icon-class']
  }

  connectedCallback(): void {
    this.update()
  }

  attributeChangedCallback(): void {
    this.update()
  }

  update(): void {
    const svg = Iconify.renderSVG(this.icon, {inline: this.inline})
    if (svg) {
      for (const iconClass of this.iconClasses) {
        svg.classList.add(iconClass)
      }
      this.textContent = ''
      this.setAttribute('data-render', 'svg')
      this.append(svg)
    } else {
      const span = document.createElement('span')
      span.className = 'iconify'
      for (const iconClass of this.iconClasses) {
        span.classList.add(iconClass)
      }
      span.setAttribute('data-icon', this.icon)
      span.setAttribute('data-inline', this.inline.toString())
      this.textContent = ''
      this.setAttribute('data-render', 'api')
      this.append(span)
    }
  }

  get icon(): string {
    const icon = this.getAttribute('icon')
    if (!icon) {
      throw new Error('required icon')
    }
    return icon
  }

  set icon(newValue) {
    this.setAttribute('icon', newValue)
  }

  get inline(): boolean {
    return this.hasAttribute('inline')
  }

  set inline(newValue) {
    if (newValue) {
      this.setAttribute('inline', '')
    } else {
      this.removeAttribute('inline')
    }
  }

  get iconClasses(): readonly string[] {
    const iconClass = this.getAttribute('icon-class')
    if (!iconClass) return []

    return iconClass.split(' ')
  }
}

declare global {
  interface Window {
    IconifyIcon: typeof IconifyIcon
  }
}

if (!window.customElements.get('iconify-icon')) {
  window.IconifyIcon = IconifyIcon
  window.customElements.define('iconify-icon', IconifyIcon)
}
