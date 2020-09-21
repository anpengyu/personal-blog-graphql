import React from 'react';
import RightModuleTitle from './RightModuleTitle';
import '../index.scss';

export default class RightComponent extends React.Component{

    render(){
        return(
            <div style={{width:'300px',marginLeft:'10px'}}>
                <div className='right_module' style={{backgroundColor:'#fff',height:'150px'}} >
                <RightModuleTitle />
                </div>
                <div className='right_module'  style={{backgroundColor:'#fff',height:'150px',marginTop:'10px'}}>
                ddddddd
                </div>
            </div>
        )
    }
}