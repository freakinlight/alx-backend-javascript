<<<<<<< HEAD
process.stdout.write("Welcome to Holberton School, what is your name?\n");

process.stdin.on('data', (input) => {
    const name = input.toString().trim(); // Remove any trailing newlines or spaces
    process.stdout.write(`Your name is: ${name}\n`);
    process.exit(); // Exit after processing the input
});

process.on('exit', () => {
    console.log("This important software is now closing");
=======
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
>>>>>>> 1c99cbd35b168a55b7dac437dcf6d7f7f2c8c749
});

