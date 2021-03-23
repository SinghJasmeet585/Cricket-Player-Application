import React from 'react';
import Loader from 'react-loader-spinner';

export default function Loading(props) {
    // console.log(props.type);
    return (
        <div className="loading-container">
            <Loader type={props.type} color={props.color} height={props.height} width={props.width} />
        </div>
    )
}
