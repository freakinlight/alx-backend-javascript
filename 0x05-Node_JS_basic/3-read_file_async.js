const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Read the file asynchronously
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        // Reject with the required error message if the file cannot be read
        reject(new Error('Cannot load the database'));
        return;
      }

      try {
        // Split the file into lines and filter out empty ones
        const lines = data.split('\n').filter((line) => line.trim() !== '');

        if (lines.length === 0) {
          throw new Error('Cannot load the database');
        }

        // Extract headers and rows
        const headers = lines[0].split(',');
        const rows = lines.slice(1).map((line) => line.split(','));

        // Remove rows with missing data (empty fields)
        const validRows = rows.filter((row) => row.length === headers.length);

        // Log the total number of students
        console.log(`Number of students: ${validRows.length}`);

        // Group students by their field and log the required details
        const fieldIndex = headers.indexOf('field'); // Find the index of the 'field' column
        const firstNameIndex = headers.indexOf('firstname'); // Find the index of the 'firstname' column

        const studentsByField = validRows.reduce((acc, row) => {
          const field = row[fieldIndex];
          const firstName = row[firstNameIndex];
          if (!acc[field]) {
            acc[field] = [];
          }
          acc[field].push(firstName);
          return acc;
        }, {});

        for (const [field, names] of Object.entries(studentsByField)) {
          console.log(
            `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`
          );
        }

        resolve(); // Resolve the Promise
      } catch (parseError) {
        reject(new Error('Cannot load the database')); // Reject if parsing fails
      }
    });
  });
}

module.exports = countStudents;
