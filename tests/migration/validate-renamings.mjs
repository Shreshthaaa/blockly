#!/usr/bin/env node
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A script to validate the renamings file
 * (scripts/migration/renamings.json5) agaist the schema
 * (renamings-schema.json).
 */

import JSON5 from 'json5';
import {readFile} from 'fs/promises';
import {posixPath} from '../../scripts/helpers.js';
import {validate} from '@hyperjump/json-schema/draft-2020-12';
import {BASIC} from '@hyperjump/json-schema/experimental';

/** @type {URL} Renaming schema filename. */
const SCHEMA_URL = new URL('renamings.schema.json', import.meta.url);

/** @type {URL} Renamings filename. */
const RENAMINGS_URL = new URL(
  '../../scripts/migration/renamings.json5',
  import.meta.url,
);

const renamingsJson5 = await readFile(RENAMINGS_URL);
const renamings = JSON5.parse(renamingsJson5);

const output = await validate(SCHEMA_URL, renamings, BASIC);

if (!output.valid) {
  console.error(`Renamings file is invalid.  First error occurs at:
    ${output.errors[0].instanceLocation}`);
  console.info(
    `Here is the full validator output, in case that helps:\n`,
    output,
  );
  process.exit(1);
}

// File passed schema validation.  Do some additional checks.
let ok = true;
Object.entries(renamings).forEach(([version, modules]) => {
  // Scan through modules and check for duplicates.
  const seen = new Set();
  for (const {oldName} of modules) {
    if (seen.has(oldName)) {
      console.error(
        `Duplicate entry for module ${oldName} ` + `in version ${version}.`,
      );
      ok = false;
    }
    seen.add(oldName);
  }
});
if (!ok) {
  console.error('Renamings file is invalid.');
  process.exit(1);
}
// Default is a successful exit 0.
