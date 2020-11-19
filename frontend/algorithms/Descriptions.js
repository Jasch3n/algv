const descriptions = [
    {
        name : "Dijkstra's Algorithm", 
        description : `Dijkstra's Algorithm (1956) is a famous shortest path algorithm.
        Given a starting vertex, the algorithm will be able to find the shortest (or lightest)
        distances and paths to every other reachable vertex in the graph in O[Vlog(V)] time,
        where V is the number of vertices in the graph (assuming a sparse connection). \n
        The algorithm simply always explores all edges leading to the neighboring vertices of the currently lightest
        vertex, and then picks the globally lightest vertex and repeat the step. It is important to note that 
        Dijkstra's Algorithm will not produce correct answers with certain graphs containing cycles with negative weights due to
        its locally optimizing nature.`
    },
    {
        name : "Kruskal's Algorithm", 
        description : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
        anim id est laborum.`
    },

]

export default descriptions;