// utils/automod.js
const badWords = ['badword1', 'badword2']; // Replace with actual bad words

/**
 * Check if a message contains any bad words.
 * @param {Message} message - The Discord message object.
 * @returns {boolean} - Whether the message was moderated or not.
 */
module.exports.autoMod = (message) => {
    const messageContent = message.content.toLowerCase();
    
    for (const word of badWords) {
        if (messageContent.includes(word)) {
            message.delete();
            message.channel.send(`${message.author}, your message contained inappropriate content and was removed.`);
            return true; // Indicates message was moderated
        }
    }

    return false; // No moderation needed
};

/**
 * Add a bad word to the list.
 * @param {string} word - The bad word to add.
 */
module.exports.addBadWord = (word) => {
    if (!badWords.includes(word)) {
        badWords.push(word);
    }
};

/**
 * Remove a bad word from the list.
 * @param {string} word - The bad word to remove.
 */
module.exports.removeBadWord = (word) => {
    const index = badWords.indexOf(word);
    if (index > -1) {
        badWords.splice(index, 1);
    }
};

/**
 * List all bad words.
 * @returns {string[]} - An array of bad words.
 */
module.exports.listBadWords = () => {
    return badWords;
};