document.addEventListener('DOMContentLoaded', function() {
  // Load saved preferences
  loadPreferences();
  
  // Theme selection
  const themeCards = document.querySelectorAll('.theme-card');
  themeCards.forEach(card => {
      card.addEventListener('click', function() {
          const theme = this.getAttribute('data-theme');
          setTheme(theme);
          savePreferences({ theme });
      });
  });
  
  // Form submission
  const partyForm = document.getElementById('partyForm');
  partyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          date: document.getElementById('date').value,
          theme: document.body.classList.contains('birthday-theme') ? 'birthday' : 
                document.body.classList.contains('disco-theme') ? 'disco' : 'tropical'
      };
      
      // Save to localStorage
      savePreferences(formData);
      
      // Trigger celebration animation
      createConfetti();
      
      // Show success message
      alert('Party saved successfully! 🎉');
  });
  
  // Load preferences from localStorage
  function loadPreferences() {
      const savedData = localStorage.getItem('partyPreferences');
      if (savedData) {
          const preferences = JSON.parse(savedData);
          
          // Apply saved theme
          if (preferences.theme) {
              setTheme(preferences.theme);
          }
          
          // Fill form fields
          if (preferences.name) document.getElementById('name').value = preferences.name;
          if (preferences.email) document.getElementById('email').value = preferences.email;
          if (preferences.date) document.getElementById('date').value = preferences.date;
      }
  }
  
  // Save preferences to localStorage
  function savePreferences(data) {
      const existingData = localStorage.getItem('partyPreferences');
      let preferences = existingData ? JSON.parse(existingData) : {};
      
      // Merge new data with existing
      preferences = { ...preferences, ...data };
      
      localStorage.setItem('partyPreferences', JSON.stringify(preferences));
  }
  
  // Set theme function
  function setTheme(theme) {
      // Remove all theme classes
      document.body.classList.remove('birthday-theme', 'disco-theme', 'tropical-theme');
      
      // Add selected theme class
      document.body.classList.add(`${theme}-theme`);
  }
  
  // Create confetti animation
  function createConfetti() {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      const container = document.getElementById('confetti-container');
      
      // Clear previous confetti
      container.innerHTML = '';
      
      // Create 50 pieces of confetti
      for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          
          // Random properties
          const size = Math.random() * 10 + 5;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 2 + 2;
          
          // Apply styles
          confetti.style.width = `${size}px`;
          confetti.style.height = `${size}px`;
          confetti.style.backgroundColor = color;
          confetti.style.left = `${left}%`;
          confetti.style.animationDuration = `${animationDuration}s`;
          confetti.style.animationDelay = `${Math.random()}s`;
          
          container.appendChild(confetti);
      }
      
      // Remove confetti after animation completes
      setTimeout(() => {
          container.innerHTML = '';
      }, 3000);
  }
});