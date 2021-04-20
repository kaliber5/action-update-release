import { setFailed, setOutput } from '@actions/core';
import { getOctokit } from '@actions/github';
import { getInputs, mapResponseToReleaseOutput } from './utils';
import { updateRelease } from './release';

async function run(): Promise<void> {
  try {
    const { token, owner, repo, id, ...rest } = getInputs();
    const octokit = getOctokit(token);

    const release = await updateRelease(octokit, owner, repo, id, rest);

    const output = mapResponseToReleaseOutput(release);
    for (const [key, value] of Object.entries(output)) {
      setOutput(key, value);
    }
  } catch (error) {
    setFailed(error instanceof Error ? error.message : error);
  }
}

void run();
