```markdown
# Twister Text

Twister Text is a visually engaging web page that features a text animation resembling a twister. Each word from a provided text string appears in a random color and at various sizes, swirling around in a funnel shape with the funnel point directed downward. The animation automatically plays upon page load and loops continuously.

## Overview

Twister Text is a web application built using React for the frontend framework and WebGL for animations. The project utilizes Three.js, a JavaScript 3D library, and React-Three-Fiber, a React renderer for Three.js, to create the twister text animation. The architecture of the project is primarily frontend, with a single React component managing the WebGL canvas and animation logic.

### Project Structure

```
Twister Text/
├── public/
│   └── .gitkeep
├── src/
│   ├── assets/
│   │   └── .gitkeep
│   ├── components/
│   │   └── TwisterScene.jsx
│   ├── utils/
│   │   └── textUtils.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Features

1. **Full Viewport Height Animation**: The twister animation fills the entire viewport height, creating an immersive visual effect.
2. **Dynamic Text Animation**: Words from the provided text string are animated to swirl in a funnel shape, each appearing in a random color and size.
3. **Continuous Looping**: The animation starts automatically upon page load and loops continuously without user intervention.
4. **Customizable Funnel Shape**: The funnel shape is directed downward, enhancing the visual appeal of the swirling text.

## Getting Started

### Requirements

To run the project, you need to have the following technologies set up on your computer:
- Node.js (JavaScript runtime for building apps)

### Quickstart

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd Twister Text
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the development server**:
    ```sh
    npm run dev
    ```

4. **Open your browser** and navigate to `http://localhost:3000` to see the Twister Text animation in action.

### License

The project is proprietary (not open source). Copyright (c) 2024.
```