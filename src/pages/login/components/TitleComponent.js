import React from 'react';
import '../index.css'

export default (props) => {
    const { selectTitle, mouseTitle, enumMouseTitle, enumTitle } = props;
    return (
        <div>
            <div>
                <div
                    onMouseOver={props.onMouseOver.bind(this, enumMouseTitle.LoginOver)}
                    onMouseOut={props.onMouseOver.bind(this, enumMouseTitle.NULL)}
                    onClick={props.changeTitle.bind(this, enumTitle.LoginSelect)}
                    className={mouseTitle == enumMouseTitle.LoginOver ? 'moushOverTitle' : selectTitle == enumTitle.LoginSelect ? 'title_select' : 'login_title'}>
                    登录
            </div>
                <div
                    onMouseOver={props.onMouseOver.bind(this, enumMouseTitle.RegisterOver)}
                    onMouseOut={props.onMouseOver.bind(this, enumMouseTitle.NULL)}
                    onClick={props.changeTitle.bind(this, enumTitle.RegisterSelect)}
                    style={{ marginLeft: 20 }}
                    className={mouseTitle == enumMouseTitle.RegisterOver ? 'moushOverTitle' : selectTitle == enumTitle.LoginSelect ? 'login_title' : 'title_select'}>
                    注册
            </div>
            </div>
        </div>
    );
}