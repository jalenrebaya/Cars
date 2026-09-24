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

// CAR DETAILS MODAL

const carModal = document.getElementById("car-modal");
const modalClose = document.getElementById("modal-close");

const modalCarName = document.getElementById("modal-car-name");
const modalCarType = document.getElementById("modal-car-type");
const modalHp = document.getElementById("modal-hp");
const modalSpeed = document.getElementById("modal-speed");
const modalRange = document.getElementById("modal-range");
const modalPrice = document.getElementById("modal-price");

const carDetails = {
    "Apex GT-X": {
        type: "Autonomous Supercar",
        hp: "1020 HP",
        speed: "1.9s",
        range: "420 Mi",
        price: "$299 / day"
    },

    "Terra Cyber": {
        type: "All-Terrain Rover",
        hp: "Dual Motor",
        speed: "Armored Hull",
        range: "500 Mi",
        price: "$349 / day"
    },

    "Vortex E-1": {
        type: "Urban Commuter",
        hp: "Solar Cell",
        speed: "AI Autopilot",
        range: "350 Mi",
        price: "$199 / day"
    }
};


// Open modal when Details button is clicked
document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", () => {

        const carName = button.dataset.car;
        const car = carDetails[carName];

        modalCarName.textContent = carName;
        modalCarType.textContent = car.type;
        modalHp.textContent = car.hp;
        modalSpeed.textContent = car.speed;
        modalRange.textContent = car.range;
        modalPrice.textContent = car.price;

        carModal.classList.add("active");
    });
});


// Close modal
modalClose.addEventListener("click", () => {
    carModal.classList.remove("active");
});


// Close modal when clicking outside
carModal.addEventListener("click", (event) => {
    if (event.target === carModal) {
        carModal.classList.remove("active");
    }
});