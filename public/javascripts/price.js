// price.js - 负责更新、添加和删除电价，并导入 `drawChart()`
import { drawChart } from './chart.js';

async function updateLatestPrice() {
  const newPrice = prompt('Enter the new electricity price:');
  if (newPrice === null || isNaN(newPrice)) return alert('Invalid price!');

  try {
    const response = await fetch('/api/prices/latest', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    });

    if (!response.ok) throw new Error('Failed to update price');

    drawChart(); // Refresh chart
  } catch (error) {
    console.error('❌ Error updating price:', error);
  }
}

async function addNewPrice() {
  const newPrice = prompt('Enter the new electricity price:');
  if (newPrice === null || isNaN(newPrice)) return alert('Invalid price!');

  try {
    const response = await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    });

    if (!response.ok) throw new Error('Failed to add new price');

    drawChart(); // Refresh chart
  } catch (error) {
    console.error('❌ Error adding new price:', error);
  }
}

async function deleteLatestPrice() {
  if (!confirm('Are you sure you want to delete the latest price?')) return;

  try {
    const response = await fetch('/api/prices/latest', { method: 'DELETE' });

    if (!response.ok) throw new Error('Failed to delete price');

    drawChart(); // Refresh chart
  } catch (error) {
    console.error('❌ Error deleting latest price:', error);
  }
}

// 🔹 事件监听器
document
  .getElementById('updatePrice')
  .addEventListener('click', updateLatestPrice);
document.getElementById('addPrice').addEventListener('click', addNewPrice);
document
  .getElementById('deletePrice')
  .addEventListener('click', deleteLatestPrice);

// **页面加载后绘制图表**
document.addEventListener('DOMContentLoaded', drawChart);
