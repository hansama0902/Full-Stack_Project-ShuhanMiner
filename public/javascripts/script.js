document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('machine-list')) {
    fetchMiners();
    attachFormListener();
  } else if (document.getElementById('update-machine-form')) {
    fetchMinerDetails();
    attachUpdateListener();
  }
});

async function fetchMiners() {
  const response = await fetch('/api/miners');
  const miners = await response.json();

  const machineList = document.getElementById('machine-list');
  if (!machineList) return;

  machineList.innerHTML = miners
    .map(
      (m) => `
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
                <button class="btn btn-warning btn-sm edit-machine" data-id="${m._id}">Update</button>
                <button class="btn btn-danger btn-sm delete-machine" data-id="${m._id}">Delete</button>
            </td>
        </tr>
    `
    )
    .join('');

  attachEventListeners();
}

document.getElementById('search-btn').addEventListener('click', () => {
  const query = document.getElementById('search').value.trim().toLowerCase();
  document.querySelectorAll('#machine-list tr').forEach((row) => {
    const rowText = row.innerText.trim().toLowerCase();
    row.style.display = rowText.includes(query) ? '' : 'none';
  });
});

function attachFormListener() {
  const form = document.getElementById('add-machine-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newMiner = {
      ip: document.getElementById('ip').value,
      seat: document.getElementById('seat').value,
      model: document.getElementById('model').value,
      workingMode: document.getElementById('workingMode').value,
      hashrate: parseFloat(document.getElementById('hashrate').value),
      status: document.getElementById('status').value,
      hashboardStatus: document.getElementById('hashboardStatus').value,
      temperature: parseFloat(document.getElementById('temperature').value),
      fanSpeed: parseInt(document.getElementById('fanSpeed').value),
      customer: document.getElementById('customer').value,
      miningPool: document.getElementById('miningPool').value,
    };

    await fetch('/api/miners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMiner),
    });

    fetchMiners();
    form.reset();
  });
}

function attachEventListeners() {
  document.querySelectorAll('.edit-machine').forEach((button) => {
    button.addEventListener('click', (event) => {
      const minerId = event.target.getAttribute('data-id');
      if (minerId) window.location.href = `update.html?id=${minerId}`;
    });
  });

  document.querySelectorAll('.delete-machine').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const minerId = event.target.getAttribute('data-id');
      if (!minerId || !confirm('⚠️ 确定要删除这台矿机吗？')) return;

      await fetch(`/api/miners/${minerId}`, { method: 'DELETE' });
      fetchMiners();
    });
  });
}

async function fetchMinerDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const minerId = urlParams.get('id');

  if (!minerId) {
    window.location.href = 'index.html';
    return;
  }

  const response = await fetch(`/api/miners/${minerId}`);
  if (!response.ok) {
    window.location.href = 'index.html';
    return;
  }

  const miner = await response.json();

  document.getElementById('ip').value = miner.ip || '';
  document.getElementById('seat').value = miner.seat || '';
  document.getElementById('model').value = miner.model || '';
  document.getElementById('hashrate').value = miner.hashrate || '';
  document.getElementById('status').value = miner.status || '';
  document.getElementById('temperature').value = miner.temperature || '';
  document.getElementById('fanSpeed').value = miner.fanSpeed || '';
  document.getElementById('customer').value = miner.customer || '';
  document.getElementById('miningPool').value = miner.miningPool || '';

  document.getElementById('workingMode').value = miner.workingMode || 'Normal';
  document.getElementById('hashboardStatus').value =
    miner.hashboardStatus || 'Good';
}

function attachUpdateListener() {
  const form = document.getElementById('update-machine-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const minerId = urlParams.get('id');
    if (!minerId) return;

    const updatedMiner = {
      ip: document.getElementById('ip').value.trim(),
      seat: document.getElementById('seat').value.trim(),
      model: document.getElementById('model').value.trim(),
      workingMode: document.getElementById('workingMode').value,
      hashrate: parseFloat(document.getElementById('hashrate').value) || 0,
      status: document.getElementById('status').value.trim(),
      hashboardStatus: document.getElementById('hashboardStatus').value,
      temperature:
        parseFloat(document.getElementById('temperature').value) || 0,
      fanSpeed: parseInt(document.getElementById('fanSpeed').value) || 0,
      customer: document.getElementById('customer').value.trim(),
      miningPool: document.getElementById('miningPool').value.trim(),
    };

    const response = await fetch(`/api/miners/${minerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMiner),
    });

    if (response.ok) window.location.href = 'index.html';
  });
}
