const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addBtn = document.getElementById('add-btn');
const transactionList = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateBalance() {
    let balance = 0;
    transactions.forEach(t => {
        balance += t.type === 'income' ? t.amount : -t.amount;
    });
    balanceEl.textContent = balance.toFixed(2);
}

function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((t, index) => {
        const li = document.createElement('li');
        li.classList.add(t.type);
        li.innerHTML = `
            ${t.desc} - ₹${t.amount} 
            <button onclick="deleteTransaction(${index})">❌</button>
        `;
        transactionList.appendChild(li);
    });
    updateBalance();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
}

addBtn.addEventListener('click', () => {
    const desc = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (!desc || isNaN(amount) || amount <= 0) {
        alert('Enter valid details');
        return;
    }

    const transaction = { desc, amount, type };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    descInput.value = '';
    amountInput.value = '';
    renderTransactions();
});

renderTransactions();