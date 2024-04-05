document.addEventListener('DOMContentLoaded', function () {
    // Fetch the CSV file
    fetch('Database/Drinks.csv')
        .then(response => response.text())
        .then(csv => {
            // Parse the CSV data
            const rows = csv.split('\n').map(row => row.split(','));

            // Get the table body
            const tableBody = document.getElementById('drinkTable').getElementsByTagName('tbody')[0];

            // Create table rows dynamically
            rows.forEach(row => {
		const newRow = tableBody.insertRow();

                // Add cells to the row
                row.forEach((cell, index) => {
                    const newCell = newRow.insertCell(index);

                    // Replaces table row index 0 with the corresponding drink image
                    if (index === 0) {
                        const img = document.createElement('img');
                        img.src = cell;
                        img.alt = row[1];
                        newCell.appendChild(img);
                    } else {
                        newCell.textContent = cell;
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching CSV file:', error));
});

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
