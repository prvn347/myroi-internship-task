### Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/prvn347/myroi-internship-task.git
   cd myroi-internship-task
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   Create a .env file in the root of your project and add the following

   ```bash
   DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
   PORT=3000


   ```

4. **Migrate the Database**:
   ```bash
   npx prisma migrate dev
   ```
5. **Run the Development Server**:
   ```bash
   npm run dev
   ```

Open http://localhost:3000/ping with your browser to see the result.
