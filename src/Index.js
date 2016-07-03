import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import {IntlProvider,addLocaleData,defineMessages} from 'react-intl';
import routes from './routes';

window.React = React;

render(<Router history={hashHistory} routes={routes}/>, document.getElementById('content'));
