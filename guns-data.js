import Gun from "./gun.js";

export default [
    new Gun("Shotgun", 50, 10, true, 20, 10, 100, false, './assets/bullet.png'),
    new Gun("Assault", 90, 30, true, 20, 1, 10, false, './assets/bullet.png'),
    new Gun("Sniper", 1000, 10, false, 100, 1, 1, true, './assets/bullet.png')
]