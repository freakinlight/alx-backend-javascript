const express = require('express');
const fs = require('fs').promises;

// Function to count students (asynchronous)
async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length === 0) {
      throw new Error('Cannot load the database');
    }

    const headers = lines[0].split(',');
    const rows = lines.slice(1).map((line) => line.split(','));
    const validRows = rows.filter((row) => row.length === headers.length);

    const fieldIndex = headers.indexOf('field');
    const firstNameIndex = headers.indexOf('firstname');

    const studentsByField = validRows.reduce((acc, row) => {
      const field = row[fieldIndex];
      const firstName = row[firstNameIndex];
      if (!acc[field]) acc[field] = [];
      acc[field].push(firstName);
      return acc;
    }, {});

    const result = [`Number of students: ${validRows.length}`];
    for (const [field, names] of Object.entries(studentsByField)) {
      result.push(
        `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`,
      );
    }

    return result.join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Create the Express app
const app = express();

// Define the root route "/"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define the "/students" route
app.get('/students', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('This is the list of our students\n');

  const databasePath = process.argv[2]; // Get the database path from command-line arguments
  if (!databasePath) {
    res.end('Cannot load the database');
    return;
  }

  try {
    const studentReport = await countStudents(databasePath);
    res.end(studentReport);
  } catch (error) {
    res.end(error.message);
  }
});

// Start the server
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the app
module.exports = app;
