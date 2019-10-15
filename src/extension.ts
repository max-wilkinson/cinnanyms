import * as vscode from 'vscode';
import { getSynonyms } from './dictionaryService';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'extension.wordsmith',
    async function() {
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

export function deactivate() {}
