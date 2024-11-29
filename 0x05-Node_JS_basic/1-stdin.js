process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (input) => {
  const name = input.toString().trim(); // Remove extra spaces or newlines
  process.stdout.write(`Your name is: ${name}\n`);

  // Simulate end of input for testing with echo
  process.exit(0);
});

// Handle actual EOF (Ctrl+D)
process.on('exit', () => {
  console.log('This important software is now closing');
});
