const words = [
    "leon",
    "jill",
    "ada",
    "rebeca",
    "chris",
    "albert",
    "paul",
    "andrew",
];

export function generateRandomName() {
    const index = Math.floor(Math.random() * words.length);

    return words[index];
}
