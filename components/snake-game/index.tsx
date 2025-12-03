"use client";

import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FOOD_SVG_ICONS } from "./assets";
import { SlidingNumber } from "../sliding-number";
import { Play as PlayIcon, PauseCircleIcon, PauseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const GRID_COUNT_DESKTOP = 18;
const GRID_COUNT_MOBILE = 14;

const GAME_STATE = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused",
  GAME_OVER: "gameOver",
} as const;

function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 60%)`;
}

function getInitialSnake(gridCount: number) {
  const center = Math.floor(gridCount / 2);
  return [
    { x: center, y: center },
    { x: center - 1, y: center },
  ] as const satisfies { x: number; y: number }[];
}

const INITIAL_DIRECTION = { x: 1, y: 0 } as const satisfies {
  x: number;
  y: number;
};

type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const foodImagesRef = useRef<HTMLImageElement[]>([]);

  const [canvasSize, setCanvasSize] = useState(400);
  const [gridCount, setGridCount] = useState(() => {
    if (typeof window !== "undefined") {
      return isMobile ? GRID_COUNT_MOBILE : GRID_COUNT_DESKTOP;
    }
    return GRID_COUNT_DESKTOP;
  });

  const [snake, setSnake] = useState<{ x: number; y: number; color: string }[]>(
    () => {
      const initialColor = randomColor();

      const initialGridCount = isMobile
        ? GRID_COUNT_MOBILE
        : GRID_COUNT_DESKTOP;

      const initialSnake = getInitialSnake(initialGridCount);
      return initialSnake.map((s) => ({
        ...s,
        color: initialColor,
      }));
    }
  );
  const [direction, setDirection] = useState<{ x: number; y: number }>(
    INITIAL_DIRECTION
  );

  const [food, setFood] = useState(() => {
    const initialGridCount = isMobile ? GRID_COUNT_MOBILE : GRID_COUNT_DESKTOP;

    return {
      x: Math.floor(Math.random() * initialGridCount),
      y: Math.floor(Math.random() * initialGridCount),
      iconIndex: Math.floor(Math.random() * FOOD_SVG_ICONS.length),
    };
  });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GAME_STATE.MENU);
  // const [pulse, setPulse] = useState(false);
  const [currentColor, setCurrentColor] = useState(randomColor());

  // Create and cache all food images once
  useEffect(() => {
    let loadedCount = 0;
    const totalIcons = FOOD_SVG_ICONS.length;

    FOOD_SVG_ICONS.forEach((svgString, index) => {
      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = function () {
        foodImagesRef.current[index] = img;
        URL.revokeObjectURL(url);
        loadedCount++;

        // Force a redraw once all images are loaded
        if (loadedCount === totalIcons && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx && gameState !== "menu") {
            // Trigger a redraw
            setFood((prev) => ({ ...prev }));
          }
        }
      };
      img.src = url;
    });
  }, []);

  function drawFoodIcon(
    ctx: CanvasRenderingContext2D,
    iconIndex: number,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    const image = foodImagesRef.current[iconIndex];
    if (image) {
      ctx.drawImage(image, x, y, w, h);
    }
  }

  function randomFood() {
    return {
      x: Math.floor(Math.random() * gridCount),
      y: Math.floor(Math.random() * gridCount),
      iconIndex: Math.floor(Math.random() * FOOD_SVG_ICONS.length),
    };
  }

  function resetGame() {
    const initialColor = randomColor();
    const initialSnake = getInitialSnake(gridCount).map((s) => ({
      ...s,
      color: initialColor,
    }));
    setSnake(initialSnake);
    setCurrentColor(initialColor);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood());
    setScore(0);
    setGameState(GAME_STATE.PLAYING);
  }

  function startGame() {
    const initialColor = randomColor();
    const initialSnake = getInitialSnake(gridCount).map((s) => ({
      ...s,
      color: initialColor,
    }));
    setSnake(initialSnake);
    setCurrentColor(initialColor);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood());
    setScore(0);
    setGameState(GAME_STATE.PLAYING);
  }

  // responsive resize
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Account for viewport width and ensure canvas doesn't overflow
        const viewportWidth = window.innerWidth;

        // Update grid count based on viewport width
        const newGridCount =
          viewportWidth < 768 ? GRID_COUNT_MOBILE : GRID_COUNT_DESKTOP;
        setGridCount(newGridCount);

        // On mobile, leave some breathing room by using viewport width minus padding
        // Container has px-3 (12px * 2 = 24px) on mobile
        const mobilePadding = viewportWidth < 640 ? 24 : 48; // px-3 on mobile, px-6 on larger
        const availableWidth = viewportWidth - mobilePadding;

        // Cap at 500px for larger screens, use available width for mobile
        const maxSize = Math.min(
          availableWidth,
          viewportWidth < 640 ? availableWidth : 500
        );
        const size = Math.min(containerWidth, maxSize);

        setCanvasSize(size);
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Setup canvas with proper DPI scaling to prevent blur
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displaySize = canvasSize;
    const actualSize = displaySize * dpr;

    // Set the actual size in memory (scaled for DPI)
    canvas.width = actualSize;
    canvas.height = actualSize;

    // Scale the canvas back down using CSS
    canvas.style.width = displaySize + "px";
    canvas.style.height = displaySize + "px";

    // Scale the drawing context so everything draws at the correct size
    ctx.scale(dpr, dpr);

    // Disable image smoothing for crisp pixel art
    ctx.imageSmoothingEnabled = false;
  }, [canvasSize]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const cellSize = canvasSize / gridCount;

    // Use CSS custom properties for theme-aware colors
    const computedStyle = getComputedStyle(document.documentElement);
    const backgroundColor = computedStyle
      .getPropertyValue("--color-background")
      .trim();
    const borderColor = computedStyle.getPropertyValue("--color-border").trim();
    // const primaryColor = computedStyle
    //   .getPropertyValue("--color-primary")
    //   .trim();

    // Clear canvas with theme background
    ctx.fillStyle = backgroundColor || "#ffffff";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw grid lines for better visual structure
    ctx.strokeStyle = borderColor || "#e5e5e5";
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridCount; i++) {
      const pos = i * cellSize;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, canvasSize);
      ctx.moveTo(0, pos);
      ctx.lineTo(canvasSize, pos);
      ctx.stroke();
    }

    // Only draw snake and food if playing or game over
    if (gameState !== "menu") {
      const padding = cellSize * 0.1;

      // Draw snake with random colors per segment
      snake.forEach(({ x, y, color }, index) => {
        const alpha = index === 0 ? 1 : Math.max(0.3, 1 - index * 0.1); // Fade tail
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(
          x * cellSize + padding,
          y * cellSize + padding,
          cellSize - padding * 2,
          cellSize - padding * 2
        );
      });
      ctx.globalAlpha = 1;

      // Draw food icon on canvas
      const foodPadding = cellSize * 0.05;
      drawFoodIcon(
        ctx,
        food.iconIndex,
        food.x * cellSize + foodPadding,
        food.y * cellSize + foodPadding,
        cellSize - foodPadding * 2,
        cellSize - foodPadding * 2
      );
    }
  }, [snake, food, canvasSize, gameState, gridCount]);

  function togglePause() {
    if (gameState === GAME_STATE.PLAYING) {
      setGameState(GAME_STATE.PAUSED);
    } else if (gameState === GAME_STATE.PAUSED) {
      setGameState(GAME_STATE.PLAYING);
    }
  }

  function handleDirectionChange(newDirection: { x: number; y: number }) {
    if (gameState !== GAME_STATE.PLAYING) return;

    // Prevent reversing into itself
    if (newDirection.x !== 0 && direction.x === 0) {
      setDirection(newDirection);
    } else if (newDirection.y !== 0 && direction.y === 0) {
      setDirection(newDirection);
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (gameState === GAME_STATE.GAME_OVER && e.key === " ") {
        e.preventDefault();
        resetGame();
        return;
      }
      if (gameState === GAME_STATE.MENU && e.key === " ") {
        e.preventDefault();
        startGame();
        return;
      }
      // Pause/Resume with Escape or P key
      if (
        (gameState === GAME_STATE.PLAYING || gameState === GAME_STATE.PAUSED) &&
        (e.key === "Escape" || e.key === "p" || e.key === "P")
      ) {
        e.preventDefault();
        togglePause();
        return;
      }
      if (gameState === GAME_STATE.PLAYING) {
        switch (e.key) {
          case "ArrowUp":
          case "w":
            e.preventDefault();
            handleDirectionChange({ x: 0, y: -1 });
            break;
          case "ArrowDown":
          case "s":
            e.preventDefault();
            handleDirectionChange({ x: 0, y: 1 });
            break;
          case "ArrowLeft":
          case "a":
            e.preventDefault();
            handleDirectionChange({ x: -1, y: 0 });
            break;
          case "ArrowRight":
          case "d":
            e.preventDefault();
            handleDirectionChange({ x: 1, y: 0 });
            break;
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction, gameState]);

  useEffect(() => {
    if (gameState !== GAME_STATE.PLAYING) return;

    // Calculate speed based on score (faster every 5 points)
    // On mobile, use slower base speed to make the game easier to play
    const isMobile = gridCount === GRID_COUNT_MOBILE;

    // Set base speed (slower on mobile for easier gameplay)
    const baseSpeed = isMobile ? 160 : 120;

    // Increase speed every 5 points scored
    const speedIncrease = Math.floor(score / 5) * 15;

    // Set minimum speed limits (slower minimum on mobile)
    const minSpeed = isMobile ? 70 : 50;

    // Calculate current speed, ensuring it doesn't go below minimum
    const currentSpeed = Math.max(minSpeed, baseSpeed - speedIncrease);

    const interval = setInterval(() => {
      const head = snake[0];
      const newHead = { x: head.x + direction.x, y: head.y + direction.y };

      // wall or self collision
      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= gridCount ||
        newHead.y >= gridCount ||
        snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
      ) {
        setGameState("gameOver");
        return;
      }

      let newSnake: { x: number; y: number; color: string }[];
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(randomFood());
        const newScore = score + 1;
        setScore(newScore);
        // setPulse(true);
        // setTimeout(() => setPulse(false), 200);

        // Check if we hit a speed milestone (every 5th score)
        const shouldChangeColor = newScore % 5 === 0 && newScore > 0;
        let segmentColor = currentColor;
        if (shouldChangeColor) {
          segmentColor = randomColor();
          setCurrentColor(segmentColor);
        }

        // Add new segment with current color (or new color if milestone reached)
        newSnake = [{ ...newHead, color: segmentColor }, ...snake];
      } else {
        // Move forward: new head inherits previous head color
        newSnake = [
          { ...newHead, color: snake[0].color },
          ...snake.slice(0, -1),
        ];
      }

      setSnake(newSnake);
    }, currentSpeed);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameState, score, currentColor, gridCount]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-start sm:justify-center min-h-screen bg-background text-foreground "
    >
      <div className="max-w-lg w-full space-y-2 sm:space-y-3 md:space-y-4">
        {/** Score display with button to pause/resume, */}
        <div className="min-h-12 mb-2 block">
          <AnimatePresence>
            {(gameState === GAME_STATE.PLAYING ||
              gameState === GAME_STATE.PAUSED) && (
              <motion.div
                key="score"
                className="text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-bold text-foreground flex-wrap">
                  <span>Score:</span>
                  <ScoreWrapper>
                    <SlidingNumber
                      value={score}
                      className="text-base sm:text-lg md:text-xl font-bold text-emerald-600 dark:text-emerald-400 inline-block tabular-nums"
                    />
                  </ScoreWrapper>

                  <SnakeGameUIButton
                    onClick={togglePause}
                    ariaLabel={
                      gameState === GAME_STATE.PAUSED
                        ? "Resume game"
                        : "Pause game"
                    }
                    className="inline-flex items-center justify-center ml-2 size-12 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-colors shadow-sm active:scale-95 min-w-[130px]"
                  >
                    <AnimatePresence mode="wait">
                      {gameState === GAME_STATE.PAUSED ? (
                        <motion.div
                          key="resume"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="flex items-center"
                        >
                          <PlayIcon className="size-6 fill-black mr-2" />
                          Resume
                        </motion.div>
                      ) : (
                        <motion.div
                          key="pause"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.1, ease: "easeOut" }}
                          className="flex items-center"
                        >
                          <PauseIcon className="size-6 fill-black mr-2" />
                          Pause
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SnakeGameUIButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative lg:min-h-[500px]">
          <motion.canvas
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="border border-border rounded-lg shadow-sm w-full max-w-md mx-auto aspect-square bg-background"
          />

          {/* Overlay buttons on top of canvas */}
          <AnimatePresence>
            {gameState === GAME_STATE.MENU && (
              <StartGameScreen startGame={startGame} />
            )}
            {gameState === GAME_STATE.PAUSED && (
              <PausedScreen togglePause={togglePause} />
            )}
            {gameState === GAME_STATE.GAME_OVER && (
              <GameOverScreen resetGame={resetGame} score={score} />
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Controls - Only visible on tablets and smaller screens */}
        <motion.div
          className="flex lg:hidden flex-col items-center gap-1.5 sm:gap-2 mt-5"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="grid grid-cols-3 gap-3 ">
            {/* Empty cell */}
            <div />

            {/* Up button */}
            <SnakeGameUIButton
              onClick={() => handleDirectionChange({ x: 0, y: -1 })}
              disabled={gameState !== GAME_STATE.PLAYING}
              ariaLabel="Move up"
            >
              ↑
            </SnakeGameUIButton>
            {/* Empty cell */}
            <div />

            {/* Left button */}
            <SnakeGameUIButton
              onClick={() => handleDirectionChange({ x: -1, y: 0 })}
              disabled={gameState !== GAME_STATE.PLAYING}
              ariaLabel="Move left"
            >
              ←
            </SnakeGameUIButton>

            {/* Down button */}
            <SnakeGameUIButton
              onClick={() => handleDirectionChange({ x: 0, y: 1 })}
              disabled={gameState !== GAME_STATE.PLAYING}
              ariaLabel="Move down"
            >
              ↓
            </SnakeGameUIButton>

            {/* Right button */}
            <SnakeGameUIButton
              onClick={() => handleDirectionChange({ x: 1, y: 0 })}
              disabled={gameState !== GAME_STATE.PLAYING}
              ariaLabel="Move right"
            >
              →
            </SnakeGameUIButton>
          </div>
        </motion.div>
      </div>
      {/* Debug: Preview all icons (FOR TESTING ONLY) */}
      <div className="mt-8 p-2 sm:p-4 border rounded-lg bg-muted/50">
        <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-4 text-center">
          Debug: Food Icons Preview on Canvas (FOR TESTING ONLY)
        </h3>
        <div className="w-full overflow-x-auto">
          <canvas
            ref={(canvas) => {
              if (canvas && foodImagesRef.current.length > 0) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                  // Responsive sizing based on container
                  const containerWidth =
                    canvas.parentElement?.clientWidth || 400;
                  const canvasWidth = Math.min(containerWidth - 32, 400);
                  const canvasHeight = Math.max(
                    150,
                    Math.min(canvasWidth * 0.5, 200)
                  );

                  canvas.width = canvasWidth;
                  canvas.height = canvasHeight;

                  const iconSize = Math.max(20, Math.min(32, canvasWidth / 15));
                  const gap = Math.max(8, Math.min(16, canvasWidth / 30));
                  const iconsPerRow = Math.floor(
                    (canvas.width - gap) / (iconSize + gap)
                  );

                  ctx.clearRect(0, 0, canvas.width, canvas.height);

                  FOOD_SVG_ICONS.forEach((_, index) => {
                    const row = Math.floor(index / iconsPerRow);
                    const col = index % iconsPerRow;
                    const x = gap + col * (iconSize + gap);
                    const y = gap + row * (iconSize + gap);

                    drawFoodIcon(ctx, index, x, y, iconSize, iconSize);

                    // Draw icon number below
                    ctx.fillStyle = "#666";
                    ctx.font = `${Math.max(8, iconSize / 3.2)}px monospace`;
                    ctx.textAlign = "center";
                    ctx.fillText(
                      `${index + 1}`,
                      x + iconSize / 2,
                      y + iconSize + Math.max(8, iconSize / 2.7)
                    );
                  });
                }
              }
            }}
            className="border rounded bg-background w-full max-w-full h-auto"
            style={{ minHeight: "150px" }}
          />
        </div>
      </div>
    </div>
  );
}

const StartGameScreen = ({ startGame }: { startGame: () => void }) => {
  return (
    <motion.div
      key="startGame"
      initial={{ scale: 0.8, opacity: 0 }}
      exit={{ opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg"
    >
      <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-sm mx-auto px-4">
        <div className="space-y-2 sm:space-y-3">
          <div className="text-foreground text-xl sm:text-2xl md:text-3xl font-bold">
            🐍 Snake Game
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Ready to play? Click <b>Start Game</b>{" "}
              <span className="hidden lg:inline">
                or press{" "}
                <kbd className="px-2 py-1 bg-secondary text-secondary-foreground rounded font-mono text-xs">
                  Space
                </kbd>{" "}
                to start.
              </span>
            </p>
            <DesktopGameControls />
          </div>
        </div>

        <motion.button
          onClick={startGame}
          className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600/90 hover:to-emerald-700/90 text-white rounded-xl font-bold text-lg md:text-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 shadow-xl  active:scale-95 transform hover:scale-105 gap-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            delay: 0.3,
          }}
        >
          <span className="mr-1">🎮</span> <span>Start Game</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xs sm:text-sm text-muted-foreground space-y-2"
        >
          <p>
            Press{" "}
            <kbd className="px-2 py-1 bg-secondary text-secondary-foreground rounded font-mono text-xs">
              Esc
            </kbd>{" "}
            or{" "}
            <kbd className="px-2 py-1 bg-secondary text-secondary-foreground rounded font-mono text-xs">
              P
            </kbd>{" "}
            to pause
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PausedScreen = ({ togglePause }: { togglePause: () => void }) => {
  return (
    <motion.div
      key="paused"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-lg"
    >
      <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="text-foreground text-xl sm:text-2xl md:text-3xl font-bold flex items-center justify-center">
            <PauseCircleIcon className="size-6 sm:size-7 md:size-8  mr-2 sm:mr-3" />
            Game Paused
          </div>
        </div>
        <button
          onClick={togglePause}
          className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-lg active:scale-95 inline-flex items-center justify-center"
        >
          <PlayIcon className="size-6 fill-white mr-2" />
          Resume
        </button>
        {/** Resume instructions on desktop */}
        <p className="text-sm text-muted-foreground hidden lg:block">
          or press{" "}
          <kbd className="px-2 py-1 bg-secondary text-secondary-foreground rounded font-mono text-xs">
            Esc
          </kbd>{" "}
          or{" "}
          <kbd className="px-2 py-1 bg-secondary text-secondary-foreground rounded font-mono text-xs">
            P
          </kbd>{" "}
          to resume
        </p>
        <DesktopGameControls />
      </div>
    </motion.div>
  );
};

const GameOverScreen = ({
  resetGame,
  score,
}: {
  resetGame: () => void;
  score: number;
}) => {
  return (
    <motion.div
      key="gameOver"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-lg"
    >
      <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="text-destructive text-base sm:text-lg md:text-xl font-semibold">
            Game Over
          </div>
          <div className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            <span>Final Score:</span>

            <ScoreWrapper>{score}</ScoreWrapper>
          </div>
        </div>
        <button
          onClick={resetGame}
          className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-lg active:scale-95"
        >
          Play Again
        </button>
        {/** Play again instructions on desktop */}
        <p className="hidden lg:block">
          or press{" "}
          <kbd className="px-2 py-1 bg-secondary text-secondary-foreground rounded font-mono text-xs">
            Space
          </kbd>{" "}
          to play again
        </p>
        <DesktopGameControls />
      </div>
    </motion.div>
  );
};

const SnakeGameUIButton = ({
  children,
  onClick,
  disabled = false,
  ariaLabel = "",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
} & MotionProps) => {
  return (
    <motion.button
      {...props}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "size-20 bg-secondary hover:bg-secondary/80 active:scale-95 text-black rounded-lg font-bold text-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

const ScoreWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm">
      <span className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">
        {children}
      </span>
    </div>
  );
};

const DesktopGameControls = () => {
  return (
    <div className="justify-center hidden lg:flex">
      <div className="space-y-2">
        <div className="text-center text-base">Controls:</div>
        <div className="flex justify-center gap-2 flex-wrap">
          <kbd className="px-3 py-2 border border-border rounded font-mono text-sm font-medium text-foreground shadow-sm">
            ↑
          </kbd>
          <kbd className="px-3 py-2 border border-border rounded font-mono text-sm font-medium text-foreground shadow-sm">
            ↓
          </kbd>
          <kbd className="px-3 py-2 border border-border rounded font-mono text-sm font-medium text-foreground shadow-sm">
            ←
          </kbd>
          <kbd className="px-3 py-2 border border-border rounded font-mono text-sm font-medium text-foreground shadow-sm">
            →
          </kbd>
          <span className="text-muted-foreground font-medium">or</span>
          <kbd className="px-3 py-2 border border-border rounded font-mono text-sm font-medium text-foreground shadow-sm">
            WASD
          </kbd>
        </div>
      </div>
    </div>
  );
};
