import ReactFlow from "react-flow-renderer";
import React from "react";

class DijkstraGraph extends React.Component{
    state = {
        nodeCount: this.props.nodeCount,
        currState: this.props.currState, //a state is represented by the triple (processed, distance, queue)
        adj: this.props.adj
    }

    //for dijkstra!
    createDijkstraCustomNode(id, processed, distanceTo, x, y){
        return(
            {
                id: id.toString(),
                style: {background: processed ? "gray" : "white", color: processed ? "pink" : "black"},
                data: {label: "id: " + id.toString() + ",  " + "current distance: " + distanceTo.toString()},
                position:{x: x, y: y},
            }
        );
    }

    renderDijkstraNodes(){

        var rtn = [];
        //var window = require("global/window");
        for(var i = 0; i < this.state.nodeCount; i ++)
        {
            if (typeof window !== "undefined"){
                var sequenceNum = i % 3;
                var X = (window.innerWidth / 4) + (sequenceNum * (window.innerWidth / 5));
                var Y = (i % 2) * (window.innerHeight / 5) + (window.innerHeight / 4);
                rtn.push(
                    this.createDijkstraCustomNode(i, this.state.currState[0][i], this.state.currState[1][i], X, Y)
                );
            }
        }
        return rtn;
    }

    renderDijkstraEdges(){
        var edges = [];
        var linked = new Array(this.state.nodeCount * this.state.nodeCount);
        for(var i = 0; i < linked.length; i ++)
        {
            linked[i] = false;
        }

        for(var i = 0; i < this.state.adj.length; i ++)
        {
            //iterate through each node
            for(var j = 0; j < this.state.adj[i].length; j ++)
            {
                //iterate through each adjacency of each node
                //adjacencies are stored in the format (Target, Weight)
                //making sure no edge is drawn twice due to the shape of adjacency list
                if(!linked[i * this.state.nodeCount + this.state.adj[i][j][0]] && !linked[this.state.adj[i][j][0] * this.state.nodeCount + i])
                {
                    linked[i * this.state.nodeCount + this.state.adj[i][j][0]] = true; linked[this.state.adj[i][j][0] * this.state.nodeCount + i] = true;
                    // const source = (this.state.currState[1][i] < this.state.currState[1][this.state.adj[i][j][0]]) ? i.toString() : this.state.adj[i][j][0].toString();
                    // const target = (this.state.currState[1][i] < this.state.currState[1][this.state.adj[i][j][0]]) ? this.state.adj[i][j][0].toString() : i.toString();
                    const source = i.toString();
                    const target = this.state.adj[i][j][0].toString();
                    if(this.state.currState[0][i] || this.state.currState[0][this.state.adj[i][j][0]]){
                        edges.push(
                            {
                                id: "e" + source + target,
                                type: 'straight',
                                source: source,
                                target: target,     
                                animated: false,
                                label: this.state.adj[i][j][1].toString(),
                                style: {stroke: "red", fontWeight: 1400, strokeWidth: "3"},
                            })
                    }else{
                        edges.push(
                            {
                                id: "e" + source + target,
                                type: 'straight',
                                source: source,
                                target: target,
                                animated: true,
                                label: this.state.adj[i][j][1].toString(),
                            })
                    }  
                }
            }
        }
        return edges;
    }
    
    render(){
        var game;
        //console.log(this.state.edgeList);
        switch(this.props.mode){
            case "dijkstra":
                const graphStyles = { width: '100%', height: '100vh'};
                const nodes = this.renderDijkstraNodes();
                const edges = this.renderDijkstraEdges();
                game = <ReactFlow elements={nodes.concat(edges)} style={graphStyles} />
            break;

            case "kruskal":
                game = <div>TO DO!</div>
            break;
        }
        return game;
    }
}

export default DijkstraGraph;