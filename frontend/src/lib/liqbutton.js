class SDK_Button extends HTMLElement {
	static formAssociated = true;
	static get observedAttributes() {
		return ['label', 'color', 'background', 'text-transform'];
	}

	_id = '';

	get id() {
		return this._id;
	}
	set id(value) {
		this._id = value;
	}

	_label = '';
	get label() {
		return this._label;
	}
	set label(value) {
		this._label = value;
	}

	_color = '#fff';
	get color() {
		return this._color;
	}
	set color(value) {
		this._color = value;
	}

	_background = '#77CC5D';
	get background() {
		return this._background;
	}
	set background(value) {
		this._background = value;
	}

	_textTransform = 'uppercase';
	get textTransform() {
		return this._textTransform;
	}
	set textTransform(value) {
		this._textTransform = value;
	}

	constructor() {
		super();


		this.id = new Date().getTime();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[name] = newValue;
		}
	}


	connectedCallback() {
		this.render();

		this.$button = this._shadowRoot.getElementById(this.id);
	}


	render() {
		const template = document.createElement('template');

		console.log('label => ', this.label);

		template.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .sdk {
                    background: ${this.color};
                    cursor: pointer;
                    border: none !important;
                    display: inline-block !important;
                    text-align: center !important;
                    padding: 5px 24px !important;
                    color: ${this.color};
                    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
                    font-size: 16px !important;
                    line-height: 1.75 !important;
                    font-weight: 600 !important;
                    font-family: 'Open Sans', sans-serif;
                    cursor: pointer !important;
                    border-radius: 8px !important;
                    background: ${this.background} !important;
                }
            </style>
            <button class="sdk" onmouseover="this.style.opacity='0.8';" onmouseout="this.style.opacity='1';">
                <img src="https://static.liqpay.ua/buttons/logo-white.svg" name="btn_text"
                style="vertical-align: middle !important;"/>
                <span style="vertical-align:middle; !important; margin-left: 8px !important; text-transform: ${this.textTransform};">${this.label}</span>
            </button>
        `;

		this._shadowRoot.appendChild(template.content.cloneNode(true));
	}
}


const ready = () => {
	const link = document.createElement('link');

	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic');

	document.head.appendChild(link);

	window.customElements.define('sdk-button', SDK_Button);

	document.removeEventListener('DOMContentLoaded', ready);
};

document.addEventListener('DOMContentLoaded', ready);