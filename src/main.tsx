// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

import { createSignal, createState } from 'solid-js';
import { Show, render } from 'solid-js/dom';
import { TaxReturn } from 'ustaxlib/core';

import App from './App';

declare const TAX_RETURN_PATH: string;

function TaxViewerLoader() {
  const [ state, setState ] = createState({
    // TODO - consider using dynamic import()
    taxReturn: require(TAX_RETURN_PATH).default,
    showForm: window.location.hash
  });

  const onFormChange = (formName: string) => {
    window.location.hash = formName;
  };

  window.onhashchange = () => setState({ showForm: window.location.hash });

  return (
    <Show when={state.taxReturn !== undefined} fallback={<h1>Loading...</h1>}>
      <App tr={state.taxReturn} showForm={state.showForm} onFormChange={onFormChange} />
    </Show>
  );
}

render(TaxViewerLoader, document.getElementById('root'));
