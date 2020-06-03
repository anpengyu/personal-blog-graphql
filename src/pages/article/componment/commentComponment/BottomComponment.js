import React, { FC, useState } from 'react';
import styles from '../../index.scss';
import moment from 'moment';
import _ from 'lodash';

// const BottomComponment: FC = (props) => {
class BottomComponment extends React.Component {


    // const comment = props.comment;
    // const itemId = props.item.id;
    // const [unfold, setUnfold] = useState([])//添加新类型

    unfoldComent = () => {
        let { item, unfold } = this.props;
        let itemId = item.id;
        let indexOf = _.indexOf(unfold, itemId)
        if (indexOf == -1) {
            unfold.push(itemId)
        } else {
            unfold = _.filter(unfold, function (item) {
                return item != itemId;
            })
        }
        this.props.unfoldFun(unfold)
    }

    render() {
        const { item, comment, unfold } = this.props;
        let itemId = item.id;
        return (
            <div style={{ display: 'flex', height: '30px', lineHeight: '30px' }}>
                <div style={{ display: 'flex', cursor: 'pointer' }}>
                    <div style={{ height: 20, width: 20 }}>
                        {
                            _.eq(this.props.type, 'ToCommentComponent') ? <img
                                src={require('../../../../assets/second_like.png')} /> : <img
                                    src={require('../../../../assets/like.png')} />
                        }

                    </div>
                    <div style={{ marginLeft: '5px' }}>{item.likes}</div>
                </div>

                <div style={{ display: 'flex', marginLeft: '20px', cursor: 'pointer' }} onClick={this.props.publishButton.bind(this, itemId)}>
                    <div style={{ height: 20, width: 20 }}><img src={require('../../../../assets/reply.png')} /></div>
                    <div style={{ marginLeft: '5px' }}>{_.indexOf(this.props.secondaryCommentVisible, itemId) != -1 ? '取消回复' : '回复'}</div>
                </div>

                {
                    !_.eq(this.props.type, 'ToCommentComponent') && _.isArray(comment) && comment.length != 0 ?
                        <div style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={this.unfoldComent.bind(this)}>

                            {_.indexOf(unfold, itemId) == -1 ? '收起评论' : <div>{comment.length}条评论</div>}

                        </div> : null
                }
            </div>
        )
    }


}

export default BottomComponment