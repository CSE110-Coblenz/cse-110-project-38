/**
 * Represents a single leaderboard entry
 */
export type LeaderboardEntry = {
	score: number;
	timestamp: string; // formatted timestamp
};

/**
 * ResultsScreenModel - Stores final score and leaderboard
 */
export class ResultsScreenModel {
	private finalScore = 0;
	private leaderboard: LeaderboardEntry[] = [];

	/**
	 * Get stars
	 */
	getStars(): number {
		// Get Stars
		let stored = localStorage.getItem("numStars");
		let num_stars = stored ? JSON.parse(stored) : 0;
		localStorage.setItem("numStars", JSON.stringify(0));
		return num_stars
	}

	/**
	 * Set the final score
	 */
	setFinalScore(score: number): void {
		this.finalScore = score;
	}

	/**
	 * Get the final score
	 */
	getFinalScore(): number {
		return this.finalScore;
	}

	/**
	 * Set the leaderboard entries
	 */
	setLeaderboard(entries: LeaderboardEntry[]): void {
		this.leaderboard = entries;
	}

	/**
	 * Get the leaderboard entries
	 */
	getLeaderboard(): LeaderboardEntry[] {
		return this.leaderboard;
	}
}
