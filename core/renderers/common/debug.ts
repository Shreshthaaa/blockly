/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Block rendering debugging functionality.
 */

/**
 * Block rendering debugging functionality.
 * @namespace Blockly.blockRendering.debug
 */
import * as goog from '../../../closure/goog/goog.js';
goog.declareModuleId('Blockly.blockRendering.debug');

import * as deprecation from '../../utils/deprecation.js';


/** Whether or not the debugger is turned on. */
let useDebugger = false;
/**
 * Returns whether the debugger is turned on.
 * @return Whether the debugger is turned on.
 * @alias Blockly.blockRendering.debug.isDebuggerEnabled
 */
export function isDebuggerEnabled(): boolean {
  return useDebugger;
}

/**
 * Turn on the blocks debugger.
 * @alias Blockly.blockRendering.debug.startDebugger
 * @deprecated March 2022. Use the rendering debugger in @blockly/dev-tools.
 * See https://www.npmjs.com/package/@blockly/dev-tools for more information.
 */
export function startDebugger() {
  deprecation.warn(
      'Blockly.blockRendering.debug.startDebugger()', 'February 2022',
      'September 2022',
      'the debug renderer in @blockly/dev-tools (See https://www.npmjs.com/package/@blockly/dev-tools.)');
  useDebugger = true;
}

/**
 * Turn off the blocks debugger.
 * @alias Blockly.blockRendering.debug.stopDebugger
 * @deprecated March 2022. Use the rendering debugger in @blockly/dev-tools.
 * See https://www.npmjs.com/package/@blockly/dev-tools for more information.
 */
export function stopDebugger() {
  deprecation.warn(
      'Blockly.blockRendering.debug.stopDebugger()', 'February 2022',
      'September 2022',
      'the debug renderer in @blockly/dev-tools (See https://www.npmjs.com/package/@blockly/dev-tools.)');
  useDebugger = false;
}