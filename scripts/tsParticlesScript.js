  particlesDensity = 300 / (1710 * 1017);
  var w = window.innerWidth;
  var h = window.innerHeight;
  var A = w * h

  tsParticles.load({
  id: "tsparticles",
  options: {
    fullScreen: { enable: false },
    fpsLimit: 90,
    particles: {
      number: {
        value: particlesDensity * A,
      },
      color: {
        value: "#1e90ff",
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5
      },
      size: {
        value: { min: 1, max: 3 }
      },
      links: {
        enable: true,
        distance: 80,
        color: "grey",
        opacity: 1,
        width: 1,
        triangles: {
          enable: true,
          color: "#ffffff",
          opacity: 0.1
        }
      },
      move: {
        enable: true,
        speed: 0.75,
        direction: "none",
        outModes: "bounce"
      }
    },
    interactivity: {
        detectsOn: "page",
      events: {
        onHover: {
          enable: true,
          mode: "connect"
        },
        onClick: {
            enable: true,
            mode: "push"
        },
        onDiv: [
        {
          enable: true,
          selectors: "#bubble-circle-div",
          mode: "bounce",
          type: "rectangle"
        },
        ]
      },
      modes: {
        connect: {
          distance: 200,
          radius: 80,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        attract:{
            distance: 200, 
            duration: 0.4,
            factor: 3,
        },
      }
    },
    background: {
      color: "#000035"
    },


  }
});

network.fit()



