const destinations = [
    {
        name: "Sydney, Australia",
        description: "A beautiful coastal city with a relaxed atmosphere, featuring the Sydney Opera House, Harbour Bridge, and stunning beaches.",
        image: "https://lp-cms-production.imgix.net/2023-10/GettyImages-1483122199.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop",
        category: "beach"
    },
    {
        name: "Bondi Beach, Australia",
        description: "Famous beach known for its golden sands, surf culture, and breathtaking coastal walks.",
        image: "https://www.bondi38.com.au/wp-content/uploads/2023/01/bondi-beach-australia.jpg",
        category: "beach"
    },
    {
        name: "Waikiki Beach, Hawaii",
        description: "Popular beach destination with fantastic waves for surfing and vibrant beach life.",
        image: "https://cdn.sanity.io/images/nxpteyfv/goguides/e8c884a3f0e7ccaa7028c9aea9494b04e0b8b73b-1600x1066.jpg",
        category: "beach"
    },
    {
        name: "Temple of Heaven, China",
        description: "Historic complex of religious buildings in Beijing, known for its magnificent architecture and spiritual significance.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        category: "temple"
    },
    {
        name: "Angkor Wat, Cambodia",
        description: "Majestic temple complex famous for its grand scale and remarkable carvings.",
        image: "https://cdn.britannica.com/35/171035-050-8423095A/Angkor-Wat-Siemreab-Cambodia.jpg",
        category: "temple"
    },
    {
        name: "Golden Temple, India",
        description: "A sacred Sikh temple in Amritsar, celebrated for its stunning gold-covered exterior and peaceful surroundings.",
        image: "https://sacredsites.com/images/asia/india/punjab/Golden-Temple-1.webp",
        category: "temple"
    },

    {
        name: "Italy",
        description: "Known for rich history, art, delicious cuisine, and breathtaking landscapes.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        category: "country"
    },
    {
        name: "Brazil",
        description: "A vast country offering iconic landmarks like Christ the Redeemer and beautiful beaches.",
        image: "https://acko-cms.s3.ap-south-1.amazonaws.com/large_tourist_places_in_brazil_b9761848ed.png",
        category: "country"
    },
    {
        name: "Japan",
        description: "A fascinating country blending tradition and modernity with stunning cultural sites.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
        category: "country"
    }
];

const categoryMap = {
   
    "beach": "beach",
    "beaches": "beach",
    "beache": "beach",

    "temple": "temple",
    "temples": "temple",
    "templ": "temple", 
    
    "country": "country",
    "countries": "country",
    "countrys": "country",
    "countrie": "country" 
};

function searchPlaces() {
    let query = document.getElementById('searchBar').value.toLowerCase().trim();

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = "";

    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }

    const category = categoryMap[query];

    if (!category) {
        resultsContainer.innerHTML = `<p style="padding: 10px; color:#024; font-weight:600;">
            No results found. Please try keywords like beach, beaches, temple, temples, country, or countries.</p>`;
        resultsContainer.style.display = 'block';
        return;
    }

    const filtered = destinations.filter(dest => dest.category === category);

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p style="padding: 10px; color:#024; font-weight:600;">
            No results found for "${query}".</p>`;
        resultsContainer.style.display = 'block';
        return;
    }

    filtered.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('result-card');

        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <div class="content">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
                <button onclick="alert('Visit feature coming soon for ${place.name}!')">Visit</button>
            </div>
        `;

        resultsContainer.appendChild(card);
    });

    resultsContainer.style.display = 'block';
}

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('searchBar').value = '';
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'none';
});
document.getElementById('searchBar').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchPlaces();
    }
});
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('searchBar').value = '';
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'none';
});
