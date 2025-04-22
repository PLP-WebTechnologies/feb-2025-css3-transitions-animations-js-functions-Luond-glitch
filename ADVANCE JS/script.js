// Check if the user prefers the animation to be enabled or disabled
window.onload = () => {
    // Retrieve the stored preference from localStorage (default to 'true' if not set)
    let isAnimationEnabled = localStorage.getItem('animationEnabled') === 'true';
  
    // Get the button element
    const button = document.getElementById('myButton');
  
    // Apply animation if enabled
    if (isAnimationEnabled) {
      button.classList.add('animate');
    }
  
    // Event listener for the button click to toggle the animation
    button.addEventListener('click', () => {
      // Toggle the animation on or off
      if (button.classList.contains('animate')) {
        button.classList.remove('animate');
        localStorage.setItem('animationEnabled', 'false'); // Save the preference
      } else {
        button.classList.add('animate');
        localStorage.setItem('animationEnabled', 'true'); // Save the preference
      }
    });
  };
  