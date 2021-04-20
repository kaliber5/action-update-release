import { debug } from '@actions/core';
import { Octokit, Release, UpdateableProperties } from './types';

export async function updateRelease(
  github: Octokit,
  owner: string,
  repo: string,
  id: string,
  props: UpdateableProperties
): Promise<Release> {
  try {
    debug('Trying to update release');
    return (await github.repos.updateRelease({ owner, repo, release_id: parseInt(id, 10), ...props })).data;
  } catch (e) {
    throw new Error('Could not update the release.');
  }
}
