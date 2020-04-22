import React from 'react'
import './course.scss'
import _ from 'lodash';

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
                                return <div className='course_item' key={index} onClick={this.clickCourse.bind(this, item.id)}>
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