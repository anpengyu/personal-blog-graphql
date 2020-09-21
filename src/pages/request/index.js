import React from 'react';
import DetailCompnent from './component/DetailComponent';
class RequestComponent extends React.Component{

    render(){
        return(
           <div style={{backgroundColor:'#fff',width:'1200px',margin:'0 auto'}}>
                <DetailCompnent />
           </div>
        )
    }
}

export default RequestComponent;