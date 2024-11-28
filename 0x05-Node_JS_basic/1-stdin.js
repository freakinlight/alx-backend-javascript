process.stdout.write("Welcome to Holberton School, what is your name?\n");

process.stdin.on('data', (input) => {
    const name = input.toString().trim(); // Remove any trailing newlines or spaces
    process.stdout.write(`Your name is: ${name}\n`);
    process.exit(); // Exit after processing the input
});

process.on('exit', () => {
    console.log("This important software is now closing");
});

