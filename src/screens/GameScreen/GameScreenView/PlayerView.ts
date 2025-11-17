import Konva from "konva";
import {Player} from "../GameScreenModel/Player"
export class PlayerView {
  private playerGroup: Konva.Group;

  constructor(x: number, y: number) {
    this.playerGroup = new Konva.Group({
      x,
      y,
      visible: true
    });

    // --- Draw player parts ---
    const head = new Konva.Circle({
      x: 0,
      y: 0,
      radius: 18,
      fill: "white",
      stroke: "black",
      strokeWidth: 3
    });

    const body = new Konva.Line({
      points: [0, 20, 0, 45],
      stroke: "black",
      strokeWidth: 3
    });

    const leg1 = new Konva.Line({
      points: [0, 45, -20, 80],
      stroke: "black",
      strokeWidth: 3
    });

    const leg2 = new Konva.Line({
      points: [0, 45, 20, 80],
      stroke: "black",
      strokeWidth: 3
    });

    const arm1 = new Konva.Line({
      points: [0, 30, -20, 25],
      stroke: "black",
      strokeWidth: 3
    });

    const arm2 = new Konva.Line({
      points: [0, 30, 25, 20],
      stroke: "black",
      strokeWidth: 3
    });

    // Bow + Arrow
    const bowString = new Konva.Line({
      points: [10, 0, -5, 20, 10, 40],
      stroke: "black",
      strokeWidth: 2
    });

    const bow = new Konva.Line({
      points: [10, 0, 25, 20, 10, 40],
      stroke: "black",
      strokeWidth: 3,
      tension: 0.5
    });

    const arrow = new Konva.Line({
      points: [-5, 20, 35, 20],
      stroke: "black",
      strokeWidth: 3
    });

    const arrowHead = new Konva.Line({
      points: [30, 15, 35, 20, 30, 25],
      stroke: "black",
      strokeWidth: 3
    });

    // Add ordered parts
    this.playerGroup.add(head, body, leg1, leg2, arm1, arm2, bowString, bow, arrow, arrowHead);
  }

  /** Return player Konva group */
  getNode(): Konva.Group {
    return this.playerGroup;
  }

  /** Optional movement helpers */
  setPosition(x: number, y: number) {
    this.playerGroup.position({ x, y });
  }

  move(dx: number, dy: number) {
    this.playerGroup.x(this.playerGroup.x() + dx);
    this.playerGroup.y(this.playerGroup.y() + dy);
  }
}
