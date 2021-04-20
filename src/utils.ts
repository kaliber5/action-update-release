import { Inputs, Release, ReleaseOutput } from './types';
import { getInput, InputOptions } from '@actions/core';
import { context } from '@actions/github';

function getNormalizedInput(input: string, options: InputOptions & { default?: string; type?: 'string' }): string;
function getNormalizedInput(input: string, options: InputOptions & { default: boolean; type?: 'boolean' }): boolean;
function getNormalizedInput(input: string, options: InputOptions & { type: 'boolean' }): boolean | undefined;
function getNormalizedInput(input: string, options: InputOptions & { type: 'string' }): string | undefined;
function getNormalizedInput(input: string, options: { required: true }): string;
function getNormalizedInput(input: string, options?: InputOptions): string | undefined;
function getNormalizedInput(
  input: string,
  options: InputOptions & { default?: string | boolean; type?: 'string' | 'boolean' } = {}
): string | boolean | undefined {
  const value = getInput(input, options);

  if (value !== '' && (options.type === 'boolean' || typeof options.default === 'boolean')) {
    return value === 'true';
  }

  if (value !== '') {
    return value;
  }

  return options.default ?? undefined;
}

/**
 * Helper to get all the inputs for the action
 */
export function getInputs(): Inputs {
  const result: Inputs = {
    token: getNormalizedInput('token', { required: true }),
    owner: getNormalizedInput('owner', { default: context.repo.owner }),
    repo: getNormalizedInput('repo', { default: context.repo.repo }),
    id: getNormalizedInput('id', { required: true }),
    name: getNormalizedInput('name'),
    body: getNormalizedInput('body'),
    prerelease: getNormalizedInput('prerelease', { type: 'boolean'}),
    draft: getNormalizedInput('draft', { type: 'boolean'}),
  };

  return result;
}

export function mapResponseToReleaseOutput(response: Release): ReleaseOutput {
  return {
    id: response.id,
    url: response.url,
    html_url: response.html_url,
    assets_url: response.assets_url,
    upload_url: response.upload_url,
    name: response.name ?? '',
    body: response.body ?? '',
    tag_name: response.tag_name,
    draft: response.draft,
    prerelease: response.prerelease,
    target_commitish: response.target_commitish,
    created_at: response.created_at,
    published_at: response.published_at ?? '',
  };
}
