// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

import { createMemo } from 'solid-js';
import { For } from 'solid-js/dom';
import { TaxReturn, Form } from 'ustaxlib/core';

const S = require('./FormView.css');

interface FormProps {
  tr: TaxReturn;
  form: Form<any>;
}

export default function FormView(props: FormProps) {
  const lineKeys = createMemo(() => Object.keys(props.form.lines));

  return (
    <>
      <h2 class={S.formName}>Form {props.form.name}</h2>

      <table class={S.table}>
        <For each={lineKeys()}>
          {key => <Line tr={props.tr} line={props.form.lines[key]} />}
        </For>
      </table>
    </>
  );
}

function Line(props: { tr, line }) {
  const { tr, line } = props;
  const value = createMemo(() => {
    try {
      return line.value(tr);
    } catch (e) {
      return <span class={S.error} title={e.stack}>{e.message}</span>;
    }
  });
  return (
    <tr class={S.line}>
      <th class={S.id}>{line.id}</th>
      <td class={S.description}>{line.description}</td>
      <td class={S.value}>{value()}</td>
    </tr>
  );
}
