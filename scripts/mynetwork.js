var nodes = new vis.DataSet([
    {id: 1, label: 'Linguagem de\nProgramação', url: 'http://www.google.com', x:200, y:-70, group: 'programming'},
    {id: 2, label: 'Bash/Shell', url: 'http://www.google.com', font:{color: "white"}, shape:'image', image: "assets/img/Bash-logo.svg", x:200, y:60, group: 'bash'},
    {id: 3, label: 'Automatização', url: 'http://www.google.com', x:0, y:60, group: 'bash'},
    {id: 4, label: 'Rodar Programas', url: 'http://www.google.com', x:400, y:60, group: 'bash'},
    {id: 20, label: 'Python', url: 'http://www.google.com', shape:'image', image: "assets/img/Python-logo.svg", x:200, y:250, group: 'python_funs'},
    {id: 30, label: 'Gráficos', url: 'http://www.google.com', x:0, y:200, group: 'python_funs'},
    {id: 40, label: 'Processamento\nde Arquivos', url: 'http://www.google.com', x:0, y:250, group: 'python_funs'},
    {id: 50, label: 'Cálculos\nAvançados', url: 'http://www.google.com', x:0, y:300, group: 'python_funs'},
    {id: 60, label: 'Otimização', url: 'http://www.google.com', x:400, y:200, group: 'python_funs'},
    {id: 70, label: 'Ler/Escrever\nDados', url: 'http://www.google.com', x:400, y:250, group: 'python_funs'},
    {id: 80, label: 'Aplicações\nEspecíficas', url: 'http://www.google.com', x:400, y:300, group: 'python_funs'},
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
var groups = {
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
    }
var options = {
  layout: {improvedLayout: true},
  groups: groups,
  edges: {width: 2,
          arrowStrikethrough: false,
          arrows: {
            to: {
                 enabled: true,
                 scaleFactor: 0.5,
                 type: "arrow",

                 },
                },
smooth: false
},
physics: false,
interaction: {
    hover: true,
    dragNodes: false,// do not allow dragging nodes
    zoomView: false, // do not allow zooming
    dragView: false,  // do not allow dragging
    multiselect: false,
    navigationButtons: false,
    selectable: true,
    selectConnectedEdges: true,
},
width: "100%",   // This fills out the canvas size to the encompassing div
height: "100%"
};
var network = new vis.Network(container, data, options);

// Get range
function getRange(){
  for (nodeId in allNodes){

  }
}

// Create info windows
var allNodes = nodes.get({returnType:"Object"});
var myParent = document.body;
//Create array of options to be added
var nodeId;

for (nodeId in allNodes){
  //Create and append select list
  var divNode = document.createElement("div");
  divNode.id = "node_info_" + nodeId;
  if (allNodes[nodeId].group == 'python_funs'){
    divNode.classList.add("PythonFuns");
  }
  else{
    divNode.classList.add("divNode");

  }
  document.body.appendChild(divNode);
  divNode.style.display = "none";
  divNodeText = document.createElement("p")
  divNodeText.textContent = allNodes[nodeId].label
  divNodeText.classList.add("divNodeText");

  divNode.appendChild(divNodeText)
}
$("#mynetwork canvas").attr("id","canvas");
var firstHover = true;
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
        node_width = bb.right - bb.left
        node_heigth = bb.bottom - bb.top
        // console.log('Node Id: ', nodeId)
        // console.log('rect', rect)
        // console.log('bb', bb)
        // console.log('nodeX', nodeX)
        // console.log('nodeY', nodeY)
        nodeX += + rect.left - 150;
        nodeY += rect.top - 100 / 2;
        
        document.getElementById("node_info_" + nodeId).style.display = "block";
        // Place the div
        document.getElementById("node_info_" + nodeId).style.position = "absolute";
        document.getElementById("node_info_" + nodeId).style.top = nodeY + "px";
        document.getElementById("node_info_" + nodeId).style.left = nodeX + "px";
        
        document.getElementById("page-langs").style.background = groups[allNodes[nodeId].group]['color']['background'];

      }
      if (firstHover){
        document.getElementById("page-langs").style.transitionProperty += ', background'
      }
};

 // network.moveTo({'position': {'x': 200, 'y':200}, 'animation': true})
network.on("zoom", function(){
})


network.on("release", function(){
  // network.fit()
})



network.on("blurNode", function(){
  // network.fit()
})

function zoomin(zoomstep) {
    network.setScale(network.getScale() + zoomstep);
}

function zoomout(zoomstep) {
    network.setScale(network.getScale() - zoomstep);
}

vis.Network.prototype.setScale = function (scale) {
    var options = {
        nodes: []
    };
    // var range = this.view._getRange(options.nodes);
    // var center = this.view._findCenter(range);
    // var center = network.view.canvas.canvasViewCenter;
    var center = network.view.getViewPosition();
    var animationOptions = {
        position: center,
        scale: scale,
        animation: true
    };
    this.view.moveTo(animationOptions);
};

function hideNodesInfo(params) {
document.getElementById("page-langs").style.background = 'slateblue';
var allNodes = nodes.get({returnType:"Object"});
var myParent = document.body;
//Create array of options to be added
var nodeId;

for (nodeId in allNodes){
  //Create and append select list
  document.getElementById("node_info_" + nodeId).style.display = "none";
  document.getElementById("bubble-circle-div").style.zIndex = "1000000000";
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
  edges: {width: 1,
          arrows: {
            to: {
                 enabled: true,
                 scaleFactor: 0.2,
                 type: "arrow",

                 },
                },
smooth: false
},
physics: true,
interaction: {
    hover: true,
    dragNodes: false,// do not allow dragging nodes
    zoomView: false, // do not allow zooming
    dragView: true,  // do not allow dragging
    multiselect: true,
    navigationButtons: true,
    selectable: true,
    selectConnectedEdges: true,

},
width: "100%",   // This fills out the canvas size to the encompassing div
height: "100%"
};

var network2 = new vis.Network(container2, data2, options2);


network.fit()

