import React from 'react';
import { LAST_PATH_NAME } from '../utils/Constant'

export default class Base extends React.Component {

    constructor(props) {
        super(props);
        let pathname = this.props.history.location.pathname;
        if (pathname != '/login') {
            localStorage.setItem(LAST_PATH_NAME, pathname)
        }
    }
}