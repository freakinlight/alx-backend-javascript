const http = require('http');
const { readFile } = require('fs');
const { promisify } = require('util');

// Promisify `readFile` for async/await
const readFileAsync = promisify(readFile);

function countStudents(path) {
  return new Promise((resolve, reject) => {
    readFileAsync(path, 'utf-8')
      .then((data) => {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        if (lines.length === 0) throw new Error('Cannot load the database');

        // Extract headers and rows
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

        const report = [`Number of students: ${validRows.length}`];

        for (const [field, names] of Object.entries(studentsByField)) {
          report.push(
            `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`,
          );
        }

        resolve(report.join('\n'));
      })
      .catch(() => reject(new Error('Cannot load the database')));
  });
}

// Create the HTTP server
const app = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/') {
    // Default route
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    // Students route
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    // Read the database file passed as the first argument
    const databasePath = process.argv[2];
    countStudents(databasePath)
      .then((report) => {
        res.end(report);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    // Not Found route
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the app
module.exports = app;
