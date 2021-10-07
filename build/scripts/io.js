const KeyNames = Object.freeze({
    SPACE: " ",
    LEFT: "ArrowLeft",
    UP: "ArrowUp",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    HYPHEN: "-",
    EQUALS: "=",
    LETTER_S: "s",
});
const initKeyboard = (onKeyPress) => {
    const keyMap = {};
    window.onkeydown = (keyEvent) => {
        const keyName = keyEvent.key;
        if (keyMap.hasOwnProperty(keyName)) {
            return;
        }
        keyMap[keyName] = true;
        onKeyPress(keyName);
    };
    window.onkeyup = (keyEvent) => {
        const keyName = keyEvent.key;
        if (keyMap.hasOwnProperty(keyName)) {
            delete keyMap[keyName];
        }
    };
};
export { initKeyboard, KeyNames };
