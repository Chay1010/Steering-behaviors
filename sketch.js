let pursuer1, pursuer2;
let target;
let obstacles = [];
let vehicules = [];
let enemies = [];

let snakeMode = false;

function preload() {
  obstacleImage = loadImage('assets/obstacles2.png'); 
  leaderImage = loadImage('assets/leader1.png');
  vehicleImage = loadImage('assets/v3.png');
  enemiesImage = loadImage('assets/enemies.png');
  console.log('Enemy image loaded:', enemiesImage);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pursuer1 = new Vehicle(100, 100);
  pursuer2 = new Vehicle(random(width), random(height));

  vehicules.push(pursuer1);
  //vehicules.push(pursuer2);

  // On cree un obstace au milieu de l'écran
  // un cercle de rayon 100px
  // TODO
  obstacles.push(new Obstacle(width / 2, height / 2, 100, "green"));
  
}

function draw() {
  // changer le dernier param (< 100) pour effets de trainée
  background(0, 0, 0, 100);

  target = createVector(mouseX, mouseY);

  // Dessin de la cible qui suit la souris
  // Dessine un cercle de rayon 32px à la position de la souris
  imageMode(CENTER);
  image(leaderImage, target.x, target.y, 64, 64);

  // dessin des obstacles
  // TODO
  obstacles.forEach(o => {
    o.show();
  })

  enemies.forEach(enemy => {
    enemy.applyBehaviors(obstacles, enemies, { pos: target, vel: createVector(0, 0) });
    enemy.update();
    enemy.show();
  });

  //snake behavior
  vehicules.forEach((v, index) => {
    if(snakeMode)
    {
      if(index === 0){
        v.applyBehaviors(target, obstacles, vehicules);
        let vPos = v.arrive(target, 70);
        v.applyForce(vPos);
      }
      else{
        let leader = vehicules[index-1].pos.copy();
        v.applyBehaviors(leader, obstacles, vehicules, 70);
        let vPos = v.arrive(leader, 70)
        v.applyForce(vPos);
      }
      
    }
    else{
      v.applyBehaviors(target, obstacles, vehicules);
      let vPos = v.arrive(target, 70);
      v.applyForce(vPos);
    }
    // déplacement et dessin du véhicule et de la target
    v.update();
    v.show();
    v.projectilesImpact(enemies);
    

  });
}

function mousePressed() {
  // TODO : ajouter un obstacle de taille aléatoire à la position de la souris
  obstacles.push(new Obstacle(mouseX, mouseY, random(20, 100), "green"));
}

function keyPressed() {
  if (key == "v") {
    vehicules.push(new Vehicle(random(width), random(height)));
  }
  if (key == "d") {
    Vehicle.debug = !Vehicle.debug;
  } else if (key == "f") {
    // on crée 10 véhicules à des position random espacées de 50px
    // en x = 20, y = hauteur du  canvas sur deux
    for (let i = 0; i < 10; i++) {
      let v = new Vehicle(20, 300 )
      // vitesse aléatoire
      v.vel = new p5.Vector(random(1, 5), random(1, 5));
      vehicules.push(v);
    }
  }
  //a for associe, 
  else if (key === "a") {
    let v = new Vehicle(random(width), random(height));
    vehicules.push(v);
  }
  else if (key === "s") {
    snakeMode = !snakeMode;
    console.log("Snake Mode:", snakeMode);
  }
  else if (key === "e") {
    for (let i = 0; i < 5; i++) {
      let enemy = new Enemy(random(width), random(height));
      enemies.push(enemy);
    }
  }
  else if (key === ' ') {
    vehicules.forEach(vehicle => {
      vehicle.shoot(createVector(mouseX, mouseY));
    });
  }

}