Project Overview

This project is an interactive simulation featuring vehicles (agents) and enemies with various behaviors. The user can manipulate the simulation via keyboard inputs and sliders, creating dynamic and reactive interactions. The core functionality includes agent behaviors like snake movement, evasion, wandering, shooting, and interaction with obstacles and enemies.

PLAY HERE : https://chay1010.github.io/Steering-behaviors/

Vehicle Behaviors

    Snake Mode:
        Vehicles follow each other in a snake-like formation. The first vehicle pursues the target, while subsequent vehicles follow the preceding one with a slight delay.
        Key: Press s to toggle snake mode.

    Evade:
        Vehicles avoid enemies by predicting their future positions based on velocity and dynamically steering away from them.
        Implementation: Uses a pursuit-prediction mechanism to compute future positions and apply steering forces in the opposite direction.

    Wander:
        Vehicles move randomly in a natural and smooth way.

    Seek and Arrival:
        Vehicles pursue a target (mouse position), slowing down as they approach the target to simulate smooth arrival.
        Implementation: Adjusts velocity magnitude based on the distance from the target.

    Obstacle Avoidance:
        Vehicles dynamically detect nearby obstacles and steer around them while maintaining their primary objective, such as seeking a target or following a path.

Enemy Behaviors

    Movement and Pursuit:
        Enemies avoid vehicles dynamically by steering away when they come within a certain distance.
        Controlled using predefined rules or direct mouse interaction.

    Obstacle Interaction:
        Enemies detect and steer around obstacles, maintaining their course toward their undefined goals.

Shooting Behaviors

    Projectile Launch:
        Vehicles can shoot projectiles toward the mouse position or a target.
        Key: Press SpaceBar to fire projectiles.

    Projectile-Enemy Interaction:
        Projectiles detect and "hit" enemies when within a collision radius, removing the enemy and the projectile from the simulation.

    Projectile-Obstacle Interaction:
        Projectiles rebound off obstacles when they collide, simulating ricochets.

Slider Functionality

    Speed Slider:
        Description: Adjusts the maximum speed of vehicles.
        Range: 1 (slow) to 20 (fast).
        UI: A slider located at the top left of the canvas, labeled "Vitesse maximale."

    Force Slider:
        Description: Controls the maximum steering force applied to vehicles.
        Range: 0 (no steering) to 10 (highly reactive).
        UI: A slider located below the speed slider, labeled "Force maximale."

Keyboard Controls

    a: Adds a single new vehicle at a random position.
    f: Adds 10 vehicles at a fixed position with randomized velocities.
    e: Adds 10 enemies at random positions.
    d: Toggles debug mode, displaying additional visual elements like vector arrows.
    s: Toggles snake mode, enabling or disabling the snake-like following behavior.
    SpaceBar: Fires projectiles from each vehicle toward the current mouse position.
