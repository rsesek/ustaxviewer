import { TaxReturn } from 'ustaxlib/core';

import TaxReturnView from './TaxReturnView';

const S = require('./App.css');

interface Props {
  tr: TaxReturn;
}

export default function App(props: Props) {
  return (<div class={S.container}><TaxReturnView {...props} /></div>);
}
