// Gallery Images - High quality Unsplash images optimized for performance
        const galleryImages = [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80',
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
            'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400&q=80',
            'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
            'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
            'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80',
            'https://plus.unsplash.com/premium_photo-1682146739433-5926577acb7a?w=400&q=80',
            'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=400&q=80'
        ];

        // Generate diagonal gallery rows with optimized image loading
        function createGalleryRows() {
            const wrapper = document.getElementById('gallery-wrapper');
            const numRows = 8;
            
            for (let i = 0; i < numRows; i++) {
                const row = document.createElement('div');
                row.className = 'image-row';
                row.dataset.rowIndex = i;
                
                // Fisher-Yates shuffle for better randomization
                const shuffled = [...galleryImages];
                for (let j = shuffled.length - 1; j > 0; j--) {
                    const k = Math.floor(Math.random() * (j + 1));
                    [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]];
                }
                const images = [...shuffled, ...shuffled];
                
                images.forEach((src, index) => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = 'Portfolio showcase';
                    img.loading = index < 10 ? 'eager' : 'lazy';
                    img.decoding = 'async';
                    item.appendChild(img);
                    row.appendChild(item);
                });
                
                wrapper.appendChild(row);
            }
        }

        // Animate gallery rows appearing one by one in zigzag pattern
        function animateGalleryReveal() {
            const rows = document.querySelectorAll('.image-row');
            const overlayMask = document.querySelector('.overlay-mask');
            
            let animationCompleteCount = 0;
            
            rows.forEach((row, index) => {
                setTimeout(() => {
                    // Alternate between left and right for zigzag effect
                    const fromLeft = index % 2 === 0;
                    
                    if (fromLeft) {
                        row.classList.add('animate-from-left');
                    } else {
                        row.classList.add('animate-from-right');
                    }
                    
                    // After each row's slide-in animation completes
                    setTimeout(() => {
                        animationCompleteCount++;
                        
                        // Remove initial animation classes and start continuous movement
                        row.classList.remove('animate-from-left', 'animate-from-right');
                        
                        if (fromLeft) {
                            row.classList.add('continuous-left');
                        } else {
                            row.classList.add('continuous-right');
                        }
                        
                        // When all rows have completed their initial animation
                        if (animationCompleteCount === rows.length) {
                            // Show overlay mask immediately after gallery animation
                            setTimeout(() => {
                                overlayMask.classList.add('visible');
                            }, 300);
                        }
                        
                    }, 1200); // Faster animation completion
                    
                }, index * 150); // Faster stagger for more dynamic effect
            });
        }

        // Main intro animation sequence
        function playIntroSequence() {
            const introScreen = document.getElementById('intro-screen');
            const introTitle = document.getElementById('intro-title');
            const dotElement = introTitle.querySelector('.dot');
            const blackDotScreen = document.getElementById('black-dot-screen');
            const blackDot = document.getElementById('black-dot');
            const mainContent = document.getElementById('main-content');
            const contentLayer = document.getElementById('content-layer');
            const overlayMask = document.querySelector('.overlay-mask');

            // Step 1: Wait 2 seconds, then make the dot expand into tunnel
            setTimeout(() => {
                dotElement.classList.add('tunnel-expand');
                
                // Step 2: After dot expansion, transition to black dot screen
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    blackDotScreen.classList.add('visible');
                    
                    setTimeout(() => {
                        blackDot.classList.add('expand');
                        
                        // Step 3: Show main content and start animated gallery reveal
                        setTimeout(() => {
                            blackDotScreen.style.display = 'none';
                            mainContent.classList.add('visible');
                            
                            // Start the animated gallery reveal immediately
                            animateGalleryReveal();
                            
                            // Wait for gallery rows to animate and mask to become visible
                            // Then show content layer AFTER mask is fully visible
                            const checkMaskVisible = setInterval(() => {
                                if (overlayMask.classList.contains('visible')) {
                                    clearInterval(checkMaskVisible);
                                    
                                    // Wait for mask transition to complete (1.5s) before showing content
                                    setTimeout(() => {
                                        contentLayer.classList.add('visible');
                                        
                                        // Animate hero elements with staggered delays
                                        setTimeout(() => {
                                            document.getElementById('hero-title').classList.add('animate');
                                        }, 200);
                                        setTimeout(() => {
                                            document.getElementById('hero-subtitle').classList.add('animate');
                                        }, 500);
                                        setTimeout(() => {
                                            document.getElementById('cta-button').classList.add('animate');
                                        }, 800);
                                        setTimeout(() => {
                                            document.getElementById('scroll-indicator').classList.add('animate');
                                        }, 1100);
                                    }, 1200); // Wait for mask blur transition
                                }
                            }, 100);
                        }, 800);
                    }, 150);
                }, 1800);
            }, 2000);
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createGalleryRows();
            playIntroSequence();
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // CTA button scroll
        document.getElementById('cta-button').addEventListener('click', () => {
            document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
        });

        // Enhanced scroll animations for service sections
        function initServiceAnimations() {
            const serviceContainers = document.querySelectorAll('.service-container');
            
            const serviceObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }
                });
            }, { threshold: 0.1 });

            serviceContainers.forEach(container => {
                container.style.transform = 'translateY(50px)';
                container.style.opacity = '0';
                container.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                serviceObserver.observe(container);
            });
        }

        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.textContent);
                        let current = 0;
                        const increment = target / 100;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = target + '+';
                                clearInterval(timer);
                            } else {
                                counter.textContent = Math.floor(current) + '+';
                            }
                        }, 20);
                        counterObserver.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => counterObserver.observe(counter));
        }

        // Service CTA hover effects
        function initServiceCTAs() {
            const ctas = document.querySelectorAll('.service-cta');
            
            ctas.forEach(cta => {
                cta.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.05)';
                });
                
                cta.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(-3px) scale(1)';
                });
            });
        }

        // Contact links hover effects
        function initContactLinks() {
            const contactLinks = document.querySelectorAll('.contact-link');
            
            contactLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(-10px) scale(1)';
                });

                // Add click analytics (optional)
                link.addEventListener('click', function() {
                    const linkType = this.classList[1]; // gets 'main-site', 'whatsapp', etc.
                    console.log(`Contact link clicked: ${linkType}`);
                });
            });
        }

        // Floating elements animation
        function initFloatingElements() {
            const floatingElements = document.querySelectorAll('.floating-element');
            
            floatingElements.forEach((element, index) => {
                const randomDelay = Math.random() * 2;
                const randomDuration = 4 + Math.random() * 4;
                
                element.style.animationDelay = randomDelay + 's';
                element.style.animationDuration = randomDuration + 's';
                
                // Random movement on scroll
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.1 * (index + 1);
                    element.style.transform = `translateY(${rate}px) rotate(${rate * 0.5}deg)`;
                });
            });
        }

        // Portfolio tab functionality
        function initPortfolioTabs() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.dataset.tab;
                    
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Show corresponding tab content
                    const targetTab = document.getElementById(`${tabId}-tab`);
                    if (targetTab) {
                        targetTab.classList.add('active');
                    }
                    
                    // Reinitialize interactions for newly visible content
                    setTimeout(() => {
                        initVideoHovers();
                        initMediaModal();
                    }, 100);
                });
            });
        }

        // Video hover effects
        function initVideoHovers() {
            const videoItems = document.querySelectorAll('.portfolio-item video');
            
            videoItems.forEach(video => {
                const item = video.closest('.portfolio-item');
                
                // Remove existing listeners to avoid duplicates
                const newItem = item.cloneNode(true);
                item.parentNode.replaceChild(newItem, item);
                
                newItem.addEventListener('mouseenter', () => {
                    const videoEl = newItem.querySelector('video');
                    if (videoEl) {
                        videoEl.play();
                    }
                });
                
                newItem.addEventListener('mouseleave', () => {
                    const videoEl = newItem.querySelector('video');
                    if (videoEl) {
                        videoEl.pause();
                        videoEl.currentTime = 0;
                    }
                });
            });
        }

        // Enhanced media modal functionality
        function initMediaModal() {
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            portfolioItems.forEach(item => {
                // Remove existing listeners to avoid duplicates
                const newItem = item.cloneNode(true);
                item.parentNode.replaceChild(newItem, item);
                
                newItem.addEventListener('click', () => {
                    openModal(newItem);
                });
            });
        }

        function openModal(item) {
            const modal = document.getElementById('media-modal');
            const modalMedia = document.getElementById('modal-media');
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');

            // Get media content
            const video = item.querySelector('video');
            const image = item.querySelector('img');
            const title = item.querySelector('.portfolio-title')?.textContent || 'Portfolio Item';
            const description = item.querySelector('.portfolio-description')?.textContent || 'Creative work showcase';

            // Clear previous content
            modalMedia.innerHTML = '';

            // Add media to modal
            if (video && video.querySelector('source')) {
                const modalVideo = video.cloneNode(true);
                modalVideo.controls = true;
                modalVideo.muted = false;
                modalVideo.autoplay = false;
                modalMedia.appendChild(modalVideo);
            } else if (image) {
                const modalImage = image.cloneNode(true);
                modalMedia.appendChild(modalImage);
            }

            // Set info
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('media-modal');
            const modalVideo = modal.querySelector('video');
            
            if (modalVideo) {
                modalVideo.pause();
            }
            
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Enhanced CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        // Fade in animation on scroll
        function initFadeIn() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Initialize all enhanced features
        document.addEventListener('DOMContentLoaded', () => {
            createGalleryRows();
            playIntroSequence();
            
            // Initialize new features after a delay to ensure DOM is ready
            setTimeout(() => {
                initServiceAnimations();
                animateCounters();
                initServiceCTAs();
                initContactLinks();
                initFloatingElements();
                initPortfolioTabs();
                initMediaModal();
                initFadeIn();
                
                // Trigger initial fade-in for visible elements
                setTimeout(() => {
                    document.querySelectorAll('.fade-in').forEach(el => {
                        if (el.getBoundingClientRect().top < window.innerHeight) {
                            el.classList.add('visible');
                        }
                    });
                }, 100);
            }, 1000);
        });

        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Close modal when clicking outside content
        document.addEventListener('click', (e) => {
            if (e.target.id === 'media-modal') {
                closeModal();
            }
        });