import Gun from "./gun.js";

export default [
    new Gun("Shotgun", 100, 10, true, 5, 10, 200, false, 10, './assets/bullet.png'),
    new Gun("Assault", 120, 30, true, 20, 1, 30, false, 10, './assets/bullet.png'),
    new Gun("Sniper", 1000, 10, false, 100, 1, 1, true, 5, './assets/bullet.png')
]