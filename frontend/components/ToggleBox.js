import React from 'react';

class ToggleBox extends React.Component{

    render(){
        function handleClick(){
            this.props.toggle();
        }
        const algoName = this.props.info['name'];
        const algoDescription = this.props.info['description'];

        //const style = {position : "fixed", display : this.state.opened ? "block" : "none", zIndex : "19"};
        return(
            // <div style={{zIndex: "3"}}>
            //     <div className={gameButtonStyleString}><button onClick={() => this.props.toggle()}>show info</button></div>
            //     <div style={style}>{this.state.opened && <div> {this.props.text} </div>}</div>
            // </div>
            <div className="modal"> 
                <div className="modal_content">
                    <div className="absolute top-0 right-0 mr-5">
                        <button onClick={() => this.props.toggle()}> &times; </button>
                    </div>
                    <h1 className="text-3xl font-mono font-bold">{algoName}</h1>
                    <div className="px-4 font-mono">
                        <p>{algoDescription}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToggleBox;

