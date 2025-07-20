import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function showBitBuddyPanel(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "bitbuddyPanel",
    "BitBuddy Snapshot History",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "src", "ui"))],
    }
  );

  const htmlPath = path.join(context.extensionPath, "src", "ui", "panel.html");
  let html = fs.readFileSync(htmlPath, "utf8");

  const scriptUri = panel.webview.asWebviewUri(
    vscode.Uri.file(path.join(context.extensionPath, "src", "ui", "panel.js"))
  );

  html = html.replace("{{SCRIPT_URI}}", scriptUri.toString());
  panel.webview.html = html;

  // Handle messages from panel.js
  panel.webview.onDidReceiveMessage((message) => {
    switch (message.command) {
      case "snapshot":
        vscode.window.showInformationMessage("New snapshot requested!");
        break;
      case "clear":
        vscode.window.showInformationMessage("Clear history requested!");
        break;
    }
  });
}
