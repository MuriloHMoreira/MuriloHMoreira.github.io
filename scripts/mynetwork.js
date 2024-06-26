function objectMap(obj, fn) {
  var arrayData = [];
  Object.keys(obj).forEach((key) => {
    arrayData.push(fn(obj[key]));
  });
  return arrayData;
}


var nodes = new vis.DataSet([
    {id: 1, label: 'Linguagem de\nProgramação', url: 'http://www.google.com',
     x:200, y:0, group: 'programming'},
    {id: 2, label: 'Bash/Shell', url: 'http://www.google.com', font:{color: "white"}, shape:'image', image: "assets/img/Bash-logo.svg",
     x:200, y:130, group: 'bash'},
    {id: 3, label: 'Rodar Programas', url: 'http://www.google.com',
     x:0, y:130, group: 'application'},
    {id: 4, label: 'Automatização', url: 'http://www.google.com',
     x:400, y:130, group: 'application'},
    {id: 20, label: 'Python', url: 'http://www.google.com', shape:'image', image: "assets/img/Python-logo.svg",
     x:200, y:320, group: 'python_funs'},
    {id: 30, label: 'Gráficos', url: 'http://www.google.com',
     x:0, y:270, group: 'python_funs'},
    {id: 40, label: 'Aplicações\nEspecíficas', url: 'http://www.google.com',
     x:0, y:320, group: 'python_funs'},
    {id: 50, label: 'Otimização', url: 'http://www.google.com',
     x:0, y:370, group: 'python_funs'},
    {id: 60, label: 'Cálculos\nAvançados', url: 'http://www.google.com',
     x:400, y:270, group: 'python_funs'},
    {id: 70, label: 'Ler/Escrever\nDados', url: 'http://www.google.com',
     x:400, y:320, group: 'python_funs'},
    {id: 80, label: 'Processamento\nde Arquivos', url: 'http://www.google.com',
     x:400, y:370, group: 'python_funs'},
    {id: 90, label: 'Script', url: 'http://www.google.com', shape:'image', size: 30, image: "assets/img/scroll-text.svg",
     x:400, y:30, group: 'python_funs'},
    {id: 100, label: 'Jupyter\nNotebook', url: 'http://www.google.com', shape:'image', size: 30, image: "assets/img/Jupyter_logo.svg.png",
     x:0, y:200, group: 'python_funs'},
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
           font:{color: "white", size:18, face: "monospace", align:"center"},
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
    application: {color:{background: ' #F0F0F0', border:"black", 
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
          color: 'deepskyblue',
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
function showNodeInfo(params) {
  // Get the node ID
  var nodeId = params.node;
  if (nodeId) {
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
    
  }
  
};
var nodes_xmin;
var nodes_xmax;
var nodes_ymin;
var nodes_ymax;

var firstResize = true;
// To make it work when scaled, we need to scale the canvas size properly
function resizeFunction(){
  canvasElementWidth = network.canvas.frame.canvas.clientWidth
  canvasElementHeight = network.canvas.frame.canvas.clientHeight
  nodesXMins = []
  nodesXMaxs = []
  nodesYMins = []
  nodesYMaxs = []
  var allNodes = nodes.get({returnType:"Object"});
  var nodeId;
  for (nodeId in allNodes){
    var bb = network.getBoundingBox(nodeId)
    var nodesYMaxi = bb['top']
    var nodesXMini = bb['left']
    var nodesXMaxi = bb['right']
    var nodesYMini = bb['bottom']
    nodesXMins.push(nodesXMini)
    nodesXMaxs.push(nodesXMaxi)
    nodesYMins.push(nodesYMini)
    nodesYMaxs.push(nodesYMaxi)
  }
  nodesXMin = Math.min(...nodesXMins)
  nodesXMax = Math.max(...nodesXMaxs)
  nodesYMin = Math.max(...nodesYMins)
  nodesYMax = Math.min(...nodesYMaxs)
  nodesWidth = (nodesXMax-nodesXMin)
  nodesHeight = -(nodesYMax-nodesYMin)
  zoomFactorX = canvasElementWidth/nodesWidth
  zoomFactorY = canvasElementHeight/nodesHeight
  adjustedScale = Math.min(zoomFactorX, zoomFactorY) * 0.95
  if (firstResize){
    network.fit()
    canvasOriginOrig = network.getViewPosition()
    // network.setScale(adjustedScale)
    firstResize = false;
  }
  network.setScale(adjustedScale)
  canvasOrigin = network.getViewPosition()
  canvasMargin = 10
  canvasWidth = network.canvas.frame.canvas.clientWidth * 1 / network.getScale()
  canvasHeight = network.canvas.frame.canvas.clientHeight * 1 / network.getScale()
  canvasXMin = - canvasWidth / 2 + canvasOriginOrig['x'] + 15
  canvasXMax = canvasWidth / 2 + canvasOriginOrig['x'] + 15
  canvasYMax = - canvasHeight / 2 + canvasOriginOrig['y']
  canvasYMin = canvasHeight / 2 + canvasOriginOrig['y']
  // console.log(network.getViewPosition())
  // network.moveTo({'position': canvasOriginOrig})
  // network.moveTo({'position': canvasOriginOrig})
  // console.log(network.getViewPosition())

}

network.on("resize", resizeFunction)




var dragStartPosition;
network.on("dragStart", function(params){
  dragStartPosition = network.getViewPosition()
  // console.log('dragStartPosition', dragStartPosition)

})



network.on("click", function(params){
   console.log('Click', params["pointer"]["canvas"])

})

network.on("dragEnd", function(params){
  var dragEndPosition = network.getViewPosition()


  var xMaxCenter = (canvasOrigin['x'] - (canvasXMax - nodesXMax))
  var xMinCenter = (canvasOrigin['x'] - (canvasXMin - nodesXMin))
  var yMaxCenter = (canvasOrigin['y'] - (canvasYMax - nodesYMax))
  var yMinCenter = (canvasOrigin['y'] - (canvasYMin - nodesYMin))


  var correctDragX = dragEndPosition['x']
  var correctDragY = dragEndPosition['y']
  if (dragEndPosition['x'] < xMaxCenter){
    // console.log('dragEndPositionX too small')
    correctDragX = xMaxCenter
  }
  if (dragEndPosition['x'] > xMinCenter){
    // console.log('dragEndPositionX too big')
    correctDragX = xMinCenter
  }
  if (dragEndPosition['y'] <  yMinCenter){
    // console.log('dragEndPositionY too small')
    correctDragY = yMinCenter
  }
  if (dragEndPosition['y'] >  yMaxCenter){
    // console.log('dragEndPositionY too big')
    correctDragY = yMaxCenter

  }
  network.moveTo({'position': {'x': correctDragX, 'y': correctDragY}, 'animation': true})

  // console.log('correctDrag', [correctDragX, correctDragY])
  // console.log("Drag has Ended!")
})



 // network.moveTo({'position': {'x': 200, 'y':200}, 'animation': true})
// network.on("zoom", resizeFunction)


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
    // var center = network.view.getViewPosition();
    var center = {'x': (nodesXMax + nodesXMin)/2, 'y':(nodesYMax + nodesYMin)/2}
    var animationOptions = {
        position: center,
        scale: scale,
        animation: true
    };
    this.view.moveTo(animationOptions);
};

function hideNodesInfo(params) {
  document.getElementById("page-langs").style.backgroundImage = "linear-gradient(to left top, #000051, #00014c, #000247, #000241, #00013c, #00013c, #00013c, #00013c, #000241, #000247, #00014c, #000051)"


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



function drawDivisions(ctx) {
            ctx.lineWidth = 3;
            ctx.setLineDash([15, 10]);
            ctx.strokeStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(305, -10, 190, 425, [10]);
            ctx.stroke();
            ctx.strokeStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(-80, 160, 160, 240, [10]);
            ctx.stroke();
            }

network.on("afterDrawing", drawDivisions);


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
    zoomView: true, // do not allow zooming
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


// network.fit()

