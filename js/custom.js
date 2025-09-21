// Add Foodhub branding to page title
document.addEventListener('DOMContentLoaded', function() {
    // Add foodhub badge to h1 elements
    const mainTitle = document.querySelector('h1');
    if (mainTitle && !mainTitle.querySelector('.foodhub-badge')) {
        const badge = document.createElement('span');
        badge.className = 'foodhub-badge';
        badge.textContent = '';
        mainTitle.appendChild(badge);
    }
    
    // Add custom logo click behavior
    const logo = document.querySelector('.md-header__button.md-logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Create print button
    function addPrintButton() {
        // Check if we're on a content page (not home page)
        const contentContainer = document.querySelector('.md-content');
        if (!contentContainer) return;
        
        // Create print button
        const printButton = document.createElement('button');
        printButton.innerHTML = '🖨️ Print Page';
        printButton.className = 'print-button';
        printButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--md-primary-fg-color);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        
        printButton.onmouseover = function() {
            this.style.background = 'var(--md-primary-fg-color--dark)';
            this.style.transform = 'scale(1.05)';
        };
        
        printButton.onmouseout = function() {
            this.style.background = 'var(--md-primary-fg-color)';
            this.style.transform = 'scale(1)';
        };
        
        printButton.onclick = function() {
            window.print();
        };
        
        document.body.appendChild(printButton);
    }
    
    addPrintButton();
});
