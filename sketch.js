let pursuer1, pursuer2;
let target;
let obstacles = [];
let vehicules = [];
let enemies = [];

let snakeMode = false;

function preload() {
  obstacleImage = loadImage('assets/obstacles2.png'); 
  leaderImage = loadImage('assets/t11.png');
  vehicleImage = loadImage('assets/t21.png');
  enemiesImage = loadImage('assets/ufo3.png');
  backgroundImage = loadImage('assets/b3.jpg');
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

  //Creating sliders.
  sliderSpeed = createSlider(1, 20, 10, 1); // Slider pour la vitesse
  sliderSpeed.position(200, 20); // Position alignée avec le libellé

  sliderForce = createSlider(0, 10, 2, 0.1); // Slider pour la force
  sliderForce.position(200, 60);
}

function draw() {
  // changer le dernier param (< 100) pour effets de trainée
  //background(0, 0, 0, 100);
  background(0); // Clear the canvas
  imageMode(CORNER);
  image(backgroundImage, 0, 0, width, height);

  fill(255); // Couleur blanche pour le texte
  textSize(14);

  // Libellés des sliders
  text("Vitesse maximale :", 10, 35); // Libellé pour le premier slider
  text("Force maximale :", 10, 75);   // Libellé pour le deuxième slider

  // Valeurs des sliders affichées à droite
  text(sliderSpeed.value(), 360, 35); // Valeur actuelle du slider de vitesse
  text(sliderForce.value(), 360, 75);
  drawMenu();

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
    v.maxSpeed = sliderSpeed.value();
    v.maxForce = sliderForce.value();
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
    v.projectilesImpact(enemies,obstacles);
    

  });
}

function drawMenu() {
  fill(50, 50, 50, 200);
  noStroke();
  rect(width - 220, 20, 200, 280, 10);

  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text("Contrôles :", width - 200, 40);

  drawKey("a", "Ajouter un véhicule", 60);
  drawKey("d", "Activer debug", 100);
  drawKey("f", "Ajouter 10 véhicules", 140);
  drawKey("s", "Mode serpent", 180);
  drawKey("e", "Ajouter des ennemis", 220);
  drawKey("Space", "Tirer", 260);
}

function drawKey(key, description, y) {
  fill(200);
  stroke(0);
  strokeWeight(2);
  rect(width - 200, y, 40, 30, 5);

  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(key, width - 180, y + 15);

  fill(255); 
  textAlign(LEFT, CENTER);
  text(description, width - 150, y + 15);
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
    for (let i = 0; i < 10; i++) {
      let x = random(50, width - 50); // Add padding to avoid edge overlap
      let y = random(50, height - 50);
      let enemy = new Enemy(x, y);
      enemies.push(enemy);
    }
  }
  else if (key === ' ') {
    vehicules.forEach(vehicle => {
      vehicle.shoot(createVector(mouseX, mouseY));
    });
  }

}