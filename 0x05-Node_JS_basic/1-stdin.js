// Include the process standard input
process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log("Welcome to Holberton School, what is your name?");

process.stdin.on('data', (data) => {
    // Trim the data to remove any newline characters added during the input
    const name = data.trim();
    console.log(`Your name is: ${name}`);
    // Exit the process after outputting the name
    process.exit();
});

process.on('exit', () => {
    console.log("This important software is now closing");
});

