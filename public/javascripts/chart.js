// chart.js - Handles fetching data and rendering the chart

async function fetchData() {
    try {
        const response = await fetch("/api/prices"); // ✅ Fetch from API
        if (!response.ok) throw new Error("Server returned an error");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Failed to fetch data:", error);
        return [];
    }
}

// 🔹 Function to update the latest price
async function updateLatestPrice() {
    const newPrice = prompt("Enter the new electricity price:");
    if (newPrice === null || isNaN(newPrice)) return alert("Invalid price!");

    try {
        const response = await fetch("/api/prices/latest", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: parseFloat(newPrice) })
        });

        if (!response.ok) throw new Error("Failed to update price");

        drawChart(); // Refresh chart
    } catch (error) {
        console.error("❌ Error updating price:", error);
    }
}

// 🔹 Function to add a new price
async function addNewPrice() {
    const newPrice = prompt("Enter the new electricity price:");
    if (newPrice === null || isNaN(newPrice)) return alert("Invalid price!");

    try {
        const response = await fetch("/api/prices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: parseFloat(newPrice) })
        });

        if (!response.ok) throw new Error("Failed to add new price");

        drawChart(); // Refresh chart
    } catch (error) {
        console.error("❌ Error adding new price:", error);
    }
}

// 🔹 Function to delete the latest price
async function deleteLatestPrice() {
    if (!confirm("Are you sure you want to delete the latest price?")) return;

    try {
        const response = await fetch("/api/prices/latest", { method: "DELETE" });

        if (!response.ok) throw new Error("Failed to delete price");

        drawChart(); // Refresh chart
    } catch (error) {
        console.error("❌ Error deleting latest price:", error);
    }
}

// 🔹 Event listeners for buttons
document.getElementById("updatePrice").addEventListener("click", updateLatestPrice);
document.getElementById("addPrice").addEventListener("click", addNewPrice);
document.getElementById("deletePrice").addEventListener("click", deleteLatestPrice);

async function drawChart() {
    const data = await fetchData();
    if (data.length === 0) return console.warn("⚠️ No data to display");

    const timestamps = data.map(d => {
        const date = new Date(d.timestamp);
        if (isNaN(date.getTime())) {
            console.warn("⚠️ Invalid date detected:", d.timestamp);
            return "Invalid Date";
        }
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const prices = data.map(d => parseFloat(d.price).toFixed(2));

    const canvas = document.getElementById("priceChart");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 500;

    const padding = 60;  // ✅ 增加 padding 以便 Y 轴标签有足够的空间
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

    // ✅ 画坐标轴
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(padding, padding);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    // ✅ 画折线
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    for (let i = 0; i < timestamps.length; i++) {
        const x = getX(i);
        const y = getY(prices[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // ✅ 画点
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

    // ✅ 画 X 轴标签（减少显示数量 + 旋转 + 下移）
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";  
    ctx.textBaseline = "middle";

    const step = Math.ceil(timestamps.length / 10);
    for (let i = 0; i < timestamps.length; i += step) {
        const x = getX(i);
        ctx.save();
        ctx.translate(x, canvas.height - 20);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(timestamps[i], 0, 0);
        ctx.restore();
    }

    // ✅ 画 Y 轴最大/最小价格标签（向左偏移 10px，提高清晰度）
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";  // ✅ 字体更大，清晰可见
    ctx.textAlign = "right";  // ✅ 让价格对齐 Y 轴
    ctx.fillText(`$${maxPrice.toFixed(2)}`, padding - 10, getY(maxPrice));
    ctx.fillText(`$${minPrice.toFixed(2)}`, padding - 10, getY(minPrice));
}

// ✅ 初始化绘图
document.addEventListener("DOMContentLoaded", drawChart);
