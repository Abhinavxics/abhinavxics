document.addEventListener('DOMContentLoaded', function() {
    // Function to detect mobile devices
    function isMobile() {
        return window.innerWidth < 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Add appropriate classes for mobile devices
    if (isMobile()) {
        document.body.classList.add('mobile-device');
        
        // Find the hero image container and add the mobile hide class
        const heroImageContainer = document.querySelector('.md\\:w-1\\/2.flex.justify-center');
        if (heroImageContainer) {
            heroImageContainer.classList.add('hide-on-mobile');
        }
    }
    
    // Support for existing Android-specific code
    if (/Android/i.test(navigator.userAgent)) {
        document.body.classList.add('android-device');
    }
});
