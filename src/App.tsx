import { createMemo, createState } from 'solid-js';
import { For } from 'solid-js/dom';
import { TaxReturn, Form } from 'ustaxlib/core';

import FormView from './FormView';

const S = require('./App.css');

interface AppProps {
  tr: TaxReturn;
}

export default function App(props: AppProps) {
  const [ state, setState ] = createState({ form: props.tr.forms[0] });

  const changeForm = e => {
    setState({ form: props.tr.forms[e.target.value] });
  };

  const formIndexToName = createMemo(() => props.tr.forms.map((form, i) => [i, form.name]));

  const formSelector = (
    <select onchange={changeForm}>
      <For each={formIndexToName()}>
        {tuple => (<option value={tuple[0]}>{tuple[1]}</option>)}
      </For>
    </select>
  );

  return (
    <div class={S.container}>
      <div class={S.header}>
        <h1>ustaxlib Federal {props.tr.year}</h1>
        {formSelector}
      </div>

      <FormView tr={props.tr} form={state.form as Form<any>} />
    </div>
  );
}
