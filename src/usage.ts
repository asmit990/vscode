import * as vscode from 'vscode';

export function trackUsage(context: vscode.ExtensionContext) {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor to take a snapshot.');
      return;
    }

    const document = editor.document;
    const content = document.getText();
    const timestamp = new Date().toISOString();

    const snapshot = {
      fileName: document.fileName,
      content,
      timestamp,
    };

    const existingSnapshots = context.globalState.get<any[]>('bitbuddy.snapshots') || [];
    existingSnapshots.push(snapshot);
    context.globalState.update('bitbuddy.snapshots', existingSnapshots);

    vscode.window.showInformationMessage(`📸 Snapshot taken at ${timestamp}`);
  } catch (err) {
    console.error('Error in takeSnapshot:', err);
    vscode.window.showErrorMessage('Failed to take snapshot. See console for details.');
  }
}
