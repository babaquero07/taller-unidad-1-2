function goToHomePage() {
  window.location.href = window.location.pathname === '/index.html' ? "/home.html" : window.location.href + "home.html";
}

function goToCommentsPage() {
  window.location.href = window.location.pathname === '/index.html' ? '/comments.html' : window.location.href + "comments.html";
}
