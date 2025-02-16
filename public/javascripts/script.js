// public/javascripts/script.js - 交互逻辑
async function fetchMiners() {
    const response = await fetch('/api/miners');
    const miners = await response.json();
    const machineList = document.getElementById('machine-list');
    machineList.innerHTML = miners.map(m => `
        <tr data-id="${m._id}">
            <td>${m.ip}</td>
            <td>${m.seat}</td>
            <td>${m.model}</td>
            <td>${m.workingMode}</td>
            <td>${m.hashrate}</td>
            <td>${m.status}</td>
            <td>${m.hashboardStatus}</td>
            <td>${m.temperature}</td>
            <td>${m.fanSpeed}</td>
            <td>${m.customer}</td>
            <td>${m.miningPool}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-machine" data-ip="${m.ip}"> Update</button>
                <button class="btn btn-danger btn-sm delete-machine" data-ip="${m.ip}">Delete</button>
            </td>
        </tr>
    `).join('');
    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll('.delete-machine').forEach(button => {
        button.addEventListener('click', async (event) => {
            const row = event.target.closest("tr");
            const minerId = row.getAttribute("data-id"); 
            if (!minerId) {
                console.error("Error: minerId is null");
                return;
            }    
            await fetch(`/api/miners/${minerId}`, { method: "DELETE" });
            fetchMiners();
            
        });
    });
    document.getElementById('add-machine-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const newMiner = {
        ip: document.getElementById('ip').value,
        seat: document.getElementById('seat').value,
        model: document.getElementById('model').value,
        workingMode: document.getElementById('workingMode').value,
        hashrate: document.getElementById('hashrate').value,
        status: document.getElementById('status').value,
        hashboardStatus: document.getElementById('hashboardStatus').value,
        temperature: document.getElementById('temperature').value,
        fanSpeed: document.getElementById('fanSpeed').value,
        customer: document.getElementById('customer').value,
        miningPool: document.getElementById('miningPool').value
    };
    await fetch('/api/miners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMiner)
    });
    fetchMiners();
    document.getElementById('add-machine-form').reset();
});
    document.querySelectorAll('.edit-machine').forEach(button => {
        button.addEventListener('click', async (event) => {
            const ip = event.target.getAttribute('data-ip');
            const newIP = prompt('Enter new IP address:', ip);
            if (newIP && newIP !== ip) {
                await fetch(`/api/miners/${ip}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newIP })
                });
                fetchMiners();
            }
        });
    });
}

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('#machine-list tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
});

document.addEventListener('DOMContentLoaded', fetchMiners);
// add-machine
document.getElementById('add-machine-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const newMiner = {
        ip: document.getElementById('ip').value,
        seat: document.getElementById('seat').value,
        model: document.getElementById('model').value,
        workingMode: document.getElementById('workingMode').value,
        hashrate: document.getElementById('hashrate').value,
        status: document.getElementById('status').value,
        hashboardStatus: document.getElementById('hashboardStatus').value,
        temperature: document.getElementById('temperature').value,
        fanSpeed: document.getElementById('fanSpeed').value,
        customer: document.getElementById('customer').value,
        miningPool: document.getElementById('miningPool').value
    };
    await fetch('/api/miners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMiner)
    });
    fetchMiners();
    document.getElementById('add-machine-form').reset();
});
