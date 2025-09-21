// docs/js/zoom.js
// Load medium-zoom from CDN dynamically
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/medium-zoom@1/dist/medium-zoom.min.js';
script.onload = () => {
    mediumZoom('img');
};
document.head.appendChild(script);
