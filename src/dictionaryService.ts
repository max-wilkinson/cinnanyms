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

import * as request from 'request-promise-native';

const apiKey = process.env.APIKEY;

export async function getSynonyms(word: string): Promise<string[]> {
  const dictionaryApi = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${apiKey}`;
  var options = {
    uri: dictionaryApi,
    method: 'GET'
  };

  const response = await request(options);
  const result = JSON.parse(response);
  const synonyms = parseSynonyms(result);
  return synonyms;
}

function parseSynonyms(result: any): string[] {
  let synonyms: string[] = [];

  try {
    synonyms = result[0].meta.syns[0];
  } catch {
    synonyms = result;
  }

  return synonyms;
}
