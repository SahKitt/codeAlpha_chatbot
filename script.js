function toggleForm() {
    var form = document.getElementById("loginSignupForm");
    var content = document.querySelector(".content");
  
    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
      content.style.marginLeft = "400px"; // Adjust margin-left value as needed
    } else {
      form.classList.add("hidden");
      content.style.marginLeft = "200px"; // Adjust margin-left value as needed
    }
  }
  
  function toggleTheme() {
    var body = document.body;
    body.classList.toggle("dark-theme");
  
    var themeBtn = document.getElementById("themeBtn");
    if (body.classList.contains("dark-theme")) {
      themeBtn.textContent = "Light Theme";
    } else {
      themeBtn.textContent = "Dark Theme";
    }
  }
  