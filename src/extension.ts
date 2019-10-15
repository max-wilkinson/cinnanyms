/*
 *   Copyright (c) 2019 Ford Motor Company
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

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
