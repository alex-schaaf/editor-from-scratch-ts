var Editor = /** @class */ (function () {
    function Editor() {
        this.caretIndex = 0;
        this.text = "";
        this.blinkingCursor = "<span class='blinker'>|</span>";
    }
    Editor.prototype.textBeforeCaret = function () {
        if (this.caretIndex == 0) {
            return "";
        }
        return this.text.substring(0, this.caretIndex);
    };
    Editor.prototype.textAfterCaret = function () {
        if (this.caretIndex === this.text.length) {
            return "";
        }
        this.text.substring(this.caretIndex);
    };
    Editor.prototype.generateHTML = function () {
        return this.textBeforeCaret() + this.blinkingCursor + this.textAfterCaret();
    };
    Editor.prototype.typeChar = function (c) {
        this.text = this.textBeforeCaret() + c + this.textAfterCaret();
        this.caretIndex++;
    };
    Editor.prototype.deleteChar = function () {
        if (this.textBeforeCaret().length > 0) {
            this.text = this.textBeforeCaret()
                .substring(0, this.textBeforeCaret().length - 1) + this.textAfterCaret();
            this.caretIndex--;
            return true;
        }
        return false;
    };
    Editor.prototype.moveLeft = function () {
        if (this.caretIndex === 0) {
            return false;
        }
        this.caretIndex--;
        return true;
    };
    Editor.prototype.moveRight = function () {
        if (this.caretIndex === this.text.length) {
            return false;
        }
        this.caretIndex++;
        return true;
    };
    return Editor;
}());
function updateHTML() {
    document.getElementById("editor").innerHTML = window.editor.generateHTML();
    var cursor = document.getElementById("cursor");
    if (cursor === null) {
        return;
    }
    var cursorPosition = cursor.getBoundingClientRect();
    var delta = cursorPosition.height / 4.0;
    cursor.style.top = "" + cursorPosition.top;
    cursor.style.left = "" + (cursorPosition.left - delta);
}
document.addEventListener("keypress", function (e) {
    window.editor.typeChar(String.fromCharCode(e.which));
    updateHTML();
});
document.addEventListener("keydown", function (e) {
    console.log("keydown:", e.which);
    if (e.which == 8 && window.editor.deleteChar()) {
        updateHTML();
    }
    if (e.which == 37 && window.editor.moveLeft()) {
        updateHTML();
    }
    if (e.which == 39 && window.editor.moveRight()) {
        updateHTML();
    }
});
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        window.editor = new Editor();
        updateHTML();
    }
};
