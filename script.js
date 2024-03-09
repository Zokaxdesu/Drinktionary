document.addEventListener('DOMContentLoaded', function () {
    // Fetch the CSV file for drinks
    fetch('Database/Drinks.csv')
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split('\n').map(row => row.split(','));
            const header = rows.shift();
            const tableBody = document.getElementById('drinkTable').getElementsByTagName('tbody')[0];

            // Create table rows dynamically for drinks
            rows.forEach(row => {
                const newRow = tableBody.insertRow();

                row.forEach((cell, index) => {
                    const newCell = newRow.insertCell(index);

                    if (index === 0) {
                        const img = document.createElement('img');
                        img.src = cell;
                        img.alt = 'Drink Image';
                        newCell.appendChild(img);
                    } else if (index === 7 && row[index] !== '-') {
                        const img = document.createElement('img');
                        img.src = row[index];
                        img.alt = 'Rocks';
                        newCell.appendChild(img);
                    } else if (index === 8 && row[index] !== '-') {
                        const img = document.createElement('img');
                        img.src = row[index];
                        img.alt = 'Aged';
                        newCell.appendChild(img);
                    } else if (index === 9 && row[index] !== '-') {
                        const img = document.createElement('img');
                        img.src = row[index];
                        img.alt = 'Blend';
                        newCell.appendChild(img);
                    } else {
                        newCell.textContent = cell;
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching Drinks.csv file:', error));

    // Fetch the CSV file for banners
    fetch('Database/Banners.csv')
        .then(response => response.text())
        .then(csv => {
            const bannerPaths = csv.split('\n').map(path => path.trim());
            createBannerSlideshow(bannerPaths);
        })
        .catch(error => console.error('Error fetching Banners.csv file:', error));

    // Fetch the CSV file for icons
    fetch('Database/Icons.csv')
        .then(response => response.text())
        .then(csv => {
            const iconPaths = csv.split('\n').map(path => path.trim());
            createNavbarIcons(iconPaths);
        })
        .catch(error => console.error('Error fetching Icons.csv file:', error));
});

function createBannerSlideshow(bannerPaths) {
    let bannerIndex = 0;

    function showBanner() {
        const bannerContainer = document.getElementById('banner-slideshow-container');
        const bannerPath = bannerPaths[bannerIndex % bannerPaths.length];

        // Create a new anchor element with the 'banner-link' class
        const bannerLink = document.createElement('a');
        bannerLink.href = extractBannerLink(bannerPath);
        bannerLink.target = '_blank'; // Open link in a new tab

        // Create a new image element with the 'banner-slide' class
        const bannerImg = document.createElement('img');
        bannerImg.src = extractBannerPath(bannerPath);
        bannerImg.alt = 'Banner';
        bannerImg.className = 'banner-slide';

        // Append the image to the anchor and the anchor to the container
        bannerLink.appendChild(bannerImg);
        bannerContainer.innerHTML = ''; // Clear the container
        bannerContainer.appendChild(bannerLink);

        bannerIndex++;
        setTimeout(showBanner, 7000); // Change banner every 5 seconds
    }

    showBanner(); // Start the banner slideshow
}

function extractBannerPath(bannerPath) {
    return bannerPath.split(',')[0].trim(); // Extract the banner path before the comma
}

function extractBannerLink(bannerPath) {
    const linkInfo = bannerPath.split(',')[1]; // Extract the link info after the comma
    return linkInfo ? linkInfo.trim() : '#'; // Use the link if present, otherwise use '#'
}

function createNavbarIcons(iconPaths) {
    const navbar = document.getElementById('navbar');

    iconPaths.forEach(iconPath => {
        const [path, href] = iconPath.split(',');
        const iconImg = document.createElement('img');
        iconImg.src = path.trim();
        iconImg.alt = 'Navbar Icon';
        iconImg.className = 'navbar-icon';
        iconImg.addEventListener('click', () => window.open(href.trim(), '_blank')); // Open in a new tab on click
        navbar.appendChild(iconImg);
    });
}

function filterTable() {
    const input = document.getElementById('search').value.toLowerCase();
    const table = document.getElementById('drinkTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const name = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        if (name.includes(input)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}
