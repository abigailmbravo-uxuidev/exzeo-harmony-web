import React from 'react';

import SearchConnect from '../components/Search/Search';
import BaseConnect from './Base';

const PolicySearch = props => <BaseConnect {...props} ><div className="workflow" role="article">
  <div className={'route search'}>
    <SearchConnect />
  </div>
</div></BaseConnect>;

export default PolicySearch;
