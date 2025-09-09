import React from 'react'

const BackgroundCookingIcons = () => {
  return (
    <div className="absolute inset-0 opacity-10">
        {/* Floating cooking utensils */}
        <div
          className="absolute top-20 left-10 text-6xl animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          🍳
        </div>
        <div
          className="absolute top-40 right-20 text-5xl animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        >
          🥘
        </div>
        <div
          className="absolute top-60 left-1/4 text-4xl animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        >
          🍴
        </div>
        <div
          className="absolute top-80 right-1/3 text-5xl animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
        >
          🥄
        </div>

        {/* More cooking elements */}
        <div
          className="absolute top-32 right-10 text-4xl animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "3.2s" }}
        >
          🧄
        </div>
        <div
          className="absolute top-52 left-16 text-3xl animate-bounce"
          style={{ animationDelay: "2.5s", animationDuration: "3.8s" }}
        >
          🧅
        </div>
        <div
          className="absolute top-72 right-1/4 text-4xl animate-bounce"
          style={{ animationDelay: "0.8s", animationDuration: "4.2s" }}
        >
          🥕
        </div>
        <div
          className="absolute top-96 left-1/3 text-3xl animate-bounce"
          style={{ animationDelay: "1.8s", animationDuration: "3.6s" }}
        >
          🌶️
        </div>

        {/* Bottom section icons */}
        <div
          className="absolute bottom-40 left-20 text-5xl animate-bounce"
          style={{ animationDelay: "2.2s", animationDuration: "4.1s" }}
        >
          🍅
        </div>
        <div
          className="absolute bottom-60 right-16 text-4xl animate-bounce"
          style={{ animationDelay: "0.3s", animationDuration: "3.7s" }}
        >
          🥬
        </div>
        <div
          className="absolute bottom-80 left-1/4 text-3xl animate-bounce"
          style={{ animationDelay: "1.2s", animationDuration: "4.3s" }}
        >
          🧂
        </div>
        <div
          className="absolute bottom-32 right-1/3 text-4xl animate-bounce"
          style={{ animationDelay: "2.8s", animationDuration: "3.9s" }}
        >
          🫒
        </div>

        {/* Decorative cooking patterns */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-8xl opacity-5">
          👨‍🍳
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-6xl opacity-5">
          🍽️
        </div>
        <div className="absolute top-1/2 left-1/6 text-7xl opacity-5">🔥</div>
      </div>
  )
}

export default BackgroundCookingIcons