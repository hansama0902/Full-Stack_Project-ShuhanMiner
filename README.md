# Full-Stack_Project-ShuhanMiner

## Author

**Shuhan Dong**

## Class Link

CS5610 Web_Development [Course Page](https://johnguerra.co/classes/webDevelopment_spring_2025/)

Instructor: John Alexis Guerra Gómez [Profile](https://johnguerra.co/)


## Project Objective

Apply the concepts learned to build a basic backend application using Node.js, Express 5, and MongoDB, along with an HTML5 frontend, and complete the deployment of the web database. Develop the Mining Machine Monitoring and Management System to make up for the regrets of the working period.
## Project Screenshot

![Project Screenshot](https://raw.githubusercontent.com/hansama0902/Full-Stack_Project-ShuhanMiner/refs/heads/main/screenshot/screen1.png)
![Project Screenshot](https://raw.githubusercontent.com/hansama0902/Full-Stack_Project-ShuhanMiner/refs/heads/main/screenshot/screen2.png)
![Project Screenshot](https://raw.githubusercontent.com/hansama0902/Full-Stack_Project-ShuhanMiner/refs/heads/main/screenshot/screen3.png)
![Project Screenshot](https://raw.githubusercontent.com/hansama0902/Full-Stack_Project-ShuhanMiner/refs/heads/main/screenshot/screen4.png)
---

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript**
- **Node.js**
- **Express**
- **MongoDB**
- **MongoDB Atlas**
- **Bootstrap 5**
- **ESLint6 & Prettier for Code Quality**
- **Vercel**

---

### Steps to Run the Project Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hansama0902/Full-Stack_Project-ShuhanMiner.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Full-Stack_Project-ShuhanMiner
   ```

3. **Install Dependencies (if applicable)**
   This project requires Node.js dependencies. Install them by running:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**
   Create a .env file in the root directory and add the following environment variables:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
   Replace your_mongodb_connection_string with your MongoDB Atlas URI.

5. **Run the Project Locally**

   Start the backend server:
    ```bash
      npm start
      ```
   ---

### View the project

Visit the live project at: [MineStore Project](https://hansama0902.github.io/Web-Developmen_Miner-Store-Homepage_Project1/)

## Resourse

1.[Video](https://youtu.be/-VIRZhJZJcA)  
2.[Design Doc](https://docs.google.com/document/d/1sj8mXe9F7O5z7Av_7abQxXlFllzEUQj8a6i96UcBgH4/edit?usp=sharing)  
3.[Slides](https://docs.google.com/presentation/d/1M8-rw_8FNOXsD08S19G1zejjg_alLBsCtnAvHSIhPYI/edit?usp=sharing)


## Usage of GenAI  

1. **Creating Charts Without External JS Using ChatGPT 4o**

While developing my project, I needed to create charts for data visualization. However, due to project constraints, I could not use external JavaScript libraries like Chart.js or D3.js.

To solve this issue, I used ChatGPT 4o to generate pure JavaScript solutions using the <canvas> element and vanilla JS, ensuring the charts were drawn dynamically without relying on external dependencies.

Example Solution:
Instead of using Chart.js, I asked ChatGPT to generate a custom vanilla JavaScript chart:
```bash   
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
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding); 
  ctx.moveTo(padding, canvas.height - padding);
  ctx.lineTo(padding, padding); 
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

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

  for (let i = 0; i < timestamps.length; i++) {
    const x = getX(i);
    const y = getY(prices[i]);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#000';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const step = Math.ceil(timestamps.length / 10);
  for (let i = 0; i < timestamps.length; i += step) {
    const x = getX(i);
    ctx.fillText(timestamps[i], x, canvas.height - 40);
  }
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

```

By using ChatGPT 4o, I was able to generate pure JavaScript charts using the <canvas> API, successfully avoiding external dependencies while still achieving dynamic and interactive data visualization.


## License

This project is licensed under the **MIT License**.
