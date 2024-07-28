export function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the email against the regex
    return emailRegex.test(email);
}


// generate username
export function createUsername(name) {
    // Convert name to lowercase
    let username = name.toLowerCase();
    
    // Remove any non-alphanumeric characters (excluding spaces)
    username = username.replace(/[^a-z0-9\s]/g, '');
    
    // Replace spaces with underscores
    username = username.replace(/\s+/g, '_');
    
    return username;
}