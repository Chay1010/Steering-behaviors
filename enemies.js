class Enemy extends Vehicle {
    constructor(x, y) {
      super(x, y);
      this.color = "red";
      this.wanderTheta = random(TWO_PI);
      this.r_pourDessin = 16;
      this.image = enemiesImage;
      this.maxSpeed = 3;

    }
  
    // Méthode de comportement spécifique : Wander
    wander() {
      let wanderDistance = 50; // Distance du point de référence devant l'ennemi
      let wanderRadius = 25; // Rayon du cercle d'errance
  
      this.wanderTheta += random(-PI / 8, PI / 8); // Variation aléatoire de l'angle
  
      // Point de référence devant l'ennemi
      let wanderPoint = this.vel.copy();
      wanderPoint.setMag(wanderDistance);
      wanderPoint.add(this.pos);
  
      let wanderOffset = p5.Vector.fromAngle(this.wanderTheta).mult(wanderRadius);
      let target = p5.Vector.add(wanderPoint, wanderOffset);
  
      // Force de steering vers la cible
      let steer = p5.Vector.sub(target, this.pos);
      steer.setMag(this.maxForce);
      return steer;
    }
    edges() {
        // Limites horizontales
        if (this.pos.x > width - this.r) {
          this.pos.x = width - this.r;
          this.vel.x *= -1;
        } else if (this.pos.x < this.r) {
          this.pos.x = this.r;
          this.vel.x *= -1;
        }
      
        // Limites verticales
        if (this.pos.y > height - this.r) {
          this.pos.y = height - this.r;
          this.vel.y *= -1;
        } else if (this.pos.y < this.r) {
          this.pos.y = this.r;
          this.vel.y *= -1;
        }
      }
  
    // Override de la méthode `applyBehaviors` pour inclure `wander`
    applyBehaviors(obstacles, enemies,target) {
      let wanderForce = this.wander(); // Force d'errance
      let avoidForce = this.avoid(obstacles); // Évitement d'obstacles
      let evadeForce = this.evade(target); // Évitement d'autres ennemis
  
      // Pondérer les forces
      wanderForce.mult(0.5);
      avoidForce.mult(0.5);
      evadeForce.mult(0.5);
  
      // Appliquer les forces
      this.applyForce(wanderForce);
      this.applyForce(avoidForce);
      this.applyForce(evadeForce);
    }
  
    // Override de la méthode `show` pour changer le visuel
    show() {
        imageMode(CENTER);
        image(this.image, this.pos.x, this.pos.y, this.r_pourDessin * 4, this.r_pourDessin * 4);
    }
  }
  