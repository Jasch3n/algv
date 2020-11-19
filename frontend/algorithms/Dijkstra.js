import DijkstraGraph from "../components/DijkstraGraph";
import Navbar from '../components/Navbar'
import ToggleBox from '../components/ToggleBox';
import descriptions from "./Descriptions";
import React from "react";

class Dijkstra extends React.Component{
    state = {
        popped : false,
        nodeCount: this.props.nodeCount,
        adjList: this.props.adjList,
        currStateIndex: 0,
        gameStates: this.dijkstra(0, this.props.nodeCount, this.props.adjList),
    }

    dijkstra(start, nodeCount, adjList){
        //returns a list of shortest distances from start to all nodes in its graph
        var q = [];
        const n = nodeCount;
        const adj = adjList;
        var processed = new Array(n); for(var i = 0; i < n; i ++) processed[i] = false;
        var distance = new Array(n); for(var i = 0; i < n; i ++) distance[i] = (i === start) ? 0 : Infinity;
        var sts = []    //stores the state of the algorithm in the format of an array of [processed, distance, q]
        q.push([0, start]);

        while(q.length !== 0){
            q.sort((a, b) => a[0] - b[0]);  //an lazy implementation of a priority queue
            var tempProcessed = [...processed]; var tempDistance = [...distance]; var tempQ = [...q];
            sts.push([tempProcessed, tempDistance, tempQ]);
            
            var a = q[0][1]; q.shift();    //selects the current shortest node to start node
            if(processed[a]) continue;     //if it has already been selected before, skip
            processed[a] = true;
            adj[a].forEach( edge => {   //for each edge, if extending the edge gives a shorter distance
                    var b = edge[0];    //update the distance and push the (node, distance to node) pair
                    var w = edge[1];    //to the priority queue
                    if(distance[a] + w < distance[b]){
                        distance[b] = distance[a] + w;
                        q.push([distance[b], b]);
                    }
                }
            )
        } 
        var tempProcessed = [...processed]; var tempDistance = [...distance]; var tempQ = [...q];
        sts.push([tempProcessed, tempDistance, tempQ]);
        return sts;
    }
        
                 //   {/*<button onClick={() => console.log(this.dijkstra(1))}>dijkstra</button>*/}
                 //    {/*<button onClick={() => console.log(this.state.gameStates)}>view game states</button>*/}
    render(){
        function handleStateAdvance(){
            if(this.state.currStateIndex + 1 < this.state.gameStates.length){
                this.setState({currStateIndex: this.state.currStateIndex + 1});
            } else{
                alert("Dijkstra Algorithm Complete!");
            }
        }

        function toggle(){
            this.setState({popped: !this.state.popped});
            console.log(this.state.popped);
        }

        const dijkstraInfo = `Dijkstra's Algorithm finds the shortest distance from a given node to all other nodes in the graph, \n
        it is important to note that it will not work with graphs that have cycles with negative weights `
        const toggleString = `z-index:1; position:fixed; margin-left:auto; margin-right:auto;`
        const gameButtonStyleString = `transition duration-200 ease-in-out shadow border-2 hover:bg-pink-200 hover:text-white
                                    border-gray rounded-full px-2 mx-3 font-semibold font-mono text-black`;
        return (
            <div className="w-screen">
                <div>
                    {this.state.popped ? <ToggleBox toggle={toggle.bind(this)} info={descriptions[0]}/> : null}
                </div>
                <Navbar isBlack={true}/>
                <div>
                    <div className="flex flex-row justify-center px-auto mx-auto pt-20">
                        <div className={gameButtonStyleString}><button onClick={handleStateAdvance.bind(this)}>Advance Graph State</button></div>
                        <div className={gameButtonStyleString}><button onClick={() => window.location.reload(true)}>New Graph</button></div>
                        {/* <PopupInfo /> */}
                        {/* <Popup modal trigger={<button>Click Me</button>}>
                            Modal Content
                        </Popup> */}
                        <div className={gameButtonStyleString}>
                            <button onClick={toggle.bind(this)} >Toggle Info</button>
                        </div>
                        
                    
                    </div>
                </div>
                
                
                {/* <button onClick={() => console.log(this.state.adjList)}> view current graph </button>
                <button onClick={() => console.log(this.state.gameStates)}>view game states</button>  */}
                <div className="w-screen">
                    <div>
                        <DijkstraGraph 
                            key={this.state.currStateIndex} 
                            mode = {"dijkstra"}
                            nodeCount = {this.state.nodeCount} 
                            adj = {this.state.adjList} 
                            currState = {this.state.gameStates[this.state.currStateIndex]} />
                    </div>
                </div>
            </div>     
        );
    }
}

export default Dijkstra;