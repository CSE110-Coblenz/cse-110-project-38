import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { GameScreenModel } from "./GameScreenModel.ts";
import { GameScreenView } from "./GameScreenView.ts";

/**
 * GameScreenController - Coordinates game logic between Model and View
 */
export class GameScreenController extends ScreenController {
    private model: GameScreenModel;
    private view: GameScreenView;
    private screenSwitcher: ScreenSwitcher;

    /**
     * Constructor
     * @param screenSwitcher - Reference to the screen switcher for navigation
     */
    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;

        // Initialize the game model
        this.model = new GameScreenModel();

        // Initialize the game view with cubes
        // 3 cubes by default, each with its own click handler
        this.view = new GameScreenView(11, [
            (index) => this.navigateResultScreen(),  // First cube navigates to results
            (index) => this.startLevel(index),       // Other cubes start levels
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
            (index) => this.startLevel(index),
        ]);
    }

    /**
     * Start the game
     */
    startGame(): void {
        // Reset the model state for a new game
        this.model.reset();

        // Show the view with the cubes
        this.view.show();
    }

    /**
     * Start a specific level
     * @param levelNumber - Index of the level to start
     */
    private startLevel(levelNumber: number): void {
        console.log(`Starting level ${levelNumber + 1}`);
        this.model.setSelectedLevel(levelNumber);
        // Add additional logic here to start the level
    }

    /**
     * Handle cube click event to navigate to results screen
     */
    private navigateResultScreen(): void {
        this.screenSwitcher.switchToScreen({
            type: "result",
            score: this.model.getScore(),
        });
    }

    /**
     * Get the final score
     * @returns number
     */
    getFinalScore(): number {
        return this.model.getScore();
    }

    /**
     * Get the view instance
     * @returns GameScreenView
     */
    getView(): GameScreenView {
        return this.view;
    }
}
