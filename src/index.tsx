import { render } from 'solid-js/dom';
import { Form1040, FilingStatus, Schedule2, W2 } from 'ustaxlib/fed2019';

import { TaxReturn, Person } from 'ustaxlib/core';

import App from './App';

const tr = new TaxReturn(2019);
tr.addForm(new Form1040({ filingStatus: FilingStatus.Single }));
tr.addForm(new W2({
  employer: 'Employer',
  employee: Person.self('Robert'),
  wages: 130000,
  fedIncomeTax: 2500
}));
tr.addForm(new Schedule2);

render(() => <App tr={tr} />, document.getElementById('root'));
