import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { GameScreenController } from '../../../src/screens/GameScreen/GameScreenController'
import { GAME_DURATION } from '../../../src/constants'

describe('GameScreenController - Auto Attack System', () => {
  let controller: GameScreenController
  let mockScreenSwitcher: any

  beforeEach(() => {
    vi.useFakeTimers()
    mockScreenSwitcher = {
      switchToScreen: vi.fn()
    }
    controller = new GameScreenController(mockScreenSwitcher)
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('should trigger exactly 10 auto-attacks over game duration', async () => {
    const autoAttackSpy = vi.spyOn(controller['model'], 'autoAttackPlayer')
    const viewAttackSpy = vi.spyOn(controller['view'], 'autoAttackPlayer').mockResolvedValue()
    
    controller.startGame()
    
    const interval = (GAME_DURATION / 10) * 1000
    
    for (let i = 0; i < 10; i++) {
      await vi.advanceTimersByTimeAsync(interval)
    }
    
    expect(autoAttackSpy).toHaveBeenCalledTimes(10)
  })

  it('should not trigger auto-attacks when paused', async () => {
    const autoAttackSpy = vi.spyOn(controller['model'], 'autoAttackPlayer')
    vi.spyOn(controller['view'], 'autoAttackPlayer').mockResolvedValue()
    
    controller.startGame()
    controller['paused'] = true
    
    const interval = (GAME_DURATION / 10) * 1000
    await vi.advanceTimersByTimeAsync(interval * 5)
    
    expect(autoAttackSpy).not.toHaveBeenCalled()
  })

  it('should stop auto-attacks when player is defeated', async () => {
    const autoAttackSpy = vi.spyOn(controller['model'], 'autoAttackPlayer')
    vi.spyOn(controller['view'], 'autoAttackPlayer').mockResolvedValue()
    vi.spyOn(controller['model'], 'isPlayerAlive').mockReturnValue(false)
    
    controller.startGame()
    
    const interval = (GAME_DURATION / 10) * 1000
    await vi.advanceTimersByTimeAsync(interval)
    
    // Should stop after player dies
    const callCount = autoAttackSpy.mock.calls.length
    await vi.advanceTimersByTimeAsync(interval * 9)
    
    expect(autoAttackSpy.mock.calls.length).toBe(callCount)
  })

  it('should pass correct player health to view animation', async () => {
    const viewAttackSpy = vi.spyOn(controller['view'], 'autoAttackPlayer').mockResolvedValue()
    vi.spyOn(controller['model'], 'getPlayerHealth').mockReturnValue(75)
    
    controller.startGame()
    
    const interval = (GAME_DURATION / 10) * 1000
    await vi.advanceTimersByTimeAsync(interval)
    
    expect(viewAttackSpy).toHaveBeenCalledWith(75)
  })
})