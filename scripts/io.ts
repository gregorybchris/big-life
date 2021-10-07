type KeyName = string;

const KeyNames = Object.freeze({
  SPACE: " ",
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  HYPHEN: "-",
  EQUALS: "=",
  BACKSPACE: "Backspace",
  LETTER_P: "p",
  LETTER_S: "s",
});

const initKeyboard = (onKeyPress: (keyName: KeyName) => void) => {
  const keyMap = {};

  window.onkeydown = (keyEvent: KeyboardEvent) => {
    const keyName = keyEvent.key;
    if (keyMap.hasOwnProperty(keyName)) {
      return;
    }
    keyMap[keyName] = true;
    onKeyPress(keyName);
  };

  window.onkeyup = (keyEvent: KeyboardEvent) => {
    const keyName = keyEvent.key;
    if (keyMap.hasOwnProperty(keyName)) {
      delete keyMap[keyName];
    }
  };
};

export { initKeyboard, KeyName, KeyNames };
