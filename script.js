
// Reusable Lucide icon component
function Icon({ name, size = 20, className = "" }) {
    const iconRef = useRef(null);

    useEffect(() => {
        if (window.lucide && iconRef.current) {
            window.lucide.createIcons({
                root: iconRef.current.parentElement
            });
        }
    }, [name]);

    return (
        <i
            ref={iconRef}
            data-lucide={name}
            className={className}
            style={{ width: size, height: size }}
            aria-hidden="true"
        />
    );
}

// Vehicle data
const vehicles = [
    {
        id: 1,
        name: "Apex GT-X",
        type: "Sport",
        category: "sport",
        description: "Autonomous electric supercar",
        price: 299,
        power: "1020 HP",
        acceleration: "1.9 sec",
        range: "420 mi",
        badge: "FLAGSHIP",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 2,
        name: "Terra Cyber",
        type: "SUV",
        category: "suv",
        description: "Premium all-terrain electric SUV",
        price: 349,
        power: "Dual Motor",
        acceleration: "3.8 sec",
        range: "500 mi",
        badge: "ALL TERRAIN",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 3,
        name: "Vortex E-1",
        type: "Electric",
        category: "electric",
        description: "Intelligent urban electric vehicle",
        price: 199,
        power: "450 HP",
        acceleration: "3.5 sec",
        range: "350 mi",
        badge: "ELECTRIC",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 4,
        name: "Phantom R",
        type: "Sport",
        category: "sport",
        description: "Precision-engineered performance coupe",
        price: 399,
        power: "1100 HP",
        acceleration: "1.8 sec",
        range: "410 mi",
        badge: "PERFORMANCE",
        image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 5,
        name: "Nova X7",
        type: "SUV",
        category: "suv",
        description: "Intelligent luxury family cruiser",
        price: 279,
        power: "680 HP",
        acceleration: "4.1 sec",
        range: "480 mi",
        badge: "LUXURY",
        image: "https://images.unsplash.com/photo-151SUV?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 6,
        name: "Pulse GT",
        type: "Electric",
        category: "electric",
        description: "Next-generation electric grand tourer",
        price: 229,
        power: "570 HP",
        acceleration: "3.2 sec",
        range: "390 mi",
        badge: "NEW ARRIVAL",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85"
    }
];

// Technology features
const technologies = [
    {
        icon: "brain-circuit",
        title: "NeuralDrive AI",
        description: "Intelligent driving assistance that analyzes road conditions, adapts to traffic, and helps create a more informed driving experience."
    },
    {
        icon: "battery-charging",
        title: "Quantum Charge",
        description: "Explore advanced electric mobility with intelligent charging insights, battery monitoring, and efficient energy management."
    },
    {
        icon: "shield-check",
        title: "CyberShield Security",
        description: "Connected vehicle security concepts designed around encrypted communication, driver verification, and system monitoring."
    },
    {
        icon: "radar",
        title: "360° Sensor Vision",
        description: "Discover sensor-assisted awareness with surroundings visualization, parking assistance, and intelligent obstacle detection."
    },
    {
        icon: "map-pinned",
        title: "SmartRoute Navigation",
        description: "Explore route planning concepts that consider distance, traffic conditions, charging stops, and your destination."
    },
    {
        icon: "leaf",
        title: "Zero-Emission Mobility",
        description: "Experience an electric-first vehicle concept focused on reducing tailpipe emissions and supporting cleaner transportation."
    }
];

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [favorites, setFavorites] = useState([]);
    const [favoritesOnly, setFavoritesOnly] = useState(false);

    const [selectedCar, setSelectedCar] = useState(null);
    const [reservation, setReservation] = useState({
        name: "",
        email: "",
        date: "",
        days: "1"
    });

    const [chatOpen, setChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState([
        {
            sender: "bot",
            text: "Hello! I'm AUTOBOT, your virtual mobility assistant. I can help you explore our fleet, understand vehicle features, and navigate this website. What would you like to know?"
        }
    ]);

    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [toasts, setToasts] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);

    const chatEndRef = useRef(null);

    // Toast notifications
    function showToast(message) {
        const id = Date.now() + Math.random();

        setToasts(previous => [
            ...previous,
            { id, message }
        ]);

        setTimeout(() => {
            setToasts(previous =>
                previous.filter(toast => toast.id !== id)
            );
        }, 3500);
    }

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.classList.toggle("modal-open", Boolean(selectedCar));

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [selectedCar]);

    // Scroll chat to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [chatMessages, chatOpen]);

    // Reveal sections when they enter the viewport
    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");

        if (!("IntersectionObserver" in window)) {
            elements.forEach(element => element.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        elements.forEach(element => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    // Recreate Lucide icons after React renders
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    // Filter and search vehicles
    const filteredVehicles = vehicles.filter(car => {
        const query = search.toLowerCase().trim();

        const matchesSearch =
            car.name.toLowerCase().includes(query) ||
            car.type.toLowerCase().includes(query) ||
            car.description.toLowerCase().includes(query) ||
            car.badge.toLowerCase().includes(query);

        const matchesCategory =
            category === "all" || car.category === category;

        const matchesFavorites =
            !favoritesOnly || favorites.includes(car.id);

        return matchesSearch && matchesCategory && matchesFavorites;
    });

    function toggleFavorite(carId) {
        const alreadyFavorite = favorites.includes(carId);

        setFavorites(previous =>
            alreadyFavorite
                ? previous.filter(id => id !== carId)
                : [...previous, carId]
        );

        showToast(
            alreadyFavorite
                ? "Vehicle removed from your favorites."
                : "Vehicle added to your favorites."
        );
    }

    function openReservation(car) {
        setSelectedCar(car);
        setReservation({
            name: "",
            email: "",
            date: "",
            days: "1"
        });
    }

    function closeReservation() {
        setSelectedCar(null);
    }

    function handleReservationSubmit(event) {
        event.preventDefault();

        if (!selectedCar) return;

        const bookingDetails = {
            vehicle: selectedCar.name,
            customer: reservation.name,
            email: reservation.email,
            date: reservation.date,
            days: reservation.days
        };

        // Demo only: no booking is sent to a server.
        console.log("Demo reservation:", bookingDetails);

        closeReservation();

        showToast(
            `Demo reservation request prepared for ${selectedCar.name}. No booking has been submitted to a server.`
        );

        setChatMessages(previous => [
            ...previous,
            {
                sender: "bot",
                text: `Your demo reservation form for ${selectedCar.name} was completed. This website is a frontend demonstration, so no actual booking or payment has been processed.`
            }
        ]);
    }

    function handleContactSubmit(event) {
        event.preventDefault();

        // Demo only: no message is sent to a backend.
        console.log("Demo contact message:", contact);

        showToast(
            "Your demo contact form was completed. No message has been sent to a server."
        );

        setContact({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    }

    // Local demonstration assistant responses
    function getBotResponse(message) {
        const text = message.toLowerCase();

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {
            return "Hello! Welcome to AUTOSPOT. I'm AUTOBOT, your virtual mobility guide. Ask me about the fleet, vehicle prices, or our technology features.";
        }

        if (
            text.includes("price") ||
            text.includes("cost") ||
            text.includes("rent")
        ) {
            return "Here are the displayed demo daily rates:\n\n• Apex GT-X — $299/day\n• Terra Cyber — $349/day\n• Vortex E-1 — $199/day\n• Phantom R — $399/day\n• Nova X7 — $279/day\n• Pulse GT — $229/day\n\nThese are sample website prices, not live rental offers.";
        }

        if (
            text.includes("sport") ||
            text.includes("supercar")
        ) {
            return "Our sport category includes the Apex GT-X and Phantom R. Explore their cards in the Cyber Fleet section to see their sample specifications and demo reservation forms.";
        }

        if (
            text.includes("suv") ||
            text.includes("family")
        ) {
            return "The SUV category includes Terra Cyber and Nova X7. You can use the SUV filter in the fleet section to view them.";
        }

        if (
            text.includes("electric") ||
            text.includes("battery") ||
            text.includes("charge")
        ) {
            return "AUTOSPOT presents electric mobility concepts, including battery monitoring, intelligent charging, and zero-tailpipe-emission vehicle designs. Visit Beyond the Drive to explore these features.";
        }

        if (
            text.includes("reserve") ||
            text.includes("booking") ||
            text.includes("book")
        ) {
            return "To try the demo reservation interface, scroll to Cyber Fleet and click the Reserve button on a vehicle card. The form is a frontend demonstration and does not create a real booking.";
        }

        if (
            text.includes("technology") ||
            text.includes("feature") ||
            text.includes("beyond")
        ) {
            return "Explore Beyond the Drive for NeuralDrive AI, Quantum Charge, CyberShield Security, 360° Sensor Vision, SmartRoute Navigation, and Zero-Emission Mobility.";
        }

        if (
            text.includes("contact") ||
            text.includes("support") ||
            text.includes("message")
        ) {
            return "You can find the contact form near the bottom of the page. It demonstrates form validation and interaction, but it is not connected to a messaging server.";
        }

        if (
            text.includes("help") ||
            text.includes("what can you do")
        ) {
            return "I can help you explore the demo fleet, display sample vehicle prices, explain the technology cards, and guide you through the website's demo reservation interface. Try asking: 'Show me the prices' or 'Tell me about electric vehicles'.";
        }

        return "I'm AUTOBOT, the AUTOSPOT website's local demo assistant. I can answer basic questions about the vehicles, sample prices, technology features, and website navigation. Try asking about the fleet, SUVs, electric vehicles, or reservations.";
    }

    function sendChatMessage(message = chatInput) {
        const trimmed = message.trim();

        if (!trimmed) return;

        setChatMessages(previous => [
            ...previous,
            { sender: "user", text: trimmed }
        ]);

        setChatInput("");

        // Simulated local response, not a live AI service.
        setTimeout(() => {
            setChatMessages(previous => [
                ...previous,
                {
                    sender: "bot",
                    text: getBotResponse(trimmed)
                }
            ]);
        }, 350);
    }

    function handleChatSubmit(event) {
        event.preventDefault();
        sendChatMessage();
    }

    function scrollToFleet() {
        document.getElementById("fleet")?.scrollIntoView({
            behavior: "smooth"
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
