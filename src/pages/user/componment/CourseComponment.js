import React from 'react'
import './course.scss'
import _ from 'lodash';

const courses = [
    { id: 1, name: 'React入门', number: 8 },
    { id: 2, name: 'redux', number: 16 },
    { id: 3, name: 'redux-saga', number: 20 },
    { id: 4, name: 'dva', number: 7 },
    { id: 5, name: 'git', number: 21 },
    // { id: 6, name: 'eggjs', number: 6 },
    { id: 7, name: 'graphql', number: 18 },
    { id: 8, name: 'lodash', number: 50 },
    // { id: 9, name: 'docker', number: 12 },
    { id: 10, name: 'es6/7', number: 5 },
    { id: 11, name: 'mysql', number: 18 },
    { id: 12, name: 'Android', number: 22 },
    { id: 13, name: '部署', number: 30 },
]

class CourseComponment extends React.Component {

    clickCourse = (id) => {
        console.log('id', id)
    }

    render() {
        const { classify } = this.props;
        return (
            <div className='course_root'>
                <div className='course_title_tv'>系列教程</div>
                <div className='course_list'>
                    {
                        classify && !_.isEmpty(classify) ?
                            <div> {classify.map((item, index) => {
                                return <div className='course_item' key={index} onClick={this.clickCourse.bind(this, item.name)}>
                                    <div className='course_item_name_tv'>{item.name}</div>
                                    {
                                        item.detail && !_.isEmpty(item.detail) ?
                                            <div className='course_item_number_tv'>{JSON.parse(item.detail).length}</div>
                                            :
                                            <div className='course_item_number_tv'>0</div>
                                    }

                                </div>
                            })}</div> : 'Ta还没有添加分类~'
                    }

                </div></div>
        )
    }
}

export default CourseComponment;