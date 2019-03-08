# Trailblazer

> product comparisons component for trailblazers x gng (seed data has faces because faker twitter avatar urls were most convenient for >10^7 records)
![prodComp](https://github.com/vintg/Trailblazer/blob/master/sdcPreview.png)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions
- pg:init drops and creates db tables in postgres
- db:create writes random seed data to file(s) for each table up to 10M primary records
- pg:write writes the seed data files to db
- uri and keys in config file

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

