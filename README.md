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

1. Fixing White Border Issue of home page using ChatGPT 4o  
   When reducing the size of the webpage, a white border may appear around the `Nav` section or `Hero` section.  
   To address this issue, use the following CSS styles:

```bash

body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

Issue Not Resolved  
2. How to introduce Bitcoin Operation to someone outside the industry in simple terms using ChatGPT 4o

```bash
1. What is Bitcoin?
2. How does Bitcoin work?
Bitcoin operates in a few simple steps:
(1) The Blockchain: Bitcoin's Record-Keeping System
(2) Transactions
Sending Bitcoin is like sending a digital message, but the message is Bitcoin.
(3) Mining
Bitcoin relies on a process called "mining" to verify transactions and secure the network.
3. Why is Bitcoin Important?
Bitcoin has some unique features:
Decentralized,
Secure,
Globa.
```

The explanation was too technical and not suitable for inclusion in my document or video. So, I simply shared a brief overview of my background and did not use it.

## License

This project is licensed under the **MIT License**.
