onload = () => {
  document.body.classList.remove("container");
  // Enable spring visuals
  document.body.classList.add("spring-mode");

  const audio = document.getElementById("bg-music");
  if (!audio) return;

  // Helper to try playing and hide the prompt if it works
  const tryPlay = () => {
    return audio.play()
      .then(() => {
        const btn = document.getElementById("play-music-btn");
        if (btn) btn.remove();
        removeGestureListeners();
      })
      .catch(() => {
        showPlayButton();
        addGestureListeners();
      });
  };

  const showPlayButton = () => {
    if (document.getElementById("play-music-btn")) return;
    const btn = document.createElement("button");
    btn.id = "play-music-btn";
    btn.textContent = "Reproducir música";
    btn.style.position = "fixed";
    btn.style.left = "50%";
    btn.style.bottom = "24px";
    btn.style.transform = "translateX(-50%)";
    btn.style.padding = "12px 18px";
    btn.style.borderRadius = "999px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "600";
    btn.style.color = "#ffffff";
    btn.style.background = "linear-gradient(90deg,#f59e0b,#fbbf24)"; // amber -> yellow
    btn.style.boxShadow = "0 6px 16px rgba(251, 191, 36, 0.35)";
    btn.style.zIndex = "9999";
    btn.addEventListener("click", () => {
      tryPlay();
    });
    document.body.appendChild(btn);
  };

  const gestureHandler = () => tryPlay();
  const addGestureListeners = () => {
    window.addEventListener("click", gestureHandler, { once: true });
    window.addEventListener("touchstart", gestureHandler, { once: true });
    window.addEventListener("keydown", gestureHandler, { once: true });
  };
  const removeGestureListeners = () => {
    window.removeEventListener("click", gestureHandler);
    window.removeEventListener("touchstart", gestureHandler);
    window.removeEventListener("keydown", gestureHandler);
  };

  // Attempt immediate playback (may be blocked by browser policies)
  tryPlay();
};
