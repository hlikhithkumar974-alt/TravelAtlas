<script>
  // Utility: Convert keyword input to lowercase and trim spaces
  function normalizeKeyword(keyword) {
    return keyword.toLowerCase().trim();
  }

  // Match keyword variations
  function matchKeyword(keyword, target) {
    keyword = normalizeKeyword(keyword);
    target = normalizeKeyword(target);
    if (target.includes(keyword)) return true;

    const plurals = {
      beach: ["beach", "beaches"],
      temple: ["temple", "temples"],
      country: ["country", "countries"],
    };

    for (const [key, variations] of Object.entries(plurals)) {
      if (key === keyword && variations.includes(target)) {
        return true;
      }
      if (variations.includes(keyword) && target.includes(key)) {
        return true;
      }
    }
    return false;
  }

  // Show results on page
  function displayResults(data, keyword) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    keyword = normalizeKeyword(keyword);
    let foundAny = false;

    data.forEach(country => {

      const countryMatch = matchKeyword(keyword, country.name);
      const matchingCities = country.cities.filter(city => matchKeyword(keyword, city.name) || matchKeyword(keyword, city.description));

      if (countryMatch || matchingCities.length > 0) {
        foundAny = true;

        const countrySection = document.createElement('section');
        countrySection.style.marginBottom = '40px';


        const countryTitle = document.createElement('h2');
        countryTitle.textContent = country.name;
        countryTitle.style.fontSize = '28px';
        countryTitle.style.borderBottom = '2px solid #0a6c75';
        countryTitle.style.paddingBottom = '6px';
        countryTitle.style.marginBottom = '20px';
        countrySection.appendChild(countryTitle);

        const cityContainer = document.createElement('div');
        cityContainer.style.display = 'flex';
        cityContainer.style.flexWrap = 'wrap';
        cityContainer.style.gap = '20px';

        const citiesToDisplay = countryMatch ? country.cities : matchingCities;
        citiesToDisplay.forEach(city => {
          const cityCard = document.createElement('div');
          cityCard.style.width = '300px';
          cityCard.style.backgroundColor = 'rgba(0, 41, 52, 0.75)';
          cityCard.style.borderRadius = '6px';
          cityCard.style.overflow = 'hidden';
          cityCard.style.boxShadow = '0 0 12px rgba(0,41,52,0.9)';


          const img = document.createElement('img');
          img.src = city.imageUrl;
          img.alt = city.name;
          img.style.width = '100%';
          img.style.height = '180px';
          img.style.objectFit = 'cover';
          cityCard.appendChild(img);

          const info = document.createElement('div');
          info.style.padding = '12px';

          const cityName = document.createElement('h3');
          cityName.textContent = city.name;
          cityName.style.marginBottom = '8px';
          cityName.style.fontSize = '20px';
          cityName.style.color = '#0a6c75';
          info.appendChild(cityName);

          const desc = document.createElement('p');
          desc.textContent = city.description;
          desc.style.fontSize = '14px';
          desc.style.color = 'white';
          info.appendChild(desc);

          cityCard.appendChild(info);
          cityContainer.appendChild(cityCard);
        });

        countrySection.appendChild(cityContainer);
        resultsContainer.appendChild(countrySection);
      }
    });

    if (!foundAny) {
      resultsContainer.innerHTML = `<p style="color:#f55; font-weight:bold; font-size:18px;">No results found for "${keyword}". Please try a different keyword.</p>`;
    }
  }

  // Fetch and store JSON data
  let travelData = [];

  fetch('travel_atlas_api.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(jsonData => {
      travelData = jsonData;
      console.log('Travel data loaded:', travelData);
    })
    .catch(error => {
      console.error('Error fetching the JSON data:', error);
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '<p style="color:red;">Unable to load travel recommendation data.</p>';
    });

  // Search button and input listeners
  const searchBtn = document.getElementById('searchBtn');
  const searchBar = document.getElementById('searchBar');

  if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', () => {
      const keyword = searchBar.value.trim();
      if (keyword === '') {
        alert('Please enter a keyword or destination to search.');
        return;
      }
      displayResults(travelData, keyword);
    });

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchBar.value = '';
        document.getElementById('results').innerHTML = '';
      });
    }
  } else {
    console.warn('Search button or search bar element missing!');
  }
</script>