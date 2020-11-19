import Kruskal from "../algorithms/Kruskal.js";
import React from "react";

class KruskalControl extends React.Component{
    state = {
        currStateIndex: 0,
        edgeList: this.generateGraph(6),
        nodeCount: 6,
    }

    generateGraph(n){  //generates an EDGE LIST representation of a graph, as opposed to adjacency list!
        var linked = new Array(n*n);
        for(var i = 0; i < n * n; i ++)
        {
            linked[i] = false;
        }
        var edges = [];
        for(var i = 0; i < n; i ++)
        {
            for (var j = i; j < n; j ++){
                if (!linked[i * n + j] && !linked[j * n + i] && (i !== j) && (Math.random() >= 0.556)){
                    linked[i * n + j] = true; linked[j * n + i] = true;
                    var tempWeight = Math.ceil(Math.random() * 30);
                    edges.push([i, j, tempWeight]);
                }

            }
        }
        return edges;
    }



    render(){

        return (
        <div>
            <button onClick={() => console.log(this.generateGraph(this.state.nodeCount))}> print new edge list </button> testing
            <Kruskal 
                key={this.state.currStateIndex} 
                currStateIndex={this.state.currStateIndex} 
                nodeCount={this.state.nodeCount} 
                edgeList={this.state.edgeList}
            />
        </div>);
    }   
}

export default KruskalControl;