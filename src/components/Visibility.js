import React, { useRef } from 'react';
import windowDimensions from 'react-window-dimensions';

const Visibility = ({width,height,onVisibility}) => {
    const domEl = useRef();
    const isInViewport = () => {
        const rect = domEl.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= height && rect.right <= width) {
            onVisibility(true);
        }
    }
    return (
        <div ref={domEl} onScroll={isInViewport} onLoad={isInViewport} >

        </div>
    );
}

export default windowDimensions()(Visibility);