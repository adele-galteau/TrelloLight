import React from 'react'

export default class InternalServerError extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <h1>500 Internal Server Error</h1>
                    </div>
                    
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <p>Oops, something went wrong.</p>
                        <p>Please try again later.</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}