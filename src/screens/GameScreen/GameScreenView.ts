import Konva from "konva"
import type { View } from "../../types.ts"
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts"
import { Layer } from "konva/lib/Layer"

/**
 * GameScreenView - Renders the game UI using Konva
 */
export class GameScreenView implements View {
	private character: Konva.Group
	private enemy1: Konva.Group
	private background_dawn: Konva.Group
	private game_ui: Konva.Group
	private game_screen: Konva.Group
	private playerHealthBar: Konva.Group
	private enemyHealthBar: Konva.Group
	private htmlInput: HTMLInputElement

	// ------------------- TEMP LEVEL -------------------
	private tempLevelGroup: Konva.Group | null = null; // temp level placeholder
	// -------------------------------------------------

	constructor(onUserInput: (answer: string) => void) {
		// initialize Groups
		this.background_dawn = new Konva.Group({ visible: true })
		this.character = new Konva.Group({ visible: true })
		this.enemy1 = new Konva.Group({ visible: true })
		this.game_ui = new Konva.Group({ visible: true })
		this.game_screen = new Konva.Group({ visible: false })

		// dawn background
		const bg_dawn = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			// fill: 'blue'
			fillPriority: 'radial-gradient',
			fillRadialGradientStartPoint: { x: 400, y: 500 },
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: { x: 400, y: 500 },
			fillRadialGradientEndRadius: 500,
			fillRadialGradientColorStops: [0, '#FFF2BD', 0.2, '#F4D797', 0.4, '#EBB58A', 0.6, '#DA7F7D', 0.8, '#B5728E', 1, '#776E99'],

		})
		const bg_dawn_field = new Konva.Rect({
			x: 0,
			y: 500,
			width: 800,
			height: 100,
			fill: '#005200',
			stroke: 'black',
			strokeWidth: 3,
		})
		var bg_dawn_sun = new Konva.Circle({
			x: 400,
			y: 500,
			width: 125,
			height: 125,
			fill: 'yellow',
			stroke: 'black',
			strokeWidth: 3,
		})
		this.background_dawn.add(bg_dawn)
		this.background_dawn.add(bg_dawn_sun)
		this.background_dawn.add(bg_dawn_field)

		// create character
		var char_head = new Konva.Circle({
			x: 175,
			y: 380,
			width: 35,
			height: 35,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_body = new Konva.Line({
			points: [175, 398, 175, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_leg1 = new Konva.Line({
			points: [175, 425, 155, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_leg2 = new Konva.Line({
			points: [175, 425, 195, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_arm1 = new Konva.Line({
			points: [175, 410, 160, 405, 170, 403],
			stroke: 'black',
			strokeWidth: 3,
		})
		var char_arm2 = new Konva.Line({
			points: [175, 410, 195, 403],
			stroke: 'black',
			strokeWidth: 3,
		})
		var bow_string = new Konva.Line({
			points: [185, 385, 170, 403, 185, 421],
			stroke: 'black',
			strokeWidth: 3,
		})
		var bow_arc = new Konva.Line({
			points: [185, 385, 195, 403, 185, 421],
			stroke: 'black',
			strokeWidth: 3,
			tension: 0.5
		})
		var arrow = new Konva.Line({
			points: [170, 403, 205, 403],
			stroke: 'black',
			strokeWidth: 3,
		})
		var arrow_head = new Konva.Line({
			points: [200, 398, 205, 403, 200, 408],
			stroke: 'black',
			strokeWidth: 3,
		})

		this.character.add(char_head)
		this.character.add(char_body)
		this.character.add(char_leg1)
		this.character.add(char_leg2)
		this.character.add(char_arm1)
		this.character.add(char_arm2)
		this.character.add(bow_string)
		this.character.add(bow_arc)
		this.character.add(arrow)
		this.character.add(arrow_head)

		// create enemy variants

		// wizard
		var wiz_head = new Konva.Circle({
			x: 625,
			y: 380,
			width: 35,
			height: 35,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_body = new Konva.Line({
			points: [625, 398, 625, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_leg1 = new Konva.Line({
			points: [625, 425, 645, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_leg2 = new Konva.Line({
			points: [625, 425, 605, 470],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_brim = new Konva.Line({
			points: [600, 370, 650, 370],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_hat = new Konva.Shape({
			x: 608,
			y: 370,
			fill: 'blue',
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				context.lineTo(17, -40)
				context.lineTo(34, 0)
				context.closePath()
				context.fillStrokeShape(shape)
			},
		})
		var wiz_arms = new Konva.Line({
			points: [605, 405, 625, 410, 645, 400],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_staff = new Konva.Line({
			points: [595, 385, 615, 425],
			stroke: 'black',
			strokeWidth: 3,
		})
		var wiz_orb = new Konva.Circle({
			x: 590,
			y: 375,
			width: 20,
			height: 20,
			fill: 'orange',
			stroke: 'black',
			strokeWidth: 3,
		})

		this.enemy1.add(wiz_head)
		this.enemy1.add(wiz_body)
		this.enemy1.add(wiz_leg1)
		this.enemy1.add(wiz_leg2)
		this.enemy1.add(wiz_brim)
		this.enemy1.add(wiz_hat)
		this.enemy1.add(wiz_arms)
		this.enemy1.add(wiz_staff)
		this.enemy1.add(wiz_orb)

		let quest_box = new Konva.Rect({
			x: 200,
			y: 50,
			width: 400,
			height: 150,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		let ans_box = new Konva.Rect({
			x: 300,
			y: 225,
			width: 200,
			height: 50,
			fill: 'white',
			stroke: 'purple',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		let ans_input = new Konva.Text({
			x: 300,
			y: 225,
			width: 200,
			height: 50,
			fontSize: 48,
			align: "center",
		})
		this.game_ui.add(quest_box);
		this.game_ui.add(ans_box);
		this.game_ui.add(ans_input);

		this.htmlInput = document.createElement("input");
		this.htmlInput.type = "number";
		this.htmlInput.style.position = "absolute";
		this.htmlInput.style.display = "none";
		this.htmlInput.style.fontSize = "20px";
		document.body.appendChild(this.htmlInput);
		ans_input.on("click", () => this.showInput());

		this.htmlInput.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				onUserInput(this.htmlInput.value);
			}
		});

		this.playerHealthBar = new Konva.Group();
		let p_fullHealthbar = new Konva.Rect({
			x: STAGE_WIDTH / 2 - 100,
			y: STAGE_HEIGHT / 2 - 150,
			width: 300,
			height: 20,
			fill: "gray",
		})
		let p_remainingHealthBar = new Konva.Rect({
			x: STAGE_WIDTH / 2 - 100,
			y: STAGE_HEIGHT / 2 - 150,
			width: 300,
			height: 20,
			fill: "green",
		})
		this.playerHealthBar.offsetX(300)
		this.playerHealthBar.add(p_fullHealthbar)
		this.playerHealthBar.add(p_remainingHealthBar)

		this.enemyHealthBar = new Konva.Group();
		let e_fullHealthbar = new Konva.Rect({
			x: STAGE_WIDTH / 2 - 100,
			y: STAGE_HEIGHT / 2 - 150,
			width: 300,
			height: 20,
			fill: "gray",
		})
		let e_remainingHealthBar = new Konva.Rect({
			x: STAGE_WIDTH / 2 - 100,
			y: STAGE_HEIGHT / 2 - 150,
			width: 300,
			height: 20,
			fill: "green",
		})
		this.enemyHealthBar.offsetX(-100)
		this.enemyHealthBar.add(e_fullHealthbar)
		this.enemyHealthBar.add(e_remainingHealthBar)

		// merge groups
		this.game_screen.add(this.character)
		this.game_screen.add(this.enemy1)
		this.game_screen.add(this.game_ui)
		this.game_screen.add(this.playerHealthBar)
		this.game_screen.add(this.enemyHealthBar)
		// scale to screen
		this.game_screen.scaleX(STAGE_WIDTH / 800)
		this.game_screen.scaleY(STAGE_HEIGHT / 600)

	}

	showInput() {
		const user_input = this.game_ui.getChildren()[2] as Konva.Text;
		const position = user_input.getAbsolutePosition();

		this.htmlInput.style.left = position.x + "px";
		this.htmlInput.style.top = position.y + "px";
		this.htmlInput.style.width = user_input.width() + "px";
		this.htmlInput.style.height = user_input.height() + "px";

		this.htmlInput.value = user_input.text();
		this.htmlInput.style.display = "block";
		this.htmlInput.focus();
	}

	setInputText(value: string) {
		const user_input = this.game_ui.getChildren()[2] as Konva.Text;
		user_input.text(value);
		this.htmlInput.style.display = "none";
		this.game_screen.getLayer()?.draw();
	}

	updatePlayerHealth(healthRemaining: number): void {
		const remaining = this.playerHealthBar.getChildren()[1] as Konva.Rect;
		const full = this.playerHealthBar.getChildren()[0] as Konva.Rect;
		remaining.width(healthRemaining * full.width());
		this.game_screen.getLayer()?.draw();
	}

	updateEnemyHealth(healthRemaining: number): void {
		const remaining = this.enemyHealthBar.getChildren()[1] as Konva.Rect;
		const full = this.enemyHealthBar.getChildren()[0] as Konva.Rect;
		remaining.width(healthRemaining * full.width());
		this.game_screen.getLayer()?.draw();
	}

	/**
 * Show a temporary level screen dynamically
 */
	showTempLevel(levelNumber: number): void {
		// Remove old temp level if exists
		if (this.tempLevelGroup) {
			this.tempLevelGroup.destroy();
			this.tempLevelGroup = null;
		}

		// Create new temp level group
		this.tempLevelGroup = new Konva.Group({ visible: true });

		// Use base dimensions (800x600) - scaling is handled by game_screen parent
		const bg = new Konva.Rect({
			x: 0,
			y: 0,
			width: 800,  // Base width
			height: 600, // Base height
			fill: "rgba(0,0,0,0.8)",
		});
		this.tempLevelGroup.add(bg);

		// Big text showing level
		const text = new Konva.Text({
			text: `Level ${levelNumber}`,
			fontSize: 72,  // Fixed size for base dimensions
			fontFamily: "Arial",
			fill: "white",
		});
		text.x((800 - text.width()) / 2);
		text.y((600 - text.height()) / 2);
		this.tempLevelGroup.add(text);

		// Hide all other main groups
		this.background_dawn.visible(false);
		this.character.visible(false);
		this.enemy1.visible(false);
		this.game_ui.visible(false);

		// Add to main game_screen BEFORE setting visibility
		this.game_screen.add(this.tempLevelGroup);

		// Make game_screen visible if it isn't already
		this.game_screen.visible(true);

		// Draw the layer
		const layer = this.game_screen.getLayer();
		if (layer) {
			layer.batchDraw();
		}
	}

	/**
	 * Show the screen
	 */
	show(): void {
		this.game_screen.visible(true)
		this.game_screen.getLayer()?.draw()
	}

	/**
	 * Hide the screen
	 */
	hide(): void {
		this.game_screen.visible(false)
		this.game_screen.getLayer()?.draw()
	}

	getGroup(): Konva.Group {
		return this.game_screen
	}
}
