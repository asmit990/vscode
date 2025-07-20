

```
# 🧠 BitBuddy — VS Code Extension

> Your personal AI-assisted coding time machine.  
> Automatically capture and manage code snapshots while you work — track progress, revisit past versions, and boost productivity.

---

## 🚀 Features

- 📸 **Instant Snapshots** — Save code state of your current file.
- 🕰️ **Usage Tracker** — Know how long you've actively coded.
- 🧠 **Webview Panel** — Beautiful snapshot history view (HTML/CSS/JS).
- 🧪 **No Backend Required** — Works offline with local storage and VS Code global state.
- 🔐 **Auth-Ready** — Designed to connect with a web dashboard for login + tracking.

---

## 📁 Folder Structure

```

bitbuddy-extension/
├── src/
│   ├── extension.ts       # Registers commands, sets up extension
│   ├── snapshot.ts        # Takes and saves code snapshots
│   ├── usage.ts           # Tracks coding time
│   ├── storage.ts         # Abstraction layer for global/local storage
│   └── ui/
│       ├── panel.html     # Webview UI layout
│       └── panel.js       # Webview interaction logic
├── .vscode/
│   └── launch.json        # Debugging config
├── package.json
├── tsconfig.json
└── README.md

````

---

## 🧰 Development Setup

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/bitbuddy-extension.git
cd bitbuddy-extension
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Open in VS Code

```bash
code .
```

### 4. Run the Extension

* Press `F5` to start a new Extension Development Host.
* This will open a sandbox VS Code window with BitBuddy activated.

---

## 📸 How to Use

### Take a Snapshot

* Open the Command Palette (`Cmd + Shift + P` on Mac)
* Run: `BitBuddy: Take Snapshot`
* The current file’s content will be saved to internal storage.

### View History

* Run: `BitBuddy: Show Snapshot Panel`
* See a webview UI of your past snapshots (if `panel.html` implemented).

---

## 📍 Where are Snapshots Stored?

* Saved using VS Code's **globalState**.

* On macOS:

  ```
  ~/Library/Application Support/Code/User/globalStorage/your.extension.id/
  ```

* Not saved as files by default.

* You can **add file-saving** by extending `snapshot.ts`.

---

## 🔧 Example Commands

* `BitBuddy: Take Snapshot`
* `BitBuddy: Show Snapshot Panel`

---

## 🌐 Optional Web Integration (Coming Soon)

You'll be able to:

* Log in with your BitBuddy account
* Sync usage and snapshots across devices
* Get AI insights via the dashboard

---

## 📅 What's Next?

* [ ] Add authentication (without NextAuth)
* [ ] Add export snapshots to `.md` or `.json`
* [ ] VS Code marketplace listing

---

## 🤝 Contributing

PRs welcome. Open an issue, fork, branch, and improve!

---

## 📃 License

MIT License — Use, modify, or sell with proper credit.

---

Made with 💻 by [Kuku](https://github.com/yourusername) and ChatGPT

```

---

Let me know if you want:
- A markdown badge (`vscode` icon, version, license)
- A Marketplace publish guide
- Web app README too (for later)

You're killin’ it bro, proud of you. Let’s ship soon.
```

