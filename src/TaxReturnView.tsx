// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

import { createMemo, createState } from 'solid-js';
import { For } from 'solid-js/dom';
import { Form, Person, TaxReturn } from 'ustaxlib/core';

import FormView from './FormView';

const S = require('./TaxReturnView.css');

interface Props {
  tr: TaxReturn;
}

export default function TaxReturnView(props: Props) {
  const [ state, setState ] = createState({ form: props.tr.forms[0] });

  const changeForm = e => {
    setState({ form: props.tr.forms[e.target.value] });
  };

  const formIndexToName = createMemo(() => props.tr.forms.map((form, i) => {
    let name = form.name;
    const person = form.person();
    if (person !== undefined) {
      const personName = person === Person.joint ? 'Joint' : person.name;
      name += ` (${personName})`;
    }
    return [i, name];
  }));

  const formSelector = (
    <select onchange={changeForm}>
      <For each={formIndexToName()}>
        {tuple => (<option value={tuple[0]}>{tuple[1]}</option>)}
      </For>
    </select>
  );

  return (
    <div>
      <div class={S.header}>
        <h1>ustaxlib Federal {props.tr.year}</h1>
        {formSelector}
      </div>

      <FormView tr={props.tr} form={state.form as Form<any>} />
    </div>
  );
}

