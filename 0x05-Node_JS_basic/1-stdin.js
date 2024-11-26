// Directly write to stdout for the initial prompt.
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for data events on stdin, which are triggered when the user inputs data.
process.stdin.on('data', (data) => {
  // Write the name to stdout using template literals to include the input directly.
  process.stdout.write(`Your name is: ${data}`);
  // Exit the process after printing the name to handle the input as a single occurrence.
  process.exit();
});

// Listen for the end event on stdin, which is triggered when stdin is closed.
process.stdin.on('end', () => {
  // Output the closing message when the input stream is closed.
  process.stdout.write('This important software is now closing\n');
});

