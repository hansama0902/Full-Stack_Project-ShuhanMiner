// chart.js - 负责绘制电价走势图

export async function fetchData() {
  try {
    const response = await fetch('/api/prices');
    if (!response.ok) throw new Error('Server returned an error');
    return await response.json();
  } catch (error) {
    console.error('❌ Failed to fetch data:', error);
    return [];
  }
}

export async function drawChart() {
  const data = await fetchData();
  if (data.length === 0) return console.warn('⚠️ No data to display');

  const timestamps = data.map((d) => {
    const date = new Date(d.timestamp);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  const prices = data.map((d) => parseFloat(d.price));

  const canvas = document.getElementById('priceChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 500;

  const padding = 60;
  const width = canvas.width - padding * 2;
  const height = canvas.height - padding * 2;

  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const xStep = width / (timestamps.length - 1);

  function getY(price) {
    return (
      canvas.height -
      padding -
      ((price - minPrice) / (maxPrice - minPrice)) * height
    );
  }

  function getX(index) {
    return padding + index * xStep;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 画坐标轴
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding); // X 轴
  ctx.moveTo(padding, canvas.height - padding);
  ctx.lineTo(padding, padding); // Y 轴
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 画数据线
  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  for (let i = 0; i < timestamps.length; i++) {
    const x = getX(i);
    const y = getY(prices[i]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 画数据点
  for (let i = 0; i < timestamps.length; i++) {
    const x = getX(i);
    const y = getY(prices[i]);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // **优化 X 轴时间显示**
  ctx.fillStyle = '#000';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const step = Math.ceil(timestamps.length / 10);
  for (let i = 0; i < timestamps.length; i += step) {
    const x = getX(i);
    ctx.fillText(timestamps[i], x, canvas.height - 40);
  }

  // **在 Y 轴上标注最高价和最低价**
  ctx.fillStyle = 'black';
  ctx.font = '14px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(
    `Highest: $${maxPrice.toFixed(2)}`,
    padding - 15,
    getY(maxPrice)
  );
  ctx.fillText(`Lowest: $${minPrice.toFixed(2)}`, padding - 15, getY(minPrice));
}
