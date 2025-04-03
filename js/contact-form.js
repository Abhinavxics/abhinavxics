document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const formStatus = document.getElementById('formStatus');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        
        // Change button state to indicate loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...';
        
        // Get form data
        const formData = new FormData(contactForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        
        // Here you would typically send the data to a server
        // For demonstration, we'll simulate a request with setTimeout
        setTimeout(() => {
            // Simulate successful form submission (90% success rate for demo)
            const isSuccess = Math.random() < 0.9;
            
            if (isSuccess) {
                // Show success message
                formStatus.classList.remove('hidden');
                successMessage.classList.remove('hidden');
                errorMessage.classList.add('hidden');
                
                // Reset form
                contactForm.reset();
                
                // Log the data that would be sent (for testing)
                console.log('Form submitted successfully with data:', formDataObject);
                console.log('Form will be sent to: Abhinavchaurasia032@gmail.com');
            } else {
                // Show error message
                formStatus.classList.remove('hidden');
                errorMessage.classList.remove('hidden');
                successMessage.classList.add('hidden');
                
                console.error('Form submission failed (simulated error)');
            }
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i> Send Message';
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }, 1500); // Simulate network delay of 1.5 seconds
    }
    
    // Real implementation with a server might look like:
    /*
    function handleSubmit(event) {
        event.preventDefault();
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...';
        
        const formData = new FormData(contactForm);
        
        fetch('your-server-endpoint', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Recipient-Email': 'Abhinavchaurasia032@gmail.com'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            formStatus.classList.remove('hidden');
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            contactForm.reset();
        })
        .catch(error => {
            formStatus.classList.remove('hidden');
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
            console.error('Error:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i> Send Message';
            
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        });
    }
    */
});
