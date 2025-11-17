import { BaseCharacter } from "./BaseCharacter";

export class Enemy extends BaseCharacter {
    constructor(health: number, damage: number) {
        super(health, damage);
    }
}