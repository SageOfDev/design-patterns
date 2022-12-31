abstract class Dialog {
  abstract createButton(): Button
  static closeDialog() {
    console.log('close dialog')
  }

  render() {
    const okButton: Button = this.createButton()
    okButton.onClick(Dialog.closeDialog)
    okButton.render()
  }
}

class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton()
  }
}

class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton()
  }
}


interface Button {
  render(): void
  onClick(f: () => void): void
}

class WindowsButton implements Button {
  render(): void {
  }
  onClick(f: () => void): void {
  }
}

class HTMLButton implements Button {
  render(): void {
  }
  onClick(f: () => void): void {
  }
}

interface config {
  OS: string
}
declare function readApplicationConfigFile(): config 

class Application {
  dialog: Dialog

  initailze() {
    const config = readApplicationConfigFile()

    if (config.OS === 'Windows') {
      this.dialog = new WindowsDialog()
    } else if (config.OS === 'Web') {
      this.dialog = new WebDialog()
    } else {
      throw new Error("Error! Unknown operating system.")
    }
  }

  main() {
    this.initailze()
    this.dialog.render()
  }
}