// @ts-check

import {country, isHCountry} from './locales.js';
import {
    createHTMLElement as html,
    $,
} from './utils.js';
import {clicker} from './stats.js';

const safariURL = 'https://apps.apple.com/us/app/dark-reader-for-safari/id1438243180?platform=iphone';
// const isEdge = navigator.userAgent.includes('Edg');
const isMobile = navigator.userAgent.includes('Mobile');
const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrom');

const htmlText = `
<section class="container">
    <div class="phone">
        <div class="screen">
            <div class="notch"></div>
            <div class="top">
                <span class="darkreader">Dark Reader</span>
                <span class="mobile">for iOS</span>
            </div>
            <div class="text js-text">
                Take care of your eyes when browsing your phone
            </div>
            <div class="badge-wrapper">
                <a class="badge-link" href="${safariURL}" target="_blank" rel="noopener" data-s="drios-top-short">
                    <img src="/images/app-store-badge.svg">
                </a>
            </div>
        </div>
    </div>
</section>`;

const cssText = `
:host {
    --bezel: 0.125rem;
    --color-bezel: var(--color-control, #316d7c);
}
.phone {
    background-color: black;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    border-left: var(--bezel) solid var(--color-bezel);
    border-right: var(--bezel) solid var(--color-bezel);
    border-top: var(--bezel) solid var(--color-bezel);
    height: 12rem;
    margin-top: 1rem;
    position: relative;
    width: 16rem;
}
.phone::after {
    background-image: linear-gradient(to top, var(--color-bg), #141e2400);
    bottom: 0;
    content: "";
    display: block;
    height: 2rem;
    left: calc(-1 * var(--bezel));
    position: absolute;
    width: calc(16rem + 2 * var(--bezel));
}
.screen {
    align-items: center;
    background-image: linear-gradient(to bottom, #182832, var(--color-bg));
    border-top-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 11.5rem;
    justify-content: flex-start;
    margin: 0.5rem auto 0 auto;
    padding: 2rem 1rem 0 1rem;
    position: relative;
    width: 15rem;
}
.notch {
    background-color: black;
    border-radius: 0.375rem;
    height: 0.75rem;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 0.5rem;
    width: 4rem;
}
.top {
    font-size: 1.2rem;
}
.top .darkreader {
    color: var(--color-highlight);
    font-weight: bold;
    -webkit-text-stroke: 0.0625rem;
    text-transform: uppercase;
}
.text {
    margin-top: 0.25rem;
    text-align: center;
}
.badge-wrapper {
    margin: 0;
}
.badge-link {
    border-radius: 0.675rem;
    box-shadow: 0 0 0 0.0625rem hsla(0, 0%, 100%, 0), 0 0 0 var(--color-text);
    display: inline-flex;
    position: relative;
    top: 1rem;
    width: 11rem;
    z-index: 1;
}
.badge-link img {
    display: inline-block;
    width: 100%;
}
.badge-link:hover {
    box-shadow: 0 0 0 0.0625rem hsla(0, 0%, 100%, 1), 0 0 0.75rem var(--color-text);
}
`;

class MobileTopShortElement extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});

        if (isSafari || isMobile) {
            return;
        }

        const style = html('style', {}, cssText);
        shadowRoot.append(style);
        style.insertAdjacentHTML('afterend', htmlText);

        $(shadowRoot).find('[data-s]').each((node) => clicker(node, node.getAttribute('data-s') ?? ''));

        if (document.documentElement.lang === 'zh-CN') {
            shadowRoot.querySelectorAll('.js-text').forEach((node) => node.textContent = '浏览手机时注意保护眼睛');
        }
    }
}

customElements.define('darkreader-mobile-top-short', MobileTopShortElement);
