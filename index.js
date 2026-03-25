        // Loader
        window.addEventListener("load", () => {
            setTimeout(() => {
                document.querySelector(".loader").style.opacity = "0";
                setTimeout(() => {
                    document.querySelector(".loader").style.display = "none";
                }, 1000);
            }, 1000);
        });

        // Custom Cursor
        const cursor = document.querySelector(".cursor");
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        // Magnetic Button Effect
        document.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px,${y * 0.2}px)`;
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.transform = "translate(0,0)";
            });
        });

        // Project Modal
        function openModal() {
            document.getElementById("projectModal").classList.add("active");
        }
        function closeModal() {
            document.getElementById("projectModal").classList.remove("active");
        }

        // Typing Effect
        const texts = ["Full Stack Developer", "Creative Coder", "UI Enthusiast"];
        let count = 0, index = 0, currentText = '', letter = '';
        (function type() {
            if (count === texts.length) { count = 0 }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            document.querySelector('.typing').textContent = letter;
            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 1000);
            } else {
                setTimeout(type, 100);
            }
        })();

        // Scroll reveal & Timeline Progress Logic
        const sections = document.querySelectorAll('section');
        const progressLine = document.getElementById('progress-line');
        const timelineContainer = document.getElementById('timeline-container');

        window.addEventListener('scroll', () => {
            // Section reveals
            sections.forEach(sec => {
                if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
                    sec.classList.add('show');
                }
            });

            // Timeline line progress logic
            const containerRect = timelineContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress based on container's position relative to center of screen
            // Start filling when container top enters screen, full when bottom reaches mid-screen
            let progress = (windowHeight / 1.5 - containerRect.top) / containerRect.height;

            // Clamp value between 0% and 100%
            let fillPercentage = Math.max(0, Math.min(1, progress)) * 100;
            progressLine.style.height = `${fillPercentage}%`;
        });

        const contactForm = document.getElementById("my-form");
        const modal = document.getElementById("projectModal");
        const modalContent = modal.querySelector(".modal-content");

        async function handleSubmit(event) {
            event.preventDefault(); // This stops the redirect to Formspree!

            const data = new FormData(event.target);

            fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Change your existing modal text to a success message
                    modalContent.querySelector("h2").innerHTML = "Message Sent!";
                    modalContent.querySelector("p").innerHTML = "Thanks! Your message has been received. I'll get back to you shortly.";

                    // Open the modal you already created
                    openModal();

                    contactForm.reset();
                } else {
                    alert("Oops! There was a problem. Please try again.");
                }
            }).catch(error => {
                alert("Oops! Connection error.");
            });
        }

        contactForm.addEventListener("submit", handleSubmit);