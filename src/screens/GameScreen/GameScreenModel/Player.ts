

export class Player {
    private name: string;
    private maxHp: number;
    private hp: number;
    private atk: number;
    private alive: boolean;

    // Game movement/state (data only — not rendering)
    private x: number;
    private y: number;
    private speed: number;
    private facing: "left" | "right";

    constructor(
        name: string = "Player",
        maxHp: number = 100,
        atk: number = 10,
        startX: number = 0,
        startY: number = 0
    ) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.atk = atk;
        this.alive = true;

        this.x = startX;
        this.y = startY;
        this.speed = 5;
        this.facing = "right";
    }

    // --- Gameplay Logic ---
    public move(dx: number, dy: number): void {
        if (!this.alive) return;
        this.x += dx * this.speed;
        this.y += dy * this.speed;
        if (dx < 0) this.facing = "left";
        if (dx > 0) this.facing = "right";
    }

    public attack(): number {
        return this.atk;
    }

    public takeDamage(amount: number): void {
        this.hp = Math.max(0, this.hp - amount);
        if (this.hp === 0) this.alive = false;
    }

    public heal(amount: number): void {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    // --- Utility & Getters ---
    public getStats() {
        return {
            name: this.name,
            hp: this.hp,
            maxHp: this.maxHp,
            atk: this.atk,
            alive: this.alive,
        };
    }

    public getPosition() {
        return { x: this.x, y: this.y, facing: this.facing };
    }
}