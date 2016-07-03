import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import {IntlProvider,addLocaleData,defineMessages} from 'react-intl';
import routes from './routes';

window.React = React;

render(<Router history={browserHistory} routes={routes}/>, document.getElementById('content'));
