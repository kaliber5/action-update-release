# Update a release

[![build-test](https://github.com/kaliber5/action-update-release/actions/workflows/test.yml/badge.svg)](https://github.com/kaliber5/action-update-release/actions/workflows/test.yml)

Github action to update a Github release given by its ID. Can be used in combination with [`kaliber5/action-get-release`](https://github.com/kaliber5/action-get-release).

## Usage

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Get latest release
        id: latest_release
        uses: kaliber5/action-get-release@v1
        with:
          token: ${{ github.token }}
          latest: true 
      - name: Get latest release
        id: latest_release
        uses: kaliber5/action-update-release@v1
        with:
          token: ${{ github.token }}
          id: ${{ steps.latest_release.outputs.id }}
          name: My changed release name
```

### Inputs

- `token`: The Github token used for authentication. Required, `${{ github.token }}` can be used usually.
- `owner`: Name of the owner of the repo, taken from current repo by default.
- `repo`: Name of the repository, taken from current repo by default.
- `id`: The ID to identify the release. Required!
- `name`: Name of the release
- `body`: Body text of the release.
- `tag_name`: Tag name of the release.
- `target_commitish`: Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA.
- `prerelease`: Mark this release as a pre-release.
- `draft`: Set to false to publish a draft release.

### Outputs

- `id`: The ID of the Release
- `url`: The release url
- `html_url`: The url users can navigate to in order to view the release
- `assets_url`: The release assets url
- `upload_url`: The url for uploading assets to the release
- `name`: The release name
- `body`: The release's body content
- `tag_name`: The git tag associated with the release
- `draft`: Is draft
- `prerelease`: Is pre-release
- `target_commitish`: The release was create to which target branch
- `created_at`: Created date
- `published_at`: Published date
