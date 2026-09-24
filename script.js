// Wait for DOM content to fully load
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Interactive AI Assistant Messages
    const botAvatar = document.getElementById('bot-avatar');
    const botBubble = document.getElementById('bot-bubble');

    const botMessages = [
        "AUTOBOT v4.2 active. How can I assist your route?",
        "Scanning grid... All power systems operating at 100%.",
        "Apex GT-X reservations are surging today!",
        "Need a satellite uplink? Reach out through the contact module.",
        "System check: Cyber security encryption verified."
    ];

    let messageIndex = 0;

    if (botAvatar && botBubble) {
        botAvatar.addEventListener('click', () => {
            messageIndex = (messageIndex + 1) % botMessages.length;
            
            // Subtle transition effect
            botBubble.style.opacity = '0';
            setTimeout(() => {
                botBubble.textContent = botMessages[messageIndex];
                botBubble.style.opacity = '1';
            }, 200);
        });
    }

    // 3. Vehicle Reservation Handlers
    const reserveButtons = document.querySelectorAll('.reserve-btn');

    reserveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const carName = e.target.getAttribute('data-car');
            
            if (botBubble) {
                botBubble.textContent = `Initiating reservation sequence for ${carName}...`;
                botBubble.style.color = '#00f0ff';
            }

            e.target.textContent = 'Reserved!';
            e.target.style.background = '#00f0ff';
            e.target.style.color = '#030712';

            setTimeout(() => {
                e.target.textContent = 'Reserve';
                e.target.style.background = '';
                e.target.style.color = '';
            }, 3000);
        });
    });

    // 4. Contact Form Handler
    const form = document.getElementById('uplink-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('user-name').value;

            if (botBubble) {
                botBubble.textContent = `Transmission received, ${nameInput}. Uplink established!`;
            }

            form.reset();
        });
    }
});