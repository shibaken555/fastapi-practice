// DOM操作用の関数をまとめたモジュール
export { addTextNode }

function addTextNode(text,selector) {
    const newText = document.createTextNode(text)
    const el = document.querySelector(selector);
    el.appendChild(newText);
}