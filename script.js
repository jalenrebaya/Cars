
const { useState, useEffect, useRef } = React;

/* =========================================================
   AUTOSPOT — REACT APPLICATION
========================================================= */

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

    function closeMobileMenu() {
        setMobileMenu(false);
    }

    return (
        <>
            {/* NAVIGATION */}
            <header className="navbar">
                <a className="logo" href="#home" aria-label="AUTOSPOT home">
                    <span className="logo-symbol">
                        <Icon name="car-front" size={23} />
                    </span>
                    <span className="gradient-text">AUTOSPOT</span>
                </a>

                <nav className={`nav-links ${mobileMenu ? "open" : ""}`}>
                    <a href="#home" onClick={closeMobileMenu}>Home</a>
                    <a href="#fleet" onClick={closeMobileMenu}>Fleet</a>
                    <a href="#beyond" onClick={closeMobileMenu}>Technology</a>
                    <a href="#experience" onClick={closeMobileMenu}>Experience</a>
                    <a href="#contact" onClick={closeMobileMenu}>Contact</a>
                </nav>

                <div className="nav-actions">
                    <button
                        className="icon-btn"
                        onClick={() => {
                            setFavoritesOnly(!favoritesOnly);
                            scrollToFleet();
                        }}
                        aria-label="Show favorite vehicles"
                        title="Favorites"
                    >
                        <Icon name="heart" />
                    </button>

                    <a className="btn btn-primary" href="#fleet">
                        Explore Fleet
                        <Icon name="arrow-up-right" />
                    </a>

                    <button
                        className="icon-btn menu-btn"
                        onClick={() => setMobileMenu(!mobileMenu)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenu}
                    >
                        <Icon name={mobileMenu ? "x" : "menu"} />
                    </button>
                </div>
            </header>

            <main>
                {/* HERO */}
                <section className="hero" id="home">
                    <div className="container hero-grid">
                        <div className="hero-content">
                            <div className="hero-kicker">
                                <span className="status-dot"></span>
                                NEXT-GENERATION MOBILITY
                            </div>

                            <h1>
                                DRIVE THE
                                <br />
                                <span className="gradient-text">FUTURE</span>
                                <br />
                                TODAY.
                            </h1>

                            <p className="hero-description">
                                Discover a new dimension of automotive innovation.
                                Explore futuristic electric vehicles, intelligent
                                mobility concepts, and a driving experience designed
                                around tomorrow.
                            </p>

                            <div className="hero-buttons">
                                <a href="#fleet" className="btn btn-primary">
                                    Explore the Fleet
                                    <Icon name="arrow-right" />
                                </a>

                                <a href="#beyond" className="btn btn-secondary">
                                    <Icon name="play-circle" />
                                    Discover Technology
                                </a>
                            </div>

                            <div className="hero-trust">
                                <div className="trust-icons">
                                    <span><Icon name="zap" /></span>
                                    <span><Icon name="shield-check" /></span>
                                    <span><Icon name="cpu" /></span>
                                </div>

                                <span>
                                    Electric innovation · Intelligent mobility
                                </span>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="hero-glow"></div>
                            <div className="hero-ring"></div>

                            <div className="hero-car-image">
                                <img
                                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90"
                                    alt="Luxury sports car representing the AUTOSPOT futuristic fleet"
                                />
                            </div>

                            <div className="floating-chip chip-one">
                                <Icon name="gauge" />
                                <div>
                                    <strong>Performance</strong>
                                    <small>Engineered for precision</small>
                                </div>
                            </div>

                            <div className="floating-chip chip-two">
                                <Icon name="battery-charging" />
                                <div>
                                    <strong>Electric Future</strong>
                                    <small>Explore smarter mobility</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="stats-section">
                    <div className="container">
                        <div className="stats-grid glass reveal">
                            <div className="stat">
                                <strong>500+</strong>
                                <span>Concept Vehicles</span>
                            </div>

                            <div className="stat">
                                <strong>0.2s</strong>
                                <span>Illustrative AI Response</span>
                            </div>

                            <div className="stat">
                                <strong>100%</strong>
                                <span>Electric Fleet Concept</span>
                            </div>

                            <div className="stat">
                                <strong>24/7</strong>
                                <span>Digital Experience</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FLEET */}
                <section className="section" id="fleet">
                    <div className="container">
                        <div className="section-heading reveal">
                            <span className="eyebrow">THE AUTOSPOT COLLECTION</span>
                            <h2>
                                Meet the <span className="gradient-text">Cyber Fleet</span>
                            </h2>
                            <p>
                                Explore our futuristic vehicle concepts, compare
                                specifications, and try the interactive demo
                                reservation experience.
                            </p>
                        </div>

                        <div className="fleet-toolbar reveal">
                            <label className="search-box">
                                <Icon name="search" />
                                <input
                                    type="search"
                                    placeholder="Search vehicles, categories, or features..."
                                    value={search}
                                    onChange={event => setSearch(event.target.value)}
                                    aria-label="Search vehicles"
                                />
                            </label>

                            <div className="filter-buttons">
                                {[
                                    ["all", "All Vehicles"],
                                    ["sport", "Sport"],
                                    ["suv", "SUV"],
                                    ["electric", "Electric"]
                                ].map(([value, label]) => (
                                    <button
                                        key={value}
                                        className={`filter-btn ${category === value ? "active" : ""}`}
                                        onClick={() => setCategory(value)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="fleet-summary">
                            <span>
                                Showing <strong>{filteredVehicles.length}</strong> vehicles
                            </span>

                            <button
                                className="filter-btn"
                                onClick={() => setFavoritesOnly(!favoritesOnly)}
                            >
                                <Icon name="heart" size={15} />
                                {favoritesOnly ? "Show All Vehicles" : `Favorites (${favorites.length})`}
                            </button>
                        </div>

                        <div className="car-grid">
                            {filteredVehicles.length > 0 ? (
                                filteredVehicles.map(car => (
                                    <article className="car-card glass reveal" key={car.id}>
                                        <div className="car-image">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                loading="lazy"
                                                onError={event => {
                                                    event.currentTarget.style.display = "none";
                                                }}
                                            />

                                            <span className="car-badge">{car.badge}</span>

                                            <button
                                                className={`favorite-btn ${favorites.includes(car.id) ? "is-favorite" : ""}`}
                                                onClick={() => toggleFavorite(car.id)}
                                                aria-label={
                                                    favorites.includes(car.id)
                                                        ? `Remove ${car.name} from favorites`
                                                        : `Add ${car.name} to favorites`
                                                }
                                                title="Toggle favorite"
                                            >
                                                <Icon
                                                    name="heart"
                                                    size={18}
                                                />
                                            </button>
                                        </div>

                                        <div className="car-info">
                                            <h3>{car.name}</h3>
                                            <p className="car-type">{car.description}</p>

                                            <div className="car-details">
                                                <div className="car-detail">
                                                    <Icon name="zap" />
                                                    <span>{car.power}</span>
                                                </div>

                                                <div className="car-detail">
                                                    <Icon name="gauge" />
                                                    <span>0–60 {car.acceleration}</span>
                                                </div>

                                                <div className="car-detail">
                                                    <Icon name="battery-charging" />
                                                    <span>{car.range}</span>
                                                </div>
                                            </div>

                                            <div className="car-bottom">
                                                <div className="car-price">
                                                    <strong>${car.price}</strong>
                                                    <small> / demo day</small>
                                                </div>

                                                <button
                                                    className="reserve-btn"
                                                    onClick={() => openReservation(car)}
                                                >
                                                    Reserve
                                                    <Icon name="arrow-up-right" size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="empty-state glass">
                                    <Icon name="search-x" />
                                    <h3>No vehicles found</h3>
                                    <p>Try a different search term or category.</p>

                                    <button
                                        className="btn btn-secondary"
                                        style={{ marginTop: "20px" }}
                                        onClick={() => {
                                            setSearch("");
                                            setCategory("all");
                                            setFavoritesOnly(false);
                                        }}
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* BEYOND THE DRIVE */}
                <section className="section beyond-section" id="beyond">
                    <div className="container">
                        <div className="section-heading reveal">
                            <span className="eyebrow">INTELLIGENCE IN MOTION</span>

                            <h2>
                                Beyond the <span className="gradient-text">Drive</span>
                            </h2>

                            <p>
                                Explore the technologies and design concepts that
                                shape the AUTOSPOT vision of next-generation mobility.
                            </p>
                        </div>

                        <div className="beyond-grid">
                            {technologies.map((technology, index) => (
                                <article
                                    className="beyond-card glass reveal"
                                    key={technology.title}
                                >
                                    <div className="beyond-icon">
                                        <Icon name={technology.icon} size={28} />
                                    </div>

                                    <h3>{technology.title}</h3>

                                    <p>{technology.description}</p>

                                    <a
                                        className="feature-link"
                                        href="#experience"
                                    >
                                        Explore feature
                                        <Icon name="arrow-right" size={16} />
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE */}
                <section className="section" id="experience">
                    <div className="container experience-grid">
                        <div className="experience-visual glass reveal">
                            <img
                                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
                                alt="Modern premium automobile in a dramatic setting"
                                loading="lazy"
                            />

                            <div className="experience-overlay">
                                <strong>Designed Around Tomorrow</strong>
                                <span>
                                    Intelligent concepts. Electric innovation.
                                    A connected experience.
                                </span>
                            </div>
                        </div>

                        <div className="experience-content reveal">
                            <span className="eyebrow">A NEW KIND OF JOURNEY</span>

                            <h2>
                                Technology meets
                                <br />
                                <span className="gradient-text">the open road.</span>
                            </h2>

                            <p>
                                AUTOSPOT brings together futuristic vehicle concepts,
                                intelligent digital interfaces, and an immersive
                                automotive experience. Explore the possibilities
                                of a more connected journey.
                            </p>

                            <div className="experience-list">
                                <div className="experience-item">
                                    <span className="check-icon">
                                        <Icon name="check" />
                                    </span>
                                    <div>
                                        <strong>Intelligent Mobility Concepts</strong>
                                        <p>Discover AI-assisted driving and connected vehicle ideas.</p>
                                    </div>
                                </div>

                                <div className="experience-item">
                                    <span className="check-icon">
                                        <Icon name="check" />
                                    </span>
                                    <div>
                                        <strong>Electric-First Design</strong>
                                        <p>Explore a collection inspired by electric transportation.</p>
                                    </div>
                                </div>

                                <div className="experience-item">
                                    <span className="check-icon">
                                        <Icon name="check" />
                                    </span>
                                    <div>
                                        <strong>Interactive Digital Experience</strong>
                                        <p>Search, filter, favorite, and explore vehicle information.</p>
                                    </div>
                                </div>
                            </div>

                            <a href="#fleet" className="btn btn-primary">
                                Find Your Vehicle
                                <Icon name="arrow-right" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section className="section" id="contact">
                    <div className="container">
                        <div className="contact-card glass reveal">
                            <div className="contact-content">
                                <span className="eyebrow">CONNECT WITH AUTOSPOT</span>

                                <h2>
                                    Let's start your
                                    <br />
                                    <span className="gradient-text">next journey.</span>
                                </h2>

                                <p>
                                    Have a question about the website or want to
                                    explore the vehicle concepts? Use the demo
                                    contact form to try the interface.
                                </p>

                                <div className="contact-method">
                                    <span><Icon name="mail" /></span>
                                    <div>
                                        <strong>Email</strong>
                                        <small>hello@autospot.example</small>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <span><Icon name="clock" /></span>
                                    <div>
                                        <strong>Digital Experience</strong>
                                        <small>Explore the demo anytime</small>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <span><Icon name="bot" /></span>
                                    <div>
                                        <strong>AUTOBOT Assistant</strong>
                                        <small>Available through the chat interface</small>
                                    </div>
                                </div>
                            </div>

                            <form className="contact-form" onSubmit={handleContactSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name">Full Name</label>
                                        <input
                                            className="form-control"
                                            id="contact-name"
                                            type="text"
                                            placeholder="Your name"
                                            value={contact.name}
                                            onChange={event =>
                                                setContact({
                                                    ...contact,
                                                    name: event.target.value
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contact-email">Email Address</label>
                                        <input
                                            className="form-control"
                                            id="contact-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={contact.email}
                                            onChange={event =>
                                                setContact({
                                                    ...contact,
                                                    email: event.target.value
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-subject">Subject</label>
                                    <select
                                        className="form-control"
                                        id="contact-subject"
                                        value={contact.subject}
                                        onChange={event =>
                                            setContact({
                                                ...contact,
                                                subject: event.target.value
                                            })
                                        }
                                        required
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="fleet">Vehicle information</option>
                                        <option value="technology">Technology features</option>
                                        <option value="website">Website feedback</option>
                                        <option value="other">Other inquiry</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        className="form-control"
                                        id="contact-message"
                                        placeholder="Write your message here..."
                                        value={contact.message}
                                        onChange={event =>
                                            setContact({
                                                ...contact,
                                                message: event.target.value
                                            })
                                        }
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Submit Demo Message
                                    <Icon name="send" />
                                </button>

                                <small style={{ color: "var(--muted)", fontSize: "0.7rem" }}>
                                    Demo form only. Messages are not sent to a server.
                                </small>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-top">
                        <a className="logo" href="#home">
                            <span className="logo-symbol">
                                <Icon name="car-front" />
                            </span>
                            <span className="gradient-text">AUTOSPOT</span>
                        </a>

                        <nav className="footer-links" aria-label="Footer navigation">
                            <a href="#home">Home</a>
                            <a href="#fleet">Fleet</a>
                            <a href="#beyond">Technology</a>
                            <a href="#experience">Experience</a>
                            <a href="#contact">Contact</a>
                        </nav>
                    </div>

                    <div className="footer-bottom">
                        <span>© {new Date().getFullYear()} AUTOSPOT. All rights reserved.</span>
                        <span>Futuristic automotive website concept · Demo interface</span>
                    </div>
                </div>
            </footer>

            {/* RESERVATION MODAL */}
            {selectedCar && (
                <div
                    className="modal-backdrop"
                    onMouseDown={event => {
                        if (event.target === event.currentTarget) {
                            closeReservation();
                        }
                    }}
                    onKeyDown={event => {
                        if (event.key === "Escape") closeReservation();
                    }}
                >
                    <div
                        className="modal glass"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="reservation-title"
                    >
                        <div className="modal-header">
                            <div>
                                <h3 id="reservation-title">Reserve a Vehicle</h3>
                                <p>Complete this form to explore the demo booking process.</p>
                            </div>

                            <button
                                className="icon-btn"
                                onClick={closeReservation}
                                aria-label="Close reservation form"
                            >
                                <Icon name="x" />
                            </button>
                        </div>

                        <div className="modal-car">
                            <img src={selectedCar.image} alt={selectedCar.name} />

                            <div>
                                <strong>{selectedCar.name}</strong>
                                <span>${selectedCar.price} / demo day</span>
                            </div>
                        </div>

                        <form className="modal-form" onSubmit={handleReservationSubmit}>
                            <div className="form-group">
                                <label htmlFor="reserve-name">Full Name</label>
                                <input
                                    className="form-control"
                                    id="reserve-name"
                                    type="text"
                                    value={reservation.name}
                                    onChange={event =>
                                        setReservation({
                                            ...reservation,
                                            name: event.target.value
                                        })
                                    }
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reserve-email">Email Address</label>
                                <input
                                    className="form-control"
                                    id="reserve-email"
                                    type="email"
                                    value={reservation.email}
                                    onChange={event =>
                                        setReservation({
                                            ...reservation,
                                            email: event.target.value
                                        })
                                    }
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reserve-date">Preferred Date</label>
                                <input
                                    className="form-control"
                                    id="reserve-date"
                                    type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    value={reservation.date}
                                    onChange={event =>
                                        setReservation({
                                            ...reservation,
                                            date: event.target.value
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reserve-days">Number of Days</label>
                                <select
                                    className="form-control"
                                    id="reserve-days"
                                    value={reservation.days}
                                    onChange={event =>
                                        setReservation({
                                            ...reservation,
                                            days: event.target.value
                                        })
                                    }
                                >
                                    <option value="1">1 day</option>
                                    <option value="2">2 days</option>
                                    <option value="3">3 days</option>
                                    <option value="5">5 days</option>
                                    <option value="7">7 days</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Complete Demo Request
                                <Icon name="arrow-right" />
                            </button>

                            <small style={{ color: "var(--muted)", fontSize: "0.7rem" }}>
                                This is a frontend demo. It does not confirm vehicle
                                availability, process payment, or create a real booking.
                            </small>
                        </form>
                    </div>
                </div>
            )}

            {/* TOAST NOTIFICATIONS */}
            <div className="toast-container" aria-live="polite">
                {toasts.map(toast => (
                    <div className="toast" key={toast.id}>
                        <Icon name="check-circle" />
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>

            {/* AUTOBOT CHAT ASSISTANT */}
            <div className="ai-widget">
                {chatOpen && (
                    <section className="chat-panel" aria-label="AUTOBOT chat assistant">
                        <div className="chat-header">
                            <div className="chat-mini-avatar">
                                <Icon name="bot" size={25} />
                            </div>

                            <div className="chat-header-info">
                                <strong>AUTOBOT v4.2</strong>
                                <small>Local demo assistant</small>
                            </div>

                            <button
                                className="chat-close"
                                onClick={() => setChatOpen(false)}
                                aria-label="Close chat"
                            >
                                <Icon name="x" />
                            </button>
                        </div>

                        <div className="chat-messages">
                            {chatMessages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`chat-message ${message.sender}`}
                                >
                                    {message.text}
                                </div>
                            ))}

                            <div ref={chatEndRef}></div>
                        </div>

                        <div className="chat-suggestions">
                            {[
                                "Show me the prices",
                                "Tell me about SUVs",
                                "How do I reserve?"
                            ].map(suggestion => (
                                <button
                                    key={suggestion}
                                    onClick={() => sendChatMessage(suggestion)}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>

                        <form className="chat-form" onSubmit={handleChatSubmit}>
                            <input
                                type="text"
                                value={chatInput}
                                onChange={event => setChatInput(event.target.value)}
                                placeholder="Ask AUTOBOT something..."
                                aria-label="Message AUTOBOT"
                            />

                            <button type="submit" aria-label="Send message">
                                <Icon name="send" />
                            </button>
                        </form>
                    </section>
                )}

                {!chatOpen && (
                    <div className="ai-tooltip">
                        <strong>AUTOBOT</strong>
                        <br />
                        Your mobility assistant
                    </div>
                )}

                <button
                    className="ai-avatar-button"
                    onClick={() => setChatOpen(!chatOpen)}
                    aria-label={chatOpen ? "Close AUTOBOT" : "Open AUTOBOT assistant"}
                    aria-expanded={chatOpen}
                >
                    <span className="avatar-orbit"></span>
                    <span className="avatar-orbit avatar-orbit-two"></span>

                    <span className="avatar-core">
                        <span className="avatar-face">
                            <Icon name="bot" size={39} />
                            <span className="avatar-scanline"></span>
                        </span>
                    </span>

                    <span className="avatar-status"></span>
                </button>
            </div>
        </>
    );
}

// Mount React application
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);