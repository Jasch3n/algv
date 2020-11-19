import ReactFlow from "react-flow-renderer";
import React from "react";

class KruskalGraph extends React.Component{
    state = {
        currState: this.props.currState,
        nodeNames: this.props.nodeNames,
    }

    //for kruskal
    createKruskalCustomNode(id, x, y){
        return(
            {
                id: id.toString(),
                data: {label: "id: " + id.toString()},
                position: {x: x, y: y},
            }
        );
    }

    renderKruskalNodes(nodeNames){
        var toBeRendered = [];

        for(var i = 0; i < nodeNames.length; i ++)
        {
            toBeRendered.push(
                this.createKruskalCustomNode(nodeNames[i], (i % 2) * 100 + i * 50, (i % 2) * 100 + 200)
            );
        }
        return toBeRendered;
    }

    renderKruskalEdges(){
        var toBeRendered = [];
        var placedDown = [...this.state.currState[2]];
        var allEdges = [...this.state.currState[3]];

        for (var i = 0; i < allEdges.length; i ++){
            var source = allEdges[i][0].toString();
            var target = allEdges[i][1].toString();
            var weight = allEdges[i][2].toString();
            if (placedDown.includes(allEdges[i])){
                toBeRendered.push(
                    {
                        id: "e" + source + target,
                        type: 'straight',
                        source: source,
                        target: target,     
                        animated: false,
                        label: weight.toString(),
                        style: {stroke: "red", fontWeight: 1400, strokeWidth: "3"},
                    });
            }
            else{
                toBeRendered.push(
                    {
                        id: "e" + source + target,
                        type: 'straight',
                        source: source,
                        target: target,
                        animated: true,
                        label: weight.toString(),
                    });
            }
        }
        return toBeRendered;
    }

    render(){
        const graphStyles = {width: '100%', height: '100vh'};
        const nodes = this.renderKruskalNodes(this.state.nodeNames);
        const edges = this.renderKruskalEdges();
        return <ReactFlow elements={nodes.concat(edges)} style={graphStyles} />
    }
}

export default KruskalGraph;