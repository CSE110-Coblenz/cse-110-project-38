import Konva from 'konva';

export class BaseCharacter {
    /* ========================================================= 
        Properties 
    ============================================================ */
    health: number;
    damage: number;
    isAlive: boolean;

    /* ========================================================= 
        Constructor 
    ============================================================ */
    constructor(health: number, damage: number) {
        this.health = health || 100;
        this.damage = damage || 100 / 3;
        this.isAlive = true;
    }

    /* ========================================================= 
        Methods 
    ============================================================ */
    attack(target: BaseCharacter): void {
        target.takeDamage(this.damage);
    }

    takeDamage(amount: number): void {
        this.health -= amount;

        if (this.health <= 0) {
            this.health = 0;
            this.defeat();
        }
    }

    getHealth(): number {
        return this.health;
    }

    protected defeat(): void {
        this.isAlive = false;
    }

}