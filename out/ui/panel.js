"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBitBuddyPanel = showBitBuddyPanel;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function showBitBuddyPanel(context) {
    const panel = vscode.window.createWebviewPanel("bitbuddyPanel", "BitBuddy Snapshot History", vscode.ViewColumn.One, {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "src", "ui"))],
    });
    const htmlPath = path.join(context.extensionPath, "src", "ui", "panel.html");
    let html = fs.readFileSync(htmlPath, "utf8");
    const scriptUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, "src", "ui", "panel.js")));
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
//# sourceMappingURL=panel.js.map