# AI Safety Incident Dashboard

A modern web application for tracking and managing AI safety incidents. Built with React and Vite, this dashboard provides an intuitive interface for reporting, viewing, and filtering AI safety incidents.

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: JavaScript/JSX
- **Package Manager**: npm
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/kishlay42/AISafety.git
cd AIsafety
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For production build:
```bash
npm run build
```

## 🏗️ Project Structure

```
AIsafety/
├── src/                # Source files
├── public/            # Static assets
├── frontend/          # Frontend specific components
├── vite.config.js     # Vite configuration
└── package.json       # Project dependencies and scripts
```

## 🎯 Features

- Real-time incident reporting
- Severity-based filtering
- Search functionality
- Responsive design for mobile and desktop
- Keyboard shortcuts for improved UX
- Modal-based incident creation
- Expandable incident details

## 🎨 Design Decisions

- **Mobile-First Approach**: The application is designed with a mobile-first mindset, featuring a responsive layout that adapts to different screen sizes.
- **Accessibility**: Implemented keyboard navigation and ARIA attributes for better accessibility.
- **Performance**: Utilized React's latest features and Vite's fast build system for optimal performance.
- **User Experience**: 
  - Implemented a drawer navigation for mobile devices
  - Added keyboard shortcuts (e.g., '/' for search)
  - Used a modal system for incident creation to maintain context

## 🐛 Development

- Run the linter:
```bash
npm run lint
```

- Preview production build:
```bash
npm run preview
```

## 📝 Notes

- The project uses mock data for demonstration purposes
- All dates are formatted using the browser's locale settings
- The application supports both light and dark mode through CSS variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
#
