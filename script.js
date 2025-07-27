// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = document.getElementById('closeBtn');
    const videoCards = document.querySelectorAll('.video-card');
    
    // Automatically setup GIF previews for all video cards
    function setupGifPreviews() {
        videoCards.forEach(function(card) {
            const videoId = card.getAttribute('data-video');
            const thumbnail = card.querySelector('.video-thumbnail');
            
            if (!videoId || !thumbnail) return;
            
            // Check if already setup
            if (thumbnail.querySelector('.gif-preview')) return;
            
            // Get the existing thumbnail image
            const staticImg = thumbnail.querySelector('img');
            if (staticImg) {
                staticImg.classList.add('thumbnail-static');
            }
            
            // Create GIF preview container
            const gifPreview = document.createElement('div');
            gifPreview.classList.add('gif-preview');
            
            // Create 4 frame images with different timestamps
            for (let i = 0; i < 4; i++) {
                const frameImg = document.createElement('img');
                frameImg.src = `https://drive.google.com/thumbnail?id=${videoId}&sz=w640-h360&t=${i}s`;
                frameImg.classList.add('gif-frame', `frame-${i + 1}`);
                frameImg.alt = `Frame ${i + 1}`;
                gifPreview.appendChild(frameImg);
            }
            
            // Add to thumbnail container
            thumbnail.appendChild(gifPreview);
        });
    }
    
    // Setup GIF previews
    setupGifPreviews();
    
    // Add click event to each video card
    videoCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const videoId = card.getAttribute('data-video');
            
            // SOLUTION 1: Use embed URL that hides download options
            const videoUrl = 'https://drive.google.com/file/d/' + videoId + '/preview?usp=embed&chrome=false';
            videoFrame.src = videoUrl;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal function
    function closeModal() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        }
        
        modal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    }
    
    // Close button click
    closeBtn.addEventListener('click', closeModal);
    
    // Click outside modal to close
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // SOLUTION 2: Disable right-click on video frame to prevent "Save video as"
    videoFrame.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        return false;
    });
    
    // SOLUTION 3: Disable common keyboard shortcuts for downloading
    videoFrame.addEventListener('keydown', function(event) {
        // Prevent Ctrl+S (Save), Ctrl+Shift+S (Save As), etc.
        if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
            event.preventDefault();
            return false;
        }
    });
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
});
