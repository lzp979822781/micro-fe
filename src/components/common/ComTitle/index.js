import React from 'react';
import './index.less';

export default function index(props) {
    const {name} = props;
    return (
        <div className='title-style'>
            {name}
        </div>
    );
}
