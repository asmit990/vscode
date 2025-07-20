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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const snapshot_1 = require("./snapshot");
const panel_1 = require("./ui/panel");
const usage_1 = require("./usage");
function activate(context) {
    try {
        console.log('BitBuddy is now active!');
        // Automatically take a snapshot on save
        const saveListener = vscode.workspace.onDidSaveTextDocument(() => {
            try {
                (0, snapshot_1.takeSnapshot)(context);
            }
            catch (err) {
                console.error('Error in auto-snapshot on save:', err);
            }
        });
        const snapshotCommand = vscode.commands.registerCommand('bitbuddy.takeSnapshot', () => {
            try {
                (0, snapshot_1.takeSnapshot)(context);
            }
            catch (err) {
                console.error('Error in takeSnapshot:', err);
                vscode.window.showErrorMessage('Failed to take snapshot. See console for details.');
            }
        });
        // Command to view all snapshots
        const viewSnapshotsCommand = vscode.commands.registerCommand('bitbuddy.viewSnapshots', async () => {
            try {
                const snapshots = context.globalState.get('bitbuddy.snapshots') || [];
                if (snapshots.length === 0) {
                    vscode.window.showInformationMessage('No snapshots found.');
                    return;
                }
                const items = snapshots.map((snap, idx) => ({
                    label: `${snap.fileName}`,
                    description: snap.timestamp,
                    detail: snap.content.substring(0, 100),
                    idx
                }));
                const selected = await vscode.window.showQuickPick(items, {
                    placeHolder: 'Select a snapshot to view details',
                });
                if (selected) {
                    const snap = snapshots[selected.idx];
                    const doc = await vscode.workspace.openTextDocument({
                        content: snap.content,
                        language: 'plaintext',
                    });
                    vscode.window.showTextDocument(doc, { preview: false });
                }
            }
            catch (err) {
                console.error('Error in viewSnapshots:', err);
                vscode.window.showErrorMessage('Failed to view snapshots. See console for details.');
            }
        });
        //all the things added to the context 
        const showPanelCommand = vscode.commands.registerCommand('bitbuddy.showPanel', () => {
            try {
                (0, panel_1.showBitBuddyPanel)(context);
            }
            catch (err) {
                console.error('Error in openWebviewPanel:', err);
                vscode.window.showErrorMessage('Failed to open panel. See console for details.');
            }
        });
        const trackUsageCommand = vscode.commands.registerCommand('bitbuddy.trackUsage', () => {
            try {
                (0, usage_1.trackUsage)(context);
            }
            catch (err) {
                console.error('Error in trackUsage:', err);
                vscode.window.showErrorMessage('Failed to track usage. See console for details.');
            }
        });
        context.subscriptions.push(snapshotCommand, showPanelCommand, trackUsageCommand, viewSnapshotsCommand, saveListener);
    }
    catch (err) {
        console.error('Error during BitBuddy activation:', err);
        vscode.window.showErrorMessage('BitBuddy failed to activate. See console for details.');
    }
}
function deactivate() {
    try {
        console.log('🛑 BitBuddy has been deactivated.');
    }
    catch (err) {
        console.error('Error during BitBuddy deactivation:', err);
    }
}
//# sourceMappingURL=extension.js.map