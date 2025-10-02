"use strict";

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MOCK APP DATA
    // In a real application, this would come from an API.
    // ==========================================================================
    const appData = [
        {
            id: 1,
            name: "Musica",
            version: "1.9.9",
            category: "entertainment",
            rating: 4.8,
            downloads: 2300000,
            icon: "./assets/images/musica.png",
            isNew: true,
            isUpdated: false,
            description: "Musica is a sleek, powerful, and easy-to-use music player designed for music lovers. Whether you're into deep bass, smooth acoustics, or chill vibes, Musica delivers crystal-clear audio and a personalized experience like no other.",
            screenshots: ["./Apps/Musica/Images/V1.9.9/previewed/image1.png", "./Apps/Musica/Images/V1.9.9/previewed/image2.png", "./Apps/Musica/Images/V1.9.9/previewed/image3.png", "./Apps/Musica/Images/V1.9.9/previewed/image4.png", "./Apps/Musica/Images/V1.9.9/previewed/image5.png"],
            versionHistory: [{ version: "1.1.0", notes: "Added Playlist." }, { version: "1.8.5", notes: "Device Sync." }],
            devices: ["Phone", "Tablet"],
            downloadLink: "https://drive.google.com/file/d/1ia8rsLdN8Enua4BqJwIRWtahr23kYM-1/view?usp=sharing"
        },
        {
            id: 2,
            name: "Learnix",
            version: "1.1",
            category: "educational",
            rating: 4.5,
            downloads: 1200000,
            icon: "./assets/images/learnix.png",
            isNew: true,
            isUpdated: false,
            description: "A modern learning platform for university students. Get access to interactive notes, community-driven help, and resources to ace your exams.",
            screenshots: ["./Apps/Learnix/Images/V1.1/previewed/image1.jpeg", "./Apps/Learnix/Images/V1.1/previewed/image2.jpeg", "./Apps/Learnix/Images/V1.1/previewed/image3.jpeg", "./Apps/Learnix/Images/V1.1/previewed/image4.jpeg", "./Apps/Learnix/Images/V1.1/previewed/image5.jpeg"],
            versionHistory: [{ version: "1.0", notes: "Newly build." }, { version: "1.1", notes: "Initial release." }],
            devices: ["Phone", "Tablet"],
            downloadLink: "./Apps/Learnix/APKs/V1.1/Learnix_BETA_V1.1.apk"
        },
        {
            id: 3,
            name: "Dark Web",
            version: "0.1.1",
            category: "productivity",
            rating: 4.5,
            downloads: 1000000,
            icon: "./assets/images/darkweb.webp",
            isNew: false,
            isUpdated: true,
            description: "Dark Web Browser is for Android that offers quick and simple access to the Internet. With a perfectly structured interface, you can check out your favorite websites without affecting the performance of your smartphone. All this with maximum privacy and the reliability that makes this tool so popular around the world.",
            screenshots: ["./Apps/DarkWeb/Images/V0.1.1/previewed/image1.png", "./Apps/DarkWeb/Images/V0.1.1/previewed/image2.png", "./Apps/DarkWeb/Images/V0.1.1/previewed/image3.png", "./Apps/DarkWeb/Images/V0.1.1/previewed/image4.png", "./Apps/DarkWeb/Images/V0.1.1/previewed/image5.png"],
            versionHistory: [{ version: "0.0.1", notes: "Newly born." }, { version: "0.1.1", notes: "Initial release." }],
            devices: ["Phone", "Tablet"],
            downloadLink: "./Apps/DarkWeb/APKs/V0.1.2/DarkWeb-v0.1.2.apk"
        },
        {
            id: 4,
            name: "My Portal (UIU)",
            version: "1.5",
            category: "educational",
            rating: 4.5,
            downloads: 1500000,
            icon: "./assets/images/myPortal.webp",
            isNew: false,
            isUpdated: true,
            description: "Embark on a journey of enhanced learning and professional development with the extensive resources of the platform. Perfect your craft by delving into a wealth of coding best practices and cleaner code writing tips. Elevate your expertise with curated recommendations for books that promise to sharpen your coding skills even further.",
            screenshots: ["./Apps/MyPortal/Images/V1.5/previewed/image1.png"],
            versionHistory: [{ version: "0.1", notes: "Newly born." }, { version: "1.5", notes: "Initial release." }],
            devices: ["Phone", "Tablet"],
            downloadLink: "./Apps/MyPortal/APKs/V1.5/myPortal-v1.5.apk"
        },
        {
            id: 5,
            name: "Silent Zone",
            version: "1.2.9",
            category: "productivity",
            rating: 3.5,
            downloads: 1500,
            icon: "./assets/images/myPortal.webp",
            isNew: false,
            isUpdated: true,
            description: "Embark on a journey of enhanced learning and professional development with the extensive resources of the platform. Perfect your craft by delving into a wealth of coding best practices and cleaner code writing tips. Elevate your expertise with curated recommendations for books that promise to sharpen your coding skills even further.",
            screenshots: ["./Apps/MyPortal/Images/V1.5/previewed/image1.png"],
            versionHistory: [{ version: "0.1", notes: "Newly born." }, { version: "1.5", notes: "Initial release." }],
            devices: ["Phone", "Tablet"],
            downloadLink: "./Apps/MyPortal/APKs/V1.5/myPortal-v1.5.apk"
        },
        // ...Add more mock app data as needed
    ];


    // ==========================================================================
    // 2. DOM ELEMENT SELECTION
    // ==========================================================================
    const header = document.querySelector('.main-header');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const appGrid = document.getElementById('app-grid');
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    const viewSwitcher = document.getElementById('view-switcher');

    // Modal Elements
    const appDetailsModal = document.getElementById('app-details-modal');


    // ==========================================================================
    // 3. STATE MANAGEMENT
    // ==========================================================================
    let currentTheme = localStorage.getItem('theme') || 'light';
    let currentView = localStorage.getItem('view') || 'google';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


    // ==========================================================================
    // 4. RENDER & UI FUNCTIONS
    // ==========================================================================

    /**
     * Renders a star rating display based on a score.
     * @param {number} rating - The rating score (e.g., 4.5).
     * @returns {string} HTML string of star icons.
     */
    const renderStars = (rating) => {
        let stars = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
        if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
        
        return stars;
    };

    /**
     * Formats large numbers into a more readable string (e.g., 1.2M).
     * @param {number} num - The number to format.
     * @returns {string} The formatted number string.
     */
    const formatDownloads = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    /**
     * Renders the app cards in the grid.
     * @param {Array} apps - An array of app objects to render.
     */
    const renderApps = (apps) => {
        appGrid.innerHTML = ''; // Clear existing grid
        if (apps.length === 0) {
            appGrid.innerHTML = '<p>No apps found.</p>';
            return;
        }

        apps.forEach(app => {
            const isFavorited = favorites.includes(app.id);
            const appCard = document.createElement('article');
            appCard.className = 'app-card glass-effect';
            appCard.dataset.id = app.id;
            appCard.tabIndex = 0;
            appCard.setAttribute('role', 'button');
            appCard.setAttribute('aria-label', `View details for ${app.name}`);

            appCard.innerHTML = `
                <div class="app-card-main">
                    <img src="${app.icon}" alt="${app.name} icon" class="app-icon" loading="lazy">
                    <div class="app-info">
                        <h3 class="app-name">${app.name}</h3>
                        <p class="app-version">v${app.version}</p>
                        ${app.isNew ? '<span class="badge new-badge">New</span>' : ''}
                        ${app.isUpdated ? '<span class="badge updated-badge">Updated</span>' : ''}
                    </div>
                </div>
                <div class="app-card-footer">
                    <div class="rating" role="img" aria-label="Rating: ${app.rating} out of 5 stars">
                        ${renderStars(app.rating)}
                        <span>${app.rating.toFixed(1)}</span>
                    </div>
                    <div class="app-actions">
                        <button class="btn-download" aria-label="Download ${app.name}">
                            <i class="fas fa-download"></i>
                            <span class="download-count">${formatDownloads(app.downloads)}</span>
                        </button>
                        <button class="btn-favorite ${isFavorited ? 'favorited' : ''}" aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}" data-id="${app.id}">
                            <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                </div>
                <!-- QR Code for QR View -->
                <div class="qr-code-view-content" style="display:none;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(app.downloadLink)}" alt="QR Code for ${app.name}">
                </div>
            `;
            appGrid.appendChild(appCard);
        });
        observeVisibleCards(); // Re-apply observer for newly rendered cards
    };


    // ==========================================================================
    // 5. THEME & VIEW SWITCHING
    // ==========================================================================

    /**
     * Applies the selected theme (dark/light) to the document.
     * @param {string} theme - The theme to apply ('dark' or 'light').
     */
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggleBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    };

    /**
     * Toggles the theme between light and dark.
     */
    const toggleTheme = () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    /**
     * Applies the selected view style to the app grid.
     * @param {string} view - The view style ('google', 'apple', or 'qr').
     */
    const applyView = (view) => {
        appGrid.className = 'app-grid'; // Reset classes
        appGrid.classList.add(`view-${view}`);
        
        // Update button active state
        viewSwitcher.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Toggle visibility of QR code content
        document.querySelectorAll('.qr-code-view-content').forEach(el => {
            el.style.display = view === 'qr' ? 'block' : 'none';
        });

        localStorage.setItem('view', view);
        currentView = view;
    };


    // ==========================================================================
    // 6. FILTERING & SEARCHING
    // ==========================================================================

    /**
     * Filters and searches apps based on current criteria and re-renders the grid.
     */
    const filterAndRender = () => {
        const category = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        let filteredApps = appData;

        // Apply category filter
        if (category !== 'all') {
            if (category === 'new') {
                filteredApps = filteredApps.filter(app => app.isNew || app.isUpdated);
            } else {
                filteredApps = filteredApps.filter(app => app.category === category);
            }
        }

        // Apply search filter
        if (searchTerm) {
            filteredApps = filteredApps.filter(app => 
                app.name.toLowerCase().includes(searchTerm) ||
                app.description.toLowerCase().includes(searchTerm)
            );
        }

        renderApps(filteredApps);
        applyView(currentView); // Re-apply view to new content
    };


    // ==========================================================================
    // 7. MODAL LOGIC
    // ==========================================================================

    /**
     * Opens the app details modal and populates it with data.
     * @param {number} appId - The ID of the app to display.
     */
    const openAppModal = (appId) => {
        const app = appData.find(a => a.id === appId);
        if (!app) return;

        appDetailsModal.querySelector('#modal-title').textContent = app.name;
        appDetailsModal.querySelector('.modal-app-icon').src = app.icon;
        appDetailsModal.querySelector('.modal-app-developer').textContent = `${app.name} Developer`; // Mock developer
        appDetailsModal.querySelector('#modal-app-description').textContent = app.description;

        // Populate screenshots
        const carouselTrack = appDetailsModal.querySelector('.carousel-track');
        carouselTrack.innerHTML = app.screenshots.map(src => `<div class="carousel-item"><img src="${src}" alt="Screenshot of ${app.name}" loading="lazy"></div>`).join('');

        // Populate version history
        const historyList = appDetailsModal.querySelector('#modal-version-history');
        historyList.innerHTML = app.versionHistory.map(h => `<li><strong>v${h.version}:</strong> ${h.notes}</li>`).join('');

        // Populate devices
        const deviceList = appDetailsModal.querySelector('#modal-compatible-devices');
        deviceList.innerHTML = app.devices.map(d => `<li><i class="fas fa-${d.toLowerCase()}"></i> ${d}</li>`).join('');

        // Generate QR Code
        const qrContainer = appDetailsModal.querySelector('#modal-qr-code');
        const qrCodeImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(app.downloadLink)}`;
        qrContainer.innerHTML = `<img src="${qrCodeImgSrc}" alt="QR Code to download ${app.name}" class="qr-code-image">`;

        // Add download functionality to the modal download button
        const modalDownloadBtn = appDetailsModal.querySelector('.btn-modal-download');
        modalDownloadBtn.onclick = () => initiateDownload(app.downloadLink, app.name);

        // Add download functionality to the QR code image
        const qrCodeImage = qrContainer.querySelector('.qr-code-image');
        qrCodeImage.style.cursor = 'pointer'; // Indicate it's clickable
        qrCodeImage.onclick = () => initiateDownload(app.downloadLink, app.name);

        // Set dynamic background for modal close button based on app category
        const modalCloseBtn = appDetailsModal.querySelector('.modal-close-btn');
        // Remove any previous category classes
        modalCloseBtn.classList.remove('close-btn-entertainment', 'close-btn-educational', 'close-btn-productivity');
        // Add new category class
        modalCloseBtn.classList.add(`close-btn-${app.category}`);

        // Directly attach event listeners for closing the modal
        const modalOverlay = appDetailsModal.querySelector('.modal-overlay');
        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        
        appDetailsModal.hidden = false;
        appDetailsModal.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    /**
     * Initiates a file download.
     * @param {string} downloadLink - The URL of the file to download.
     * @param {string} appName - The name of the app for the suggested filename.
     */
    const initiateDownload = (downloadLink, appName) => {
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = `${appName.replace(/\s/g, '_')}_${downloadLink.split('/').pop()}`; // Suggest a filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    /**
     * Closes any open modal.
     */
    const closeModal = () => {
        const openModal = document.querySelector('.modal.is-open');
        if (openModal) {
            openModal.classList.remove('is-open');
            // Remove event listeners to prevent memory leaks and multiple bindings
            const modalCloseBtn = openModal.querySelector('.modal-close-btn');
            const modalOverlay = openModal.querySelector('.modal-overlay');
            if (modalCloseBtn) modalCloseBtn.removeEventListener('click', closeModal);
            if (modalOverlay) modalOverlay.removeEventListener('click', closeModal);

            // Allow animation to finish before hiding
            setTimeout(() => {
                openModal.hidden = true;
                document.body.style.overflow = '';
            }, 300);
        }
    };


    // ==========================================================================
    // 8. EVENT LISTENERS & HANDLERS
    // ==========================================================================
    
    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Header scroll effect
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Filtering and Searching
    categoryFilter.addEventListener('change', filterAndRender);
    searchInput.addEventListener('input', filterAndRender);

    // View switcher
    viewSwitcher.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.view-btn');
        if (viewBtn) {
            applyView(viewBtn.dataset.view);
        }
    });

    // Favorite button handler
    appGrid.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.btn-favorite');
        if (favBtn) {
            e.stopPropagation(); // Prevent modal from opening
            const appId = parseInt(favBtn.dataset.id, 10);
            toggleFavorite(appId, favBtn);
        }
    });

    // Modal Triggers and Closers
    appGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.app-card');
        if (card) {
            openAppModal(parseInt(card.dataset.id, 10));
        }
    });
    // Handle Enter key for accessibility on app cards
    appGrid.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const card = e.target.closest('.app-card');
            if (card) {
                e.preventDefault();
                openAppModal(parseInt(card.dataset.id, 10));
            }
        }
    });

    // Global Escape key listener for closing modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    
    /**
     * Toggles an app's favorite status.
     * @param {number} appId - The ID of the app.
     * @param {HTMLElement} buttonElement - The favorite button element.
     */
    function toggleFavorite(appId, buttonElement) {
        const index = favorites.indexOf(appId);
        if (index > -1) {
            favorites.splice(index, 1); // Remove from favorites
            buttonElement.classList.remove('favorited');
            buttonElement.setAttribute('aria-label', 'Add to favorites');
            buttonElement.innerHTML = '<i class="far fa-heart"></i>';
        } else {
            favorites.push(appId); // Add to favorites
            buttonElement.classList.add('favorited');
            buttonElement.setAttribute('aria-label', 'Remove from favorites');
            buttonElement.innerHTML = '<i class="fas fa-heart"></i>';
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }


    // ==========================================================================
    // 9. ANIMATIONS (Intersection Observer for scroll animations)
    // ==========================================================================
    let observer;

    /**
     * Sets up an IntersectionObserver to animate cards when they enter the viewport.
     */
    const observeVisibleCards = () => {
        const cards = document.querySelectorAll('.app-card');
        if (observer) observer.disconnect(); // Disconnect previous observer

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the card is visible
        });

        cards.forEach(card => observer.observe(card));
    };


    // ==========================================================================
    // 10. INITIALIZATION
    // ==========================================================================
    const init = () => {
        // Apply saved or system default theme
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
        
        // Apply saved view
        applyView(currentView);

        // Initial render of apps
        renderApps(appData);
    };

    // Run the app
    init();

});
