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
  const synonyms = result[0].meta.syns[0];
  return synonyms;
}
