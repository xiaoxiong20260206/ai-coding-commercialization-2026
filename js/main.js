/**
 * AI Coding Analysis - Main JavaScript
 * Handles tooltip positioning and interactions
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initTooltips();
        initScrollEffects();
    }

    /**
     * Initialize tooltip positioning
     */
    function initTooltips() {
        const tooltips = document.querySelectorAll('.has-tip');
        
        tooltips.forEach(el => {
            const tip = el.querySelector('.tip-box');
            if (!tip) return;
            
            el.addEventListener('mouseenter', () => positionTooltip(el, tip));
        });
    }

    /**
     * Position tooltip based on viewport
     */
    function positionTooltip(trigger, tooltip) {
        const rect = trigger.getBoundingClientRect();
        const tipWidth = 360;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate horizontal position (centered)
        let left = rect.left + rect.width / 2 - tipWidth / 2;
        
        // Keep within viewport
        if (left < 10) left = 10;
        if (left + tipWidth > viewportWidth - 10) {
            left = viewportWidth - tipWidth - 10;
        }
        
        tooltip.style.left = left + 'px';
        
        // Position above or below based on available space
        if (rect.top > 420) {
            // Show above
            tooltip.style.bottom = (viewportHeight - rect.top + 10) + 'px';
            tooltip.style.top = 'auto';
        } else {
            // Show below
            tooltip.style.top = (rect.bottom + 10) + 'px';
            tooltip.style.bottom = 'auto';
        }
    }

    /**
     * Initialize scroll-based effects
     */
    function initScrollEffects() {
        const sections = document.querySelectorAll('.section, .stat-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

})();
