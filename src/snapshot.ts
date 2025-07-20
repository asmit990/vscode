import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function takeSnapshot(context: vscode.ExtensionContext) {
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
    const existingSnapshots = context.globalState.get<any[]>('bitbuddy.snapshots') || [];
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
  } catch (err) {
    console.error('Error in takeSnapshot:', err);
    vscode.window.showErrorMessage('Failed to take snapshot. See console for details.');
  }
}
