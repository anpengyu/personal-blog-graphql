import React from 'react';
import { LAST_PATH_NAME } from '../utils/Constant'
import _ from 'lodash';

export default class BasePage extends React.Component {

    constructor(props) {
        super(props);
        let pathname = this.props.history.location.pathname;
        if (!_.eq(pathname,'/login')) {
            localStorage.setItem(LAST_PATH_NAME, pathname)
        }
    }
}