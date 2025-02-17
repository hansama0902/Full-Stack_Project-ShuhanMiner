// chart.js - 负责从 API 获取数据并绘制图表

async function fetchData() {
    try {
        const response = await fetch("/api/prices"); // ✅ 修正 API 路径
        if (!response.ok) throw new Error("服务器返回错误");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ 获取数据失败:", error);
        return [];
    }
}
// 绘制线性图
async function drawChart() {
    const data = await fetchData();

    if (data.length === 0) {
        console.warn("⚠️ 无数据可展示");
        return;
    }

    const timestamps = data.map(d => new Date(d.timestamp).toLocaleTimeString());
    const prices = data.map(d => d.price);

    const canvas = document.getElementById("priceChart");
    const ctx = canvas.getContext("2d");

    const padding = 50;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const xStep = width / (timestamps.length - 1);

    function getY(price) {
        return canvas.height - padding - ((price - minPrice) / (maxPrice - minPrice)) * height;
    }

    function getX(index) {
        return padding + index * xStep;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 画坐标轴
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(padding, padding);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 先画折线，再画点
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;

    for (let i = 0; i < timestamps.length; i++) {
        const x = getX(i);
        const y = getY(prices[i]);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke(); // 画折线

    // 画点
    for (let i = 0; i < timestamps.length; i++) {
        const x = getX(i);
        const y = getY(prices[i]);

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#000";
        ctx.fillText(`$${prices[i]}`, x - 10, y - 10);
    }

    // 绘制时间标签
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    for (let i = 0; i < timestamps.length; i++) {
        const x = getX(i);
        ctx.fillText(timestamps[i], x - 20, canvas.height - 30);
    }

    ctx.fillStyle = "#000";
    ctx.fillText(`$${maxPrice}`, padding - 40, getY(maxPrice));
    ctx.fillText(`$${minPrice}`, padding - 40, getY(minPrice));
}

// 运行绘图
document.addEventListener("DOMContentLoaded", drawChart);
