async function loadCSV() {
    const response = await fetch('./script/dati.csv');
    const data = await response.text();

    const rows = data.split('\n');
    
    const headers = rows.shift().split(','); 
    const tableBody = document.querySelector('#data-table');

    rows.forEach(row => {
        if (row.trim()) {
            const cells = row.split(',');
            const valore = parseFloat(cells[1]);

            const valore30 = 300;
            const valore70 = valore - valore30;

            const tr = document.createElement('tr');
            cells.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell.trim();
                tr.appendChild(td);
            });

            const td30 = document.createElement('td');
            td30.classList.add('spendibile');
            td30.textContent = valore30;
            const td70 = document.createElement('td');
            td70.textContent = valore70;
            td70.classList.add('risparmi');

            tr.appendChild(td30);
            tr.appendChild(td70);

            tableBody.appendChild(tr);
        }
    });
    risSpe();
}

function risSpe() {
    let risparmi = document.querySelectorAll('.risparmi');
    let spendibile = document.querySelectorAll('.spendibile');
    let risp = 0;
    let spen = 0;
    let totale = 0;

    for (let r of risparmi) {
        risp += parseFloat(r.innerHTML);
    }

    for (let s of spendibile) {
        spen += parseFloat(s.innerHTML);
    }

    totale = spen + risp;

    let ri = document.getElementById('risparmi');
    let sp = document.getElementById('spendibile');
    let to = document.getElementById('totale');

    ri.innerHTML = "Risparmi: " + risp;
    sp.innerHTML = "Spendibile: " + spen;
    to.innerHTML = "Totale: " + totale;
}

loadCSV();