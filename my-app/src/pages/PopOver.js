import React from 'react';


const PopOver = () => {
    return (
        <div>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button variant="success">Click me to see</Button>
            </OverlayTrigger>
        </div>
    );
};

export default PopOver;