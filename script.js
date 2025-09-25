// MARKUP CONFIGURATION
// Change this value to adjust the markup percentage
// Example: 1.15 = 15% markup, 1.20 = 20% markup, etc.
const markupPercentage = 1.15;

// API endpoint
const apiUrl = 'https://www.okeconnect.com/harga/json?id=905ccd028329b0a&produk=kuota_xl';

// DOM elements
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const packagesContainer = document.getElementById('packages-container');

// Function to apply markup to the original price
function applyMarkup(originalPrice) {
    return Math.round(originalPrice * markupPercentage);
}

// Format price to Indonesian Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Create package card HTML
function createPackageCard(packageData) {
    const originalPrice = parseInt(packageData.harga);
    const markedUpPrice = applyMarkup(originalPrice);
    
    return `
        <div class="package-card">
            <div class="package-name">${packageData.produk}</div>
            <div class="package-price">${formatPrice(markedUpPrice)}</div>
            <div class="package-description">${packageData.keterangan}</div>
            <div class="package-meta">
                <span>Original: ${formatPrice(originalPrice)}</span>
                <span>Markup: ${(markupPercentage - 1) * 100}%</span>
            </div>
        </div>
    `;
}

// Fetch data from API
async function fetchDataPackages() {
    try {
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        packagesContainer.innerHTML = '';
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Hide loading message
        loadingElement.style.display = 'none';
        
        // Check if data is valid and has items
        if (data && data.length > 0) {
            // Create and append package cards
            data.forEach(packageItem => {
                const cardHTML = createPackageCard(packageItem);
                packagesContainer.innerHTML += cardHTML;
            });
        } else {
            throw new Error('No data received from API');
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', fetchDataPackages);
