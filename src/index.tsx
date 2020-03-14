// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

import { render } from 'solid-js/dom';
import { Form1040, FilingStatus, Schedule2, TaxReturn, W2 } from 'ustaxlib/fed2019';

import { Person } from 'ustaxlib/core';

import App from './App';

const tr = new TaxReturn();
tr.addForm(new Form1040({ filingStatus: FilingStatus.Single }));
tr.addForm(new W2({
  employer: 'Employer',
  employee: Person.self('Robert'),
  wages: 130000,
  fedIncomeTax: 2500
}));
tr.addForm(new Schedule2);

render(() => <App tr={tr} />, document.getElementById('root'));
