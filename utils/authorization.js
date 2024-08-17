// utils/authorization.js
const allowedUsers = ['123456789012345678', '987654321098765432']; // Replace with actual user IDs

/**
 * Check if a user is authorized to use certain features.
 * @param {string} userId - The ID of the user.
 * @returns {boolean} - Whether the user is authorized or not.
 */
module.exports.isUserAuthorized = (userId) => {
    return allowedUsers.includes(userId);
};

/**
 * Add a user to the list of allowed users.
 * @param {string} userId - The ID of the user.
 */
module.exports.addUser = (userId) => {
    if (!allowedUsers.includes(userId)) {
        allowedUsers.push(userId);
    }
};

/**
 * Remove a user from the list of allowed users.
 * @param {string} userId - The ID of the user.
 */
module.exports.removeUser = (userId) => {
    const index = allowedUsers.indexOf(userId);
    if (index > -1) {
        allowedUsers.splice(index, 1);
    }
};

/**
 * List all authorized users.
 * @returns {string[]} - An array of authorized user IDs.
 */
module.exports.listAuthorizedUsers = () => {
    return allowedUsers;
};