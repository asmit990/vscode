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
exports.takeSnapshot = takeSnapshot;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function takeSnapshot(context) {
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor to take a snapshot.');
            return;
        }
        const document = editor.document;
        const content = document.getText();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const snapshot = {
            fileName: document.fileName,
            content,
            timestamp,
        };
        // Save to globalState (existing behavior)
        const existingSnapshots = context.globalState.get('bitbuddy.snapshots') || [];
        existingSnapshots.push(snapshot);
        context.globalState.update('bitbuddy.snapshots', existingSnapshots);
        // Save as file in .bitbuddy-snapshots folder in workspace root
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const workspaceRoot = workspaceFolders[0].uri.fsPath;
            const snapshotsDir = path.join(workspaceRoot, '.bitbuddy-snapshots');
            if (!fs.existsSync(snapshotsDir)) {
                fs.mkdirSync(snapshotsDir);
            }
            const baseName = path.basename(document.fileName).replace(/[^a-zA-Z0-9_.-]/g, '_');
            const fileName = `${baseName}_${timestamp}.txt`;
            const filePath = path.join(snapshotsDir, fileName);
            fs.writeFileSync(filePath, content, 'utf8');
        }
        vscode.window.showInformationMessage(`📸 Snapshot taken at ${timestamp}`);
    }
    catch (err) {
        console.error('Error in takeSnapshot:', err);
        vscode.window.showErrorMessage('Failed to take snapshot. See console for details.');
    }
}
//# sourceMappingURL=snapshot.js.map