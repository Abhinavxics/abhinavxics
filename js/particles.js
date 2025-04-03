document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('hero');
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicking elements below
    
    // Insert canvas as the first child of hero section
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    };
    
    // Call initially and on window resize
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Particle settings
    const particleCount = 100;
    const particles = [];
    
    // Color palette based on the theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    const colors = isDarkMode 
        ? ['#1890FF', '#40A9FF', '#69C0FF', '#91D5FF', '#E6F7FF'] 
        : ['#1890FF', '#40A9FF', '#69C0FF', '#91D5FF', '#BAE7FF'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    // Animation function
    function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Boundary check with wrapping
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
        }
        
        // Connect particles with lines if they're close enough
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    // Draw line with opacity based on distance
                    const opacity = 1 - (distance / 100);
                    ctx.strokeStyle = isDarkMode ? `rgba(24, 144, 255, ${opacity * 0.3})` : `rgba(24, 144, 255, ${opacity * 0.3})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Call animation again on next frame
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Update colors when theme changes
    document.addEventListener('themeChanged', function(e) {
        const isDark = e.detail.isDark;
        
        particles.forEach(p => {
            p.color = isDark 
                ? ['#1890FF', '#40A9FF', '#69C0FF', '#91D5FF', '#E6F7FF'][Math.floor(Math.random() * 5)]
                : ['#1890FF', '#40A9FF', '#69C0FF', '#91D5FF', '#BAE7FF'][Math.floor(Math.random() * 5)];
        });
    });
});