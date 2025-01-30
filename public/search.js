<script>
    // Filterfunktion für Filme
    function filterMovies() {
        // Holen des Suchbegriffs und der ausgewählten Kategorie
        var input = document.getElementById('searchInput').value.toLowerCase();
        var selectedCategory = document.getElementById('categoryFilter').value.toLowerCase();
        var movieCards = document.querySelectorAll('.movie-card');

        // Durch alle Filme iterieren und die Filter anwenden
        movieCards.forEach(function(card) {
            var title = card.querySelector('h3').textContent.toLowerCase();
            var category = card.querySelector('.category').textContent.toLowerCase();

            // Film anzeigen, wenn er entweder den Suchbegriff im Titel oder in der Kategorie hat,
            // und zusätzlich die Kategorie mit der ausgewählten übereinstimmt
            if ((title.includes(input) || category.includes(input)) && 
                (selectedCategory === "" || category === selectedCategory)) {
                card.style.display = "block";  // Film anzeigen
            } else {
                card.style.display = "none";   // Film ausblenden
            }
        });
    }
</script>
