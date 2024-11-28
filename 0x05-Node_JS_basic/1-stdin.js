process.stdout.write("Welcome to Holberton School, what is your name?\n");

process.stdin.on('data', (input) => {
    const name = input.toString().trim(); // Remove any trailing newlines or spaces
    process.stdout.write(`Your name is: ${name}\n`);
});

process.stdin.on('end', () => {
    console.log("This important software is now closing");
});

