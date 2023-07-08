import React from 'react';

const Display = ({testResult}) => {
    return (
        <section className="load-tester__display">
            <div className="container">
                {testResult}
            </div>
        </section>
    );
};

export default Display;