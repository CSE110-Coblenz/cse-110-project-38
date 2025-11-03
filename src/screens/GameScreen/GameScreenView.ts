import Konva from "konva"
import type { View } from "../../types.ts"
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts"
import { Layer } from "konva/lib/Layer"

/**
 * GameScreenView - Renders the game UI using Konva
 */
export class GameScreenView implements View {
	private castle: Konva.Group
	private character: Konva.Group
	private enemy1: Konva.Group
	private background: Konva.Group
	private game_ui: Konva.Group
	private game_screen: Konva.Group
	private lemonImage: Konva.Image | Konva.Circle | null = null

	constructor(onLemonClick: () => void) {
		// Initialize Groups
		this.background = new Konva.Group({ visible: true })
		this.character = new Konva.Group({visible: true })
		this.enemy1 = new Konva.Group({ visible: true })
		this.castle = new Konva.Group({ visible: true })
		this.game_ui = new Konva.Group({ visible: true })
		this.game_screen = new Konva.Group({ visible: false })

		// Background
		const bg = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			fill: "#87CEEB", // Sky blue
		})
		this.background.add(bg)

		// create pause button
		var pause_btn = new Konva.Rect({
			x: 725,
			y: 25,
			width: 50, 
			height: 50,
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10]
		})
		var pause_bar1 = new Konva.Rect({
			x: 735,
			y: 35,
			width: 10, 
			height: 30,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [2, 2, 2, 2],
		})
		var pause_bar2 = new Konva.Rect({
			x: 755,
			y: 35,
			width: 10, 
			height: 30,
			fill: 'black',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [2, 2, 2, 2],
		})
		//create question display
		var quest_box = new Konva.Rect({
			x: 200,
			y: 50,
			width: 400,
			height: 150,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		//create answer box
		var ans_box = new Konva.Rect({
			x: 300,
			y: 225,
			width: 200,
			height: 50,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 3,
			cornerRadius: [10, 10, 10, 10],
		})
		this.game_ui.add(pause_btn)
		this.game_ui.add(pause_bar1)
		this.game_ui.add(pause_bar2)
		this.game_ui.add(quest_box)
		this.game_ui.add(ans_box)

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

		//wizard
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
		
		// create towers
		var castle1 = new Konva.Rect({
			x: 0,
			y: 470,
			width: 230,
			height: 130,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3
		})
		var castle_cren = new Konva.Shape({
			x: 0,
			y: 430,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0) // Relative to the shape's x, y
				for(let i: number = -10; i < 230; i += 40) {
					context.lineTo(i + 20, 0)
					context.lineTo(i + 20, 20)
					context.lineTo(i + 40, 20)
					context.lineTo(i + 40, 0)
				}
				context.lineTo(250, 0)
				context.lineTo(250, 40)
				context.lineTo(0, 40)
				context.closePath()
				context.fillStrokeShape(shape)
  			},
		})
		var castle1_window1 = new Konva.Rect({
			x: 50,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})
		var castle1_window2 = new Konva.Rect({
			x: 155,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})
		
		var castle2 = new Konva.Rect({
			x: 570,
			y: 470,
			width: 230,
			height: 130,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3
		})
		var castle_cren2 = new Konva.Shape({
			x: 800,
			y: 430,
			fill: "#6e3f26",
			stroke: "black",
			strokeWidth: 3,
			sceneFunc: function (context, shape) {
				context.beginPath()
				context.moveTo(0, 0)
				for(let i: number = 10; i > -230; i -= 40) {
					context.lineTo(i - 20, 0)
					context.lineTo(i - 20, 20)
					context.lineTo(i - 40, 20)
					context.lineTo(i - 40, 0)
				}
				context.lineTo(-250, 0)
				context.lineTo(-250, 40)
				context.lineTo(0, 40)
				context.closePath()
				context.fillStrokeShape(shape)
  			},
		})
		var castle2_window1 = new Konva.Rect({
			x: 620,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})
		var castle2_window2 = new Konva.Rect({
			x: 725,
			y: 500,
			width: 25,
			height: 40,
			fill: "black",
			stroke: "black",
			cornerRadius: [15, 15, 0, 0],
			strokeWidth: 3

		})

		this.castle.add(castle1)
		this.castle.add(castle_cren)
		this.castle.add(castle1_window1)
		this.castle.add(castle1_window2)
		this.castle.add(castle2)
		this.castle.add(castle_cren2)
		this.castle.add(castle2_window1)
		this.castle.add(castle2_window2)

		// merge groups
		this.game_screen.add(this.background)
		this.game_screen.add(this.character)
		this.game_screen.add(this.enemy1)
		this.game_screen.add(this.castle)
		this.game_screen.add(this.game_ui)

		//scale to screen
		this.game_screen.scaleX(STAGE_WIDTH / 800)
		this.game_screen.scaleY(STAGE_HEIGHT / 600)
	}

	/**
	 * Update score display
	 */
	updateScore(score: number): void {
		this.castle.getLayer()?.draw()
	}

	/**
	 * Randomize lemon position
	 */
	randomizeLemonPosition(): void {
		if (!this.lemonImage) return

		// Define safe boundaries (avoid edges)
		const padding = 100
		const minX = padding
		const maxX = STAGE_WIDTH - padding
		const minY = padding
		const maxY = STAGE_HEIGHT - padding

		// Generate random position
		const randomX = Math.random() * (maxX - minX) + minX
		const randomY = Math.random() * (maxY - minY) + minY

		// Update lemon position
		this.lemonImage.x(randomX)
		this.lemonImage.y(randomY)
		this.castle.getLayer()?.draw()
	}

	/**
	 * Update timer display
	 */
	updateTimer(timeRemaining: number): void {
		this.castle.getLayer()?.draw()
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
