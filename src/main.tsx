// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

import { createSignal } from 'solid-js';
import { Show, render } from 'solid-js/dom';
import { TaxReturn } from 'ustaxlib/core';

import App from './App';

declare const TAX_RETURN_PATH: string;

function TaxViewerLoader() {
  const [ state, setState ] = createSignal(undefined as TaxReturn);

  // TODO - consider using dynamic import()
  setState(require(TAX_RETURN_PATH).default);

  return (
    <Show when={state() !== undefined} fallback={<h1>Loading...</h1>}>
      <App tr={state()} />
    </Show>
  );
}

render(TaxViewerLoader, document.getElementById('root'));
