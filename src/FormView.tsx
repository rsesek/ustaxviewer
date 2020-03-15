// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

import { createDependentEffect, createMemo, createState } from 'solid-js';
import { For, Show } from 'solid-js/dom';
import { TaxReturn, Form, Line } from 'ustaxlib/core';
import { getLastTraceList } from 'ustaxlib/core/Trace';

const S = require('./FormView.css');

interface FormProps {
  tr: TaxReturn;
  form: Form<any>;
}

export default function FormView(props: FormProps) {
  const lines = createMemo(() => {
    const keys = Object.keys(props.form.lines);
    keys.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return keys.map(k => props.form.lines[k]);
  });

  return (
    <>
      <h2 class={S.formName}>Form {props.form.name}</h2>

      <table class={S.table}>
        <For each={lines()}>
          {line => <LineView tr={props.tr} line={line} />}
        </For>
      </table>
    </>
  );
}

interface LineProps {
  tr: TaxReturn;
  line: Line<any>;
}

function LineView(props: LineProps) {
  const { tr, line } = props;
  const value = createMemo(() => {
    try {
      return JSON.stringify(line.value(tr), null, 1);
    } catch (e) {
      return <span class={S.error} title={e.stack}>{e.message}</span>;
    }
  });

  const [ state, setState ] = createState({
    trace: "",
    showTrace: false
  });

  createDependentEffect(() => setState('trace', JSON.stringify(getLastTraceList(), null, '  ')), [value]);

  const toggleTrace = () => setState('showTrace', !state.showTrace);

  return (
    <tr class={S.line}>
      <th class={S.id} onclick={toggleTrace}>{line.id}</th>
      <td class={S.description}>
        {line.description}

        <Show when={state.showTrace}>
          <TraceViewer line={line} trace={state.trace} />
        </Show>
      </td>
      <td class={S.value}>{value()}</td>
    </tr>
  );
}

interface TraceProps {
  line: Line<any>;
  trace: string;
}

function TraceViewer(props: TraceProps) {
  return (
    <div class={S.traceViewer}>
      <h2>Trace {props.line.id}</h2>
      <div class={S.trace}>{props.trace}</div>
    </div>
  );
}
