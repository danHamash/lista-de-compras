
    document.addEventListener('DOMContentLoaded', () => {
    loadItems('alimentos');
    loadItems('limpeza');
});

function addItem(section) {
    const input = document.getElementById(`input${capitalizeFirstLetter(section)}`);
    const itemText = input.value.trim();

    if (itemText !== '') {
        const sectionDiv = document.querySelector(`#${section}`);
        const newItemDiv = document.createElement('div');
        newItemDiv.classList.add('item-container');
        newItemDiv.innerHTML = `
            <input type="checkbox"> 
            <label>${itemText}</label>
            <input type="number" class="value" placeholder="Valor">
            <button onclick="deleteItem(this, '${section}', '${itemText}')">Excluir</button>
        `;
        sectionDiv.insertBefore(newItemDiv, input.nextSibling);

        saveItem(section, itemText);
        input.value = '';
    } else {
        alert('Por favor, digite um item!');
    }
}

function saveItem(section, itemText) {
    let items = JSON.parse(localStorage.getItem(section)) || [];
    items.push(itemText);
    localStorage.setItem(section, JSON.stringify(items));
}

function loadItems(section) {
    const items = JSON.parse(localStorage.getItem(section)) || [];
    const sectionDiv = document.querySelector(`#${section}`);

    items.forEach(item => {
        const newItemDiv = document.createElement('div');
        newItemDiv.classList.add('item-container');
        newItemDiv.innerHTML = `
            <input type="checkbox"> 
            <label>${item}</label>
            <input type="number" class="value" placeholder="Valor">
            <button onclick="deleteItem(this, '${section}', '${item}')">Excluir</button>
        `;
        sectionDiv.appendChild(newItemDiv);
    });
}

function deleteItem(button, section, itemText) {
    
    const itemDiv = button.parentElement;
    itemDiv.remove();

    
    let items = JSON.parse(localStorage.getItem(section)) || [];
    items = items.filter(item => item !== itemText);
    localStorage.setItem(section, JSON.stringify(items));
}

function calculateTotal(section) {
    const sectionDiv = document.querySelector(`#${section}`);
    const values = sectionDiv.querySelectorAll('.value');
    let total = 0;

    values.forEach(input => {
        const value = parseFloat(input.value) || 0;
        total += value;
    });

    const resultDiv = document.getElementById(`result-${section}`);
    resultDiv.textContent = `Total da seção: R$ ${total.toFixed(2)}`;
}

function calculateGrandTotal() {
    const allSections = ['alimentos', 'limpeza'];
    let grandTotal = 0;

    allSections.forEach(section => {
        const sectionDiv = document.querySelector(`#${section}`);
        const values = sectionDiv.querySelectorAll('.value');

        values.forEach(input => {
            const value = parseFloat(input.value) || 0;
            grandTotal += value;
        });
    });

    const resultDiv = document.getElementById('result-geral');
    resultDiv.textContent = `Total Geral: R$ ${grandTotal.toFixed(2)}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

