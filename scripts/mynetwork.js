var nodes = new vis.DataSet([
    {id: 1, label: 'Linguagem de\nProgramação', url: 'http://www.google.com', x:200, y:-70, group: 'programming'},
    {id: 2, label: 'Bash/Shell', url: 'http://www.google.com', font:{color: "white"}, shape:'image', image: "assets/img/Bash-logo.svg", x:200, y:60, group: 'bash'},
    {id: 3, label: 'Automatização', url: 'http://www.google.com', x:0, y:60, group: 'bash'},
    {id: 4, label: 'Rodar Programas', url: 'http://www.google.com', x:400, y:60, group: 'bash'},
    {id: 20, label: 'Python', url: 'http://www.google.com', shape:'image', image: "assets/img/Python-logo.svg", x:200, y:250, group: 'python_funs'},
    {id: 30, label: 'Gráficos', url: 'http://www.google.com', x:0, y:200, group: 'python_funs'},
    {id: 40, label: 'Processamento\nde Arquivos', url: 'http://www.google.com', x:0, y:250, group: 'python_funs'},
    {id: 50, label: 'Cálculos Avançados', url: 'http://www.google.com', x:0, y:300, group: 'python_funs'},
    {id: 60, label: 'Otimização', url: 'http://www.google.com', x:400, y:200, group: 'python_funs'},
    {id: 70, label: 'Ler/Escrever Dados', url: 'http://www.google.com', x:400, y:250, group: 'python_funs'},
    {id: 80, label: 'Aplicações Específicas', url: 'http://www.google.com', x:400, y:300, group: 'python_funs'},
    ]);

var edges = new vis.DataSet([
                            {from: 1, to: 2},
                            {from: 2, to: 3},
                            {from: 2, to: 4},
                            {from: 2, to: 20},
                            {from: 20, to: 30},        
                            {from: 20, to: 40},
                            {from: 20, to: 50},
                            {from: 20, to: 60},
                            {from: 20, to: 70},
                            {from: 20, to: 80},

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
    programming: {color:{background: 'grey', border:"black", 
                  hover: {background: "grey", border: "black"},
                  highlight: {background: "grey", border: "black"}},
           font:{color: "white", size:18, face: "monospace", align:"center"},
           borderWidth: 2,
           size: 50,
           shape: 'box'},
    python_funs: {color:{background: 'lightgrey', border:"black", 
                  hover: {background: "lightgrey", border: "black"},
                  highlight: {background: "lightgrey", border: "black"}},
           font:{color: "black", size:18, face: "monospace", align:"center"},
           borderWidth: 2,
           size: 50,
           shape: 'box'},
    bash: {color:{background: ' #F0F0F0', border:"black", 
                  hover: {background: " #F0F0F0", border: "black"},
                  highlight: {background: " #F0F0F0", border: "black"}},
           font:{color: "black", size:18, face: "monospace", align:"center"},
           borderWidth: 2,
           size: 50,
           shape: 'box'},
    },
  edges: {width: 3,
          arrows: {
            to: {
                 enabled: true,
                 scaleFactor: 1,
                 type: "arrow",

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

network.moveTo({
  scale: 1.5            // Zooms out; 1 is no zoom
});

// Create info windows
var allNodes = nodes.get({returnType:"Object"});
var myParent = document.body;
//Create array of options to be added
var nodeId;

for (nodeId in allNodes){
  //Create and append select list
  var divNode = document.createElement("div");
  divNode.id = "node_info_" + nodeId;
  divNode.classList.add("divNode");
  document.body.appendChild(divNode);
  divNode.style.display = "none";
  divNodeText = document.createElement("p")
  divNodeText.textContent = allNodes[nodeId].label
  divNode.appendChild(divNodeText)
}
$("#mynetwork canvas").attr("id","canvas");
function showNodeInfo(params) {
      // Get the node ID
      var nodeId = params.node;
      if (nodeId) {
        // Get the node title to show in the popup
        var popup = this.body.nodes[nodeId].options.title;

        // Get the node coordinates
        var { x: nodeX, y: nodeY } = network.canvasToDOM(
          network.getPositions([nodeId])[nodeId]
        );

        // Show the tooltip in a div
        var mynetworkCanvas = document.getElementById("canvas");
        var rect = mynetworkCanvas.getBoundingClientRect();
        bb = network.getBoundingBox(nodeId)
        nodeX += rect.left + (bb.left - bb.right)/2;
        nodeY += rect.top - (document.body.getBoundingClientRect().top - 30);
        
        console.log("rank_selection_" + nodeId)
        document.getElementById("node_info_" + nodeId).style.display = "block";
        // Place the div
        document.getElementById("node_info_" + nodeId).style.position = "absolute";
        document.getElementById("node_info_" + nodeId).style.top = nodeY + "px";
        document.getElementById("node_info_" + nodeId).style.left = nodeX + "px";
      }
};


function hideNodesInfo(params) {
var allNodes = nodes.get({returnType:"Object"});
var myParent = document.body;
//Create array of options to be added
var nodeId;

for (nodeId in allNodes){
  //Create and append select list
  document.getElementById("node_info_" + nodeId).style.display = "none";
}
};
network.on("hoverNode", showNodeInfo);
network.on("blurNode", hideNodesInfo);

var nodes2 = new vis.DataSet([
    {id: 1, label: 'Linguagem de\nProgramação', url: 'http://www.google.com', x:200, y:-100, group: 'programming'},
    {id: 2, label: 'Bash/Shell', url: 'http://www.google.com', font:{color: "white"}, shape:'image', image: "assets/img/Bash-logo.svg", x:200, y:40, group: 'bash'},
    {id: 3, label: 'Automatização', url: 'http://www.google.com', x:0, y:40, group: 'bash'},
    {id: 4, label: 'Rodar Programas', url: 'http://www.google.com', x:400, y:40, group: 'bash'},
    {id: 20, label: 'Python', url: 'http://www.google.com', shape:'image', image: "assets/img/Python-logo.svg", x:200, y:250, group: 'python_funs'},
    {id: 30, label: 'Gráficos', url: 'http://www.google.com', x:0, y:200, group: 'python_funs'},
    {id: 40, label: 'Processamento\nde Arquivos', url: 'http://www.google.com', x:0, y:250, group: 'python_funs'},
    {id: 50, label: 'Cálculos Avançados', url: 'http://www.google.com', x:0, y:300, group: 'python_funs'},
    {id: 60, label: 'Otimização', url: 'http://www.google.com', x:400, y:200, group: 'python_funs'},
    {id: 70, label: 'Ler/Escrever Dados', url: 'http://www.google.com', x:400, y:250, group: 'python_funs'},
    {id: 80, label: 'Aplicações Específicas', url: 'http://www.google.com', x:400, y:300, group: 'python_funs'},
    ]);

var edges2 = new vis.DataSet([
                            {from: 1, to: 2},
                            {from: 2, to: 3},
                            {from: 2, to: 4},
                            {from: 2, to: 20},
                            {from: 20, to: 30},        
                            {from: 20, to: 40},
                            {from: 20, to: 50},
                            {from: 20, to: 60},
                            {from: 20, to: 70},
                            {from: 20, to: 80},

                            ]);    

// create a network
var container2 = document.getElementById('mynetwork2');
// container.oncontextmenu = () => false;
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options2 = {
  layout: {improvedLayout: true},
  groups: {
    programming: {color:{background: 'grey', border:"black", 
                  hover: {background: "grey", border: "black"},
                  highlight: {background: "grey", border: "black"}},
           font:{color: "white", size:18, face: "monospace", align:"center"},
           borderWidth: 2,
           size: 50,
           shape: 'box'},
    python_funs: {color:{background: 'lightgrey', border:"black", 
                  hover: {background: "lightgrey", border: "black"},
                  highlight: {background: "lightgrey", border: "black"}},
           font:{color: "black", size:18, face: "monospace", align:"center"},
           borderWidth: 2,
           size: 50,
           shape: 'box'},
    bash: {color:{background: ' #F0F0F0', border:"black", 
                  hover: {background: " #F0F0F0", border: "black"},
                  highlight: {background: " #F0F0F0", border: "black"}},
           font:{color: "black", size:18, face: "monospace", align:"center"},
           borderWidth: 2,
           size: 50,
           shape: 'box'},
    },
  edges: {width: 3,
          arrows: {
            to: {
                 enabled: true,
                 scaleFactor: 1,
                 type: "arrow",

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
var network2 = new vis.Network(container2, data2, options2);