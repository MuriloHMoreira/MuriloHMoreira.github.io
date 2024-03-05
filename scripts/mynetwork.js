var nodes = new vis.DataSet([
    {id: 1, label: 'Linguagem de\nProgramação', url: 'http://www.google.com', x:0, y:50, group: 'math', perfil: 1},
    {id: 2, label: 'Cálculo 2', url: 'http://www.google.com', x:200, y:0, group: 'math', perfil: 2},
    {id: 3, label: 'Cálculo 3', url: 'http://www.google.com', x:400, y:0, group: 'math', perfil: 3},
    {id: 4, label: 'Séries e EDO', url: 'http://www.google.com', x:600, y:0, group: 'math', perfil: 4},
    {id: 5, label: 'MMA', url: 'http://www.google.com', x:1000, y:0, group: 'math', perfil: 6},
    {id: 6, label: 'Geometria Analítica', url: 'http://www.google.com', x:0, y:100, group: 'math', perfil: 1},
    {id: 7, label: 'Cálculo Numérico', url: 'http://www.google.com', x:800, y:50, group: 'math', perfil: 5},
    // {id: 101, label: 'Semestre 1', x:0, y:-100, group: 'profile'},
    ]);

var edges = new vis.DataSet([
                            {from: 1, to: 2},
                            {from: 1, to: 7},        
                            {from: 1, to: 4},
                            {from: 1, to: 30},
                            {from: 2, to: 3},
                            {from: 2, to: 22},
                            ]);    

// create a network
var container = document.getElementById('mynetwork');
// container.oncontextmenu = () => false;
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
  layout: {improvedLayout: true},
  groups: {
    chemistry: {color:'coral'},
    math: {color:{background: 'grey', border:"black", 
                  hover: {background: "grey", border: "black"},
                  highlight: {background: "grey", border: "black"}},
           font:{color: "white", size:18, face: "IBM Plex Mono", align:"center"},
           borderWidth: 2,
           size: 50,
           shape: 'box'},
    physics: {color:'orange'},
    materials: {color: 'red', font: {weight: 'regular', color: 'white'}},
    ceramics: {color: '#451B1B', font: {weight: 'regular', color: 'white'}},
    metals: {color: 'CCCAD4', font: {weight: 'regular', color: 'black'}},
    polymers: {color: 'purple', font: {weight: 'regular', color: 'white'}},
    other: {color: '#F7E771', font: {weight: 'regular', color: 'black'}},
    profile: {color: 'white'}
    },
  edges: {arrows: {
            to: {
                 enabled: true,
                 scaleFactor: 0.5,
                 type: "arrow"
                 },
                },
smooth: false
},
physics: false,
interaction: {
    hover: true,
    dragNodes: true,// do not allow dragging nodes
    zoomView: true, // do not allow zooming
    dragView: true,  // do not allow dragging
    multiselect: true,
    navigationButtons: false,
    selectable: true,
    selectConnectedEdges: true,
},
width: "100%",   // This fills out the canvas size to the encompassing div
height: "100%"
};
var network = new vis.Network(container, data, options);