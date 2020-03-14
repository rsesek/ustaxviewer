// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

import { TaxReturn } from 'ustaxlib/core';

import TaxReturnView from './TaxReturnView';

const S = require('./App.css');

interface Props {
  tr: TaxReturn;
}

export default function App(props: Props) {
  return (<div class={S.container}><TaxReturnView {...props} /></div>);
}
