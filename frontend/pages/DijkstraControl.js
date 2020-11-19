import Dijkstra from "../algorithms/Dijkstra.js";
import React from "react";

class DijkstraControl extends React.Component{
    
    state = {
        currStateIndex: 0,
        adjList: this.generateGraph(6),
        nodeCount: 6,
    }

    //returns an adjacency list that represents a graph
    generateGraph(n){  //n is the number of nodes
        var linked = new Array(n*n);
        for(var i = 0; i < n * n; i ++)
        {
            linked[i] = false;
        }
        var adj = new Array(n);
        for(var i = 0; i < n; i ++)
        {
            adj[i] = []
        }
        for(var i = 0; i < n; i ++)
        {
            for (var j = i; j < n; j ++){
                if (!linked[i * n + j] && !linked[j * n + i] && (i !== j) && (Math.random() >= 0.556)){
                    linked[i * n + j] = true; linked[j * n + i] = true;
                    var tempWeight = Math.ceil(Math.random() * 30);
                    adj[i].push([j, tempWeight]); adj[j].push([i, tempWeight]);
                }

            }
        }
        return adj;
    }

    render(){
        return(
            <div>
                <Dijkstra key={this.state.currStateIndex} 
                    currStateIndex={this.state.currStateIndex} 
                    nodeCount={this.state.nodeCount} 
                    adjList={this.state.adjList}/>   
            </div>
            
        );
    }
}

export default DijkstraControl;