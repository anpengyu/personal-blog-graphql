import React from 'react';
import avatar from '../../../assets/head.jpg';
import './marks.scss'

const userMarks = [
    {
        id: 1,
        name: 'react',
    },
    {
        id: 2,
        name: 'redux',
    },
    {
        id: 3,
        name: 'dva',
    },
    {
        id: 4,
        name: 'umi',
    },
    {
        id: 5,
        name: 'nodejs',
    },
    {
        id: 7,
        name: 'graphql',
    },
    {
        id: 6,
        name: 'eggjs',
    },
]

class MarksComponment extends React.Component {

    clickMarks = (id) => {

    }

    render() {
        return (
            <div className='marks_root'>
                {
                    userMarks.map((item, index) => {
                        var r = parseInt(Math.random() * 255);
                        var g = parseInt(Math.random() * 255);
                        var b = parseInt(Math.random() * 255);
                        var size = parseInt(Math.random() * 18) + 12;
                        return <div className='marks_item' style={{ fontSize: size, color: 'rgb(' + r + ',' + g + ',' + b + ')' }}
                            onClick={this.clickMarks.bind(this, item.id)}>
                            <div>{item.name}</div>
                        </div>
                    })
                }
            </div>
        )
    }
}

export default MarksComponment;