import * as vscode from 'vscode';

import { takeSnapshot } from './snapshot';
import { showBitBuddyPanel } from './ui/panel';
import { trackUsage } from './usage';



export function activate(context: vscode.ExtensionContext) {
    try {
        console.log('BitBuddy is now active!'); 

        // Automatically take a snapshot on save
        const saveListener = vscode.workspace.onDidSaveTextDocument(() => {
            try {
                takeSnapshot(context);
            } catch (err) {
                console.error('Error in auto-snapshot on save:', err);
            }
        });

        const snapshotCommand = vscode.commands.registerCommand('bitbuddy.takeSnapshot',  () => {
            try {
                takeSnapshot(context);
            } catch (err) {
                console.error('Error in takeSnapshot:', err);
                vscode.window.showErrorMessage('Failed to take snapshot. See console for details.');
            }
        });
   



        
        // Command to view all snapshots
        const viewSnapshotsCommand = vscode.commands.registerCommand('bitbuddy.viewSnapshots', async () => {
            try {
                const snapshots = context.globalState.get<any[]>('bitbuddy.snapshots') || [];
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
            } catch (err) {
                console.error('Error in viewSnapshots:', err);
                vscode.window.showErrorMessage('Failed to view snapshots. See console for details.');
            }
        });
     
                
        //all the things added to the context 
        const showPanelCommand = vscode.commands.registerCommand('bitbuddy.showPanel', () => {
            try {
                showBitBuddyPanel(context);
            } catch (err) {
                console.error('Error in openWebviewPanel:', err);
                vscode.window.showErrorMessage('Failed to open panel. See console for details.');
            }
        }); 

        const trackUsageCommand = vscode.commands.registerCommand('bitbuddy.trackUsage', () => {
            try {
                trackUsage(context);
            } catch (err) {
                console.error('Error in trackUsage:', err);
                vscode.window.showErrorMessage('Failed to track usage. See console for details.');
            }
        });

        context.subscriptions.push(
            snapshotCommand,
            showPanelCommand,
            trackUsageCommand,
            viewSnapshotsCommand,
            saveListener
        );
    } catch (err) {
        console.error('Error during BitBuddy activation:', err);
        vscode.window.showErrorMessage('BitBuddy failed to activate. See console for details.');
    }
}

export function deactivate() {
    try {
        console.log('🛑 BitBuddy has been deactivated.');
    } catch (err) {
        console.error('Error during BitBuddy deactivation:', err);
    }
}
