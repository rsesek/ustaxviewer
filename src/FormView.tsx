// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

import { createEffect, createMemo, createState } from 'solid-js';
import { For, Show } from 'solid-js/dom';
import { TaxReturn, Form, Line } from 'ustaxlib/core';
import * as Trace from 'ustaxlib/core/Trace';
import { Edge } from 'ustaxlib/core/Trace';
import { graphviz } from 'd3-graphviz';

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
    <div class={S.form}>
      <h2 class={S.formName}>Form {props.form.name}</h2>

      <div class={S.table}>
        <For each={lines()}>
          {line => <LineView tr={props.tr} line={line} />}
        </For>
      </div>
    </div>
  );
}

interface LineProps {
  tr: TaxReturn;
  line: Line<any>;
}

function LineView(props: LineProps) {
  const { tr, line } = props;

  const [ state, setState ] = createState({
    value: undefined as any,
    error: undefined as any,
    trace: [] as readonly Edge[],
    showTrace: false
  });

  createEffect(() => {
    const newState = {
      value: undefined,
      error: undefined,
      trace: [] as readonly Edge[]
    };
    try {
      Trace.reset();
      newState.value = line.value(tr);
    } catch (e) {
      newState.error = e;
    }
    newState.trace = Trace.getLastTraceList();
    setState(newState);
  });

  const valueDisplay = createMemo(() => {
    if (state.error) {
      return <span class={S.error} title={state.error.stack}>{state.error.message}</span>;
    }
    return JSON.stringify(state.value, null, 1);
  });

  const toggleTrace = () => setState('showTrace', !state.showTrace);

  return (
    <>
      <div class={S.line}>
        <div class={S.id} onclick={toggleTrace}>{line.id}</div>
        <div class={S.description}>
          {line.description}

        </div>
        <div class={S.value}>{valueDisplay()}</div>
      </div>
      <Show when={state.showTrace}>
        <TraceViewer line={line} trace={state.trace} onClose={() => setState('showTrace', false)} />
      </Show>
    </>
  );
}

interface TraceProps {
  line: Line<any>;
  trace: readonly Edge[];

  onClose: () => void;
}

function TraceViewer(props: TraceProps) {
  const renderGraph = (ref) => {
    let graph = '';
    for (const edge of props.trace) {
      graph += `"${edge[1]}" -> "${edge[0]}"; `;
    }
    graphviz(ref)
      .zoomScaleExtent([0.1, 1])
      .renderDot(`digraph { ${graph} }`, () => {
        if (ref.querySelector('svg').clientWidth > ref.parentNode.clientWidth) {
          ref.parentNode.classList.add(S.large);
        }
      });
  };
  return (
    <div class={S.traceViewer}>
      <h2>Trace {props.line.id}  <button class={S.close} onclick={props.onClose}>\u24E7</button></h2>
      <div forwardRef={renderGraph}></div>
    </div>
  );
}
