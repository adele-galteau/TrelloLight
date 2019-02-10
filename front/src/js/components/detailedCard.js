import React from 'react'

export default class DetailedCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid" style={{background: "rgba(0, 0, 0, 0.64)", zIndex:"0", position: "absolute", top: "0", bottom: "0"}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mt-5" style={{borderRadius: "3px", background: "rgb(223, 227, 230)", paddingBottom: "17px"}}>
                            <div style={{padding: "12px 40px 25px 56px"}}>
                                <h1 style={{fontSize: "20px", fontWeight: "700", color: "#17394d", margin: "0"}}>Hello world !</h1>
                                <p style={{color: "#6b808c", margin: "0", fontSize: "14px", fontWeight: "400"}}>in list Prout</p>
                            </div>
                            
                            <div style={{   padding: "0 40px 8px 56px"}}>
                                <h2 style={{fontSize: "16px", fontWeight: "700", color: "#17394d", marginBottom: "12px"}}>Description</h2>
                                <div style={{borderRadius: "3px", background: "rgba(9,45,66,.08)"}}>
                                    <p style={{color: "#6b808c", fontSize: "14px", margin: "0", height: "54px", padding: "7px 9px"}}>Add a more detailed description...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}