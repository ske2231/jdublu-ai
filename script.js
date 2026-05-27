// Set deadline to 3 days from now for dynamic urgency
const deadline = new Date();
deadline.setDate(deadline.getDate() + 3);
deadline.setHours(23, 59, 59, 999);

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = deadline - now;

    if (distance < 0) {
        clearInterval(interval);
        daysElement.textContent = "0";
        hoursElement.textContent = "0";
        minutesElement.textContent = "0";
        secondsElement.textContent = "0";
        
        // Show expired message
        const scarcitySection = document.querySelector('.scarcity');
        scarcitySection.innerHTML = `
            <h2>Offer Expired!</h2>
            <p>Check back soon for new opportunities.</p>
        `;
        scarcitySection.style.background = '#666';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Add urgency effect when less than 1 hour remaining
    if (distance < (1000 * 60 * 60)) {
        document.querySelector('.scarcity').style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
        document.querySelector('.scarcity h2').textContent = '⚠️ Final Hour!';
    }
}

// Smooth scroll function
function scrollToBuy() {
    document.getElementById('contact').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Initialize countdown
const interval = setInterval(updateCountdown, 1000);
updateCountdown();

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#1a1a2e';
        header.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make hero visible immediately
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';
