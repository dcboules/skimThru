document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const toggleText = document.getElementById('toggleText');
    const fontAwesomeIcon = document.getElementById('fontAwesomeIcon');
  
    toggleSwitch.addEventListener('change', function () {
      const isActive = toggleSwitch.checked;
      if (isActive) {
        toggleText.textContent = "View page normally";
        fontAwesomeIcon.style.display = 'none'; // Hide the glasses icon
      } else {
        toggleText.innerHTML = `<strong>R</strong>ead <strong>f</strong>ast`;
        fontAwesomeIcon.style.display = 'block'; // Show the glasses icon
      }
  
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleBold', isActive });
        }
      });
    });
});
