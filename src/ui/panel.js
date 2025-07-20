(function () {
    const vscode = acquireVsCodeApi();
  
    document.getElementById("take").addEventListener("click", () => {
      vscode.postMessage({ command: "snapshot" });
    });
  
    document.getElementById("clear").addEventListener("click", () => {
      vscode.postMessage({ command: "clear" });
    });
  })();
  