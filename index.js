// Total cost calculations
const productCostInput = document.getElementById('product');
const advCostInput = document.getElementById('AdvCost');
const perOrderCostDisplay = document.getElementById('perOrder');
const shippingCostInput = document.getElementById('ShippingCost');
const totalCostDisplay = document.getElementById('totalCost');

// Total order calculations
const InTranstInput = document.getElementById('InTranst');
const DeliveredInput = document.getElementById('Delivered');
const ReturnedInput = document.getElementById('Returned');
const totalOrderInput = document.getElementById('totalOrder');

// Total shipping cost and investment
const totalShippingCostDisplay = document.getElementById('totalShippingCost');
const TPurchaseCostDisplay = document.getElementById('TPurchaseCost');
const totalInvestmentDisplay = document.getElementById('totalInvestment');
const TotalAdsCostInput = document.getElementById('TotalAdsCost');

// Selling calculations
const sellingPriceInput = document.getElementById('sellingPrice');
const sellingPriceDisplay = document.getElementById('sellingDel');
const InTranstDisDisplay = document.getElementById('InTranstDis');
const ReturnAmtDisplay = document.getElementById('ReturnAmt');

// Profit and loss calculation
const profitLossDisplay = document.getElementById('profitLoss');

let totalOrder = 0;
let SellingDelPrice = 0;
let InTranstAmt = 0;
let returnAmount = 0;

function formatPriceWithCommas(amount) {
    return `Rs. ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Calculate total orders
function calculateTotalOrder() {
    const inTranst = parseFloat(InTranstInput.value) || 0;
    const delivered = parseFloat(DeliveredInput.value) || 0;
    const returned = parseFloat(ReturnedInput.value) || 0;

    totalOrder = inTranst + delivered + returned;
    totalOrderInput.textContent = formatPriceWithCommas(totalOrder);

    calculateTotalShippingCost();
    calculateTotalInvestment();
    calculateTotalPurchaseCost();
}

// Calculate total shipping cost
function calculateTotalShippingCost() {
    const shippingCost = parseFloat(shippingCostInput.value) || 0;
    const totalShippingCost = totalOrder * shippingCost;

    totalShippingCostDisplay.textContent = formatPriceWithCommas(totalShippingCost);
    calculateTotalInvestment();
}

// Calculate total investment
function calculateTotalInvestment() {
    const totalAdsCost = parseFloat(TotalAdsCostInput.value) || 0;
    const productCost = parseFloat(productCostInput.value) || 0;
    const totalPurchaseCost = totalOrder * productCost;

    const shippingCost = parseFloat(shippingCostInput.value) || 0;
    const totalShippingCost = totalOrder * shippingCost;

    const totalInvestment = totalPurchaseCost + totalShippingCost + totalAdsCost;
    totalInvestmentDisplay.textContent = formatPriceWithCommas(totalInvestment);
    TPurchaseCostDisplay.textContent = formatPriceWithCommas(totalPurchaseCost);
    totalShippingCostDisplay.textContent = formatPriceWithCommas(totalShippingCost);
    calculateTotalCostAndReturnAmt();
}

// Calculate total purchase cost
function calculateTotalPurchaseCost() {
    const productCost = parseFloat(productCostInput.value) || 0;
    const totalPurchaseCost = totalOrder * productCost;

    TPurchaseCostDisplay.textContent = formatPriceWithCommas(totalPurchaseCost);
}

// Calculate delivered selling amount
function calculateSellingDelAmt() {
    const sellingPrice = parseFloat(sellingPriceInput.value) || 0;
    const delivered = parseFloat(DeliveredInput.value) || 0;

    SellingDelPrice = sellingPrice * delivered;
    sellingPriceDisplay.textContent = formatPriceWithCommas(SellingDelPrice);
    calculateTotalCostAndReturnAmt();
}

// Calculate in-transit selling amount
function calculateInTranstAmt() {
    const sellingPrice = parseFloat(sellingPriceInput.value) || 0;
    const inTranst = parseFloat(InTranstInput.value) || 0;

    InTranstAmt = sellingPrice * inTranst;
    InTranstDisDisplay.textContent = formatPriceWithCommas(InTranstAmt);
    calculateTotalCostAndReturnAmt();
}

// Calculate return amount
function calculateReturnAmt() {
    const productCost = parseFloat(productCostInput.value) || 0;
    const returned = parseFloat(ReturnedInput.value) || 0;

    returnAmount = productCost * returned;
    ReturnAmtDisplay.textContent = formatPriceWithCommas(returnAmount);
    calculateTotalCostAndReturnAmt();
}

// Calculate total revenue and profit/loss
function calculateTotalCostAndReturnAmt() {
    const totalAmt = SellingDelPrice + InTranstAmt;
    const totalCostAmtDisplay = document.getElementById('totalCostAmt');

    totalCostAmtDisplay.textContent = formatPriceWithCommas(totalAmt);

    const totalInvestment = parseFloat(totalInvestmentDisplay.textContent.replace(/Rs\.\s|,/g, "")) || 0;
    const profitLoss = (returnAmount + totalAmt) - totalInvestment;
    profitLossDisplay.textContent = formatPriceWithCommas(profitLoss);
}

// Event listeners for real-time calculations
TotalAdsCostInput.addEventListener('input', calculateTotalInvestment);
productCostInput.addEventListener('input', calculateTotalInvestment);

InTranstInput.addEventListener('input', calculateTotalOrder);
DeliveredInput.addEventListener('input', calculateTotalOrder);
ReturnedInput.addEventListener('input', calculateTotalOrder);

sellingPriceInput.addEventListener('input', calculateSellingDelAmt);
DeliveredInput.addEventListener('input', calculateSellingDelAmt);

sellingPriceInput.addEventListener('input', calculateInTranstAmt);
InTranstInput.addEventListener('input', calculateInTranstAmt);

productCostInput.addEventListener('input', calculateReturnAmt);
ReturnedInput.addEventListener('input', calculateReturnAmt);
shippingCostInput.addEventListener('input', calculateTotalShippingCost);
