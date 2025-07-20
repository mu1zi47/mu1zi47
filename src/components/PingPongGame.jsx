"use client";
import { useEffect, useRef } from "react";

export default function PingPongGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    // Параметры игры
    let paddleHeight = 10;
    let paddleWidth = 80;
    let paddleX = (width - paddleWidth) / 2;

    let rightPressed = false;
    let leftPressed = false;

    let ballRadius = 8;
    let x = width / 2;
    let y = height - 30;
    let dx = 3;
    let dy = -3;

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#00ffe5";
      ctx.fill();
      ctx.closePath();
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleX, height - paddleHeight - 5, paddleWidth, paddleHeight);
      ctx.fillStyle = "#ff00f7";
      ctx.fill();
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawBall();
      drawPaddle();

      // Движение мяча
      x += dx;
      y += dy;

      // Столкновение с боковыми стенками
      if (x + dx > width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }

      // Столкновение с верхом
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > height - ballRadius - paddleHeight) {
        // Проверяем столкновение с ракеткой
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else if (y + dy > height - ballRadius) {
          // Игра окончена
          alert("💥 Game Over!");
        //   document.location.reload();
        }
      }

      // Движение ракетки
      if (rightPressed && paddleX < width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      requestAnimationFrame(draw);
    };

    const keyDownHandler = (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
      }
    };

    const keyUpHandler = (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    draw();

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      style={{
        width:'100%',
        maxWidth:'400px',
        border: "2px solid #00ffe5",
        background: "#0d0221",
        display: "block",
        // margin: "20px auto",
      }}
    />
  );
}