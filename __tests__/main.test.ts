// @ts-ignore
import { run } from '@jonabc/actions-mocks';
import path from 'path';
import fs from 'fs';

const script = path.join(__dirname, '../lib/main');
const env = {
  GITHUB_REPOSITORY: 'foo/bar',
  INPUT_TOKEN: 'dummy',
};

function parseOutput(raw: string): Record<string, string> {
  return raw
    .split('\n')
    .filter((line) => line.match(/^::set-output/))
    .map((line) => line.replace('::set-output name=', '').split('::'))
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
}

describe('main', function () {
  test('can update a release', async () => {
    const mocks = {
      github: [
        {
          method: 'PATCH',
          uri: '/repos/foo/bar/releases/1',
          file: path.join(__dirname, 'fixtures/api/updated.json'),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        },
      ],
    };

    const { out, status } = await run(script, {
      env: { ...env, INPUT_ID: '1', INPUT_NAME: 'NEW NAME', INPUT_BODY: 'NEW BODY' },
      mocks,
    });
    const output = parseOutput(out);

    expect(status).toEqual(0);
    expect(output).toEqual(
      JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/output/updated.json'), { encoding: 'utf-8' }))
    );
  });
});
