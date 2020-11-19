import KruskalGraph from "../components/KruskalGraph.js";
import React from "react";

class Kruskal extends React.Component{
    state = {
        nodeCount: this.props.nodeCount,
        edgeList: this.props.edgeList,
        currStateIndex: 0,
        gameStates: this.kruskal(this.props.nodeCount, this.props.edgeList),
    }

    kruskal(nodeCount, edges){
        var linked = new Array(nodeCount); for(var i = 0; i < nodeCount; i ++) linked[i] = i;
        var size = new Array(nodeCount); for(var i = 0; i < nodeCount; i ++) size[i] = 1;
        var states = [];
        var placedDown = [];
        edges.sort((a, b) => a[2] - b[2]);
        var edgeQ = [...edges]; 

        //returns the index of the representative of the set that the input is in
        function find(a){   
            var A = a
           while(A !== linked[A]){
               A = linked[A];
           } 
           return A;
        }  

        //returns boolean indicating whether the two input nodes are in the same component 
        function same(a, b){  
            return find(a) === find(b);
        }

        //modifies the "linked" list so as to connect different components together
        function union(a, b){
            var repA = find(a);
            var repB = find(b);
            //always link the smaller set to the larger set for time efficiency
            if (size[repB] < size[repA]) {var temp = repA; repA = repB; repB = temp;} 
            linked[repA] = repB; 
            size[repB] = size[repA] + size[repB];
        }

        while(edgeQ.length !== 0){
            var tempPlacedDown = [...placedDown]; var tempLinked = [...linked]; var tempSize = [...size];
            states.push([tempLinked, tempSize, tempPlacedDown, edges]);
            //maintains a queue in order to process the edges by ascending order of weights
            var topEdge = edgeQ[0]; edgeQ.shift();
            var a = topEdge[0]; var b = topEdge[1]; 
            //only place down an edge if the two nodes in the edge were not already in the same component already
            if(!same(a,b)){ placedDown.push(topEdge); union(a,b); }
        }

        var tempPlacedDown = [...placedDown]; tempSize = [...size]; tempLinked = [...linked];
        states.push([tempLinked, tempSize, tempPlacedDown, edges]);

        return states;
    }
    
    nodeNames(){
        var allEdges = [...this.state.edgeList];
        var nodeNames = []
        for (var i = 0; i < allEdges.length; i ++){
            var a = allEdges[i][0];
            var b = allEdges[i][1];
            if (!nodeNames.includes(a)) nodeNames.push(a);
            if (!nodeNames.includes(b)) nodeNames.push(b);
        }
        return nodeNames;
    }

    render(){
        function handleStateAdvance(){
            if(this.state.currStateIndex + 1 < this.state.gameStates.length){
                this.setState({currStateIndex: this.state.currStateIndex + 1});
            } else{
                alert("MST Construction Complete!");
            }
        }
        return (
            <div>
                <button onClick={() => console.log(this.kruskal(this.state.nodeCount, this.state.edgeList))}> see union find result </button>
                <button onClick={handleStateAdvance.bind(this)}>advance graph state</button>
                <KruskalGraph 
                    key = {this.state.currStateIndex}
                    nodeNames = {this.nodeNames()}
                    currIndex = {this.state.currStateIndex}
                    currState = {this.state.gameStates[this.state.currStateIndex]}
                />
            </div>
        );
    }
}

export default Kruskal;