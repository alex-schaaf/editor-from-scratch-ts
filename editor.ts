class Editor {
  private caretIndex: number;
  private text: string;
  private blinkingCursor: string;

  constructor() {
    this.caretIndex = 0
    this.text = ""
    this.blinkingCursor = "<span class='blinker'>|</span>"
  }

  textBeforeCaret() {
    if (this.caretIndex == 0) {
      return ""
    }
    return this.text.substring(0, this.caretIndex)
  }

  textAfterCaret() {
    if (this.caretIndex === this.text.length) {
      return ""
    }
    this.text.substring(this.caretIndex)
  }

  generateHTML() {
    return this.textBeforeCaret() + this.blinkingCursor + this.textAfterCaret()
  }

  typeChar(c: string) {
    this.text = this.textBeforeCaret() + c + this.textAfterCaret()
    this.caretIndex++
  }

  deleteChar(): boolean {
    if (this.textBeforeCaret().length > 0) {
      this.text = this.textBeforeCaret()
        .substring(
          0,
          this.textBeforeCaret().length - 1
        ) + this.textAfterCaret()
      this.caretIndex--;
      return true
    }
    return false
  }
  moveLeft(): boolean {
    if (this.caretIndex === 0) {
      return false
    }
    this.caretIndex--
    return true
  }

  moveRight(): boolean {
    if (this.caretIndex === this.text.length) {
      return false
    }
    this.caretIndex++
    return true
  }
}


function updateHTML() {
  document.getElementById("editor").innerHTML = (window as any).editor.generateHTML()
  let cursor = document.getElementById("cursor")
  if (cursor === null) {
    return
  }
  let cursorPosition = cursor.getBoundingClientRect()
  let delta = cursorPosition.height / 4.0
  cursor.style.top = `${cursorPosition.top}`
  cursor.style.left = `${cursorPosition.left - delta}`
}

document.addEventListener("keypress", (e) => {
  (window as any).editor.typeChar(String.fromCharCode(e.which))
  updateHTML()
})

document.addEventListener("keydown", (e) => {
  console.log("keydown:", e.which)
  if (e.which == 8 && (window as any).editor.deleteChar()) {
    updateHTML()
  }
  if (e.which == 37 && (window as any).editor.moveLeft()) {
    updateHTML()
  }
  if (e.which == 39 && (window as any).editor.moveRight()) {
    updateHTML()
  }
})

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    (window as any).editor = new Editor()
    updateHTML()
  }
}