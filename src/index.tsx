import { render } from 'solid-js/dom';
import { TaxReturn, Person, Fed2019 } from 'ustaxlib';

import App from './App';

const tr = new TaxReturn(2019);
tr.addForm(new Fed2019.Form1040({ filingStatus: Fed2019.FilingStatus.Single }));
tr.addForm(new Fed2019.FormW2({
  employer: 'Employer',
  employee: Person.self('Robert'),
  wages: 130000,
  fedIncomeTax: 2500
}));
tr.addForm(new Fed2019.Schedule2);

render(() => <App tr={tr} />, document.getElementById('root'));
