// MARKUP CONFIGURATION
const markupPercentage = 1.15;

// Data paket (static - bisa diupdate manual)
const packageData = [
    {
        "produk": "XL Combo Lite 1GB",
        "harga": "10000",
        "keterangan": "1GB All Jaringan + 1GB Apps + 1GB Malam"
    },
    {
        "produk": "XL Combo 2GB",
        "harga": "20000", 
        "keterangan": "2GB All Jaringan + 2GB Apps + 2GB Malam"
    },
    {
        "produk": "XL Combo 5GB",
        "harga": "35000",
        "keterangan": "5GB All Jaringan + 5GB Apps + 5GB Malam"
    },
    {
        "produk": "XL Combo 10GB",
        "harga": "60000",
        "keterangan": "10GB All Jaringan + 10GB Apps + 10GB Malam"
    },
    {
        "produk": "XL Combo 15GB",
        "harga": "80000",
        "keterangan": "15GB All Jaringan + 15GB Apps + 15GB Malam"
    },
    {
        "produk": "XL Combo 25GB",
        "harga": "100000",
        "keterangan": "25GB All Jaringan + 25GB Apps + 25GB Malam"
    }
];

// DOM elements
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const packagesContainer = document.getElementById('packages-container');

function applyMarkup(originalPrice) {
    return Math.round(originalPrice * markupPercentage);
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

function createPackageCard(packageData) {
    const originalPrice = parseInt(packageData.harga);
    const markedUpPrice = applyMarkup(originalPrice);
    
    return `
        <div class="package-card">
            <div class="package-name">${packageData.produk}</div>
            <div class="package-price">${formatPrice(markedUpPrice)}</div>
            <div class="package-description">${packageData.keterangan}</div>
            <div class="package-meta">
                <span>Asli: ${formatPrice(originalPrice)}</span>
                <span>Markup: ${(markupPercentage - 1) * 100}%</span>
            </div>
        </div>
    `;
}

function displayData() {
    loadingElement.style.display = 'none';
    errorElement.style.display = 'none';
    
    packagesContainer.innerHTML = '';
    
    packageData.forEach(packageItem => {
        const cardHTML = createPackageCard(packageItem);
        packagesContainer.innerHTML += cardHTML;
    });
}

// Simulasikan loading
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(displayData, 1000);
});
