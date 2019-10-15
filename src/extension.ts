// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getSynonyms } from './dictionaryService';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "wordsmith" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.wordsmith',
    async function() {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor;

      if (editor === undefined) {
        vscode.window.showWarningMessage(
          'This command requires a file to be open in the editor'
        );
        return;
      }

      const text = editor.document.getText(editor.selection);

      if (isNullOrEmpty(text)) {
        vscode.window.showWarningMessage(
          'Please highlight some text to define'
        );
        return;
      }

      const synonyms = await getSynonyms(text);
      vscode.window.showInformationMessage(`${text}: ${synonyms.join(', ')}`);
    }
  );

  context.subscriptions.push(disposable);
}

function isNullOrEmpty(input: any) {
  return input === undefined || input === null || input === '';
}

// this method is called when your extension is deactivated
export function deactivate() {}
