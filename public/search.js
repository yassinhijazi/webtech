// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector(".search-bar input");  // Das Suchfeld
    const movieCards = document.querySelectorAll(".movie-card");  // Alle Filmkarten

    // Funktion zum Filtern der Filme
    function filterMovies() {
        const query = searchInput.value.toLowerCase();  // Eingabewert im Suchfeld
        movieCards.forEach(function(card) {
            const title = card.querySelector("h3").textContent.toLowerCase();  // Titel des Films
            const category = card.querySelector(".category").textContent.toLowerCase();  // Kategorie des Films
            const description = card.querySelector(".description").textContent.toLowerCase();  // Beschreibung des Films

            // Überprüfe, ob der Suchbegriff im Titel, der Kategorie oder der Beschreibung vorkommt
            if (title.includes(query) || category.includes(query) || description.includes(query)) {
                card.style.display = "";  // Zeige den Film an, wenn es eine Übereinstimmung gibt
            } else {
                card.style.display = "none";  // Verstecke den Film, wenn es keine Übereinstimmung gibt
            }
        });
    }

    // Füge einen Event Listener hinzu, der die Filter-Funktion bei jeder Eingabe im Suchfeld ausführt
    searchInput.addEventListener("input", filterMovies);
});
