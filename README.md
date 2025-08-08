# Photo Story App

A modern cross-platform mobile application for creating and sharing beautiful photo stories. Built with React Native and Expo, this app allows users to capture, organize, and share their memories through visually appealing story formats.

## Features

### 📱 Cross-Platform Support
- **Web**: Responsive web application
- **Android**: Native Android app
- **iOS**: Native iPhone app

### 🎨 Core Features
- **Photo Capture**: Take photos directly within the app
- **Gallery Integration**: Select photos from device gallery
- **Story Creation**: Organize photos into themed stories
- **Modern UI**: Beautiful, intuitive interface with smooth animations
- **Profile Management**: User profiles with statistics and settings

### 🏗️ Technical Stack
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation between screens
- **Expo Camera**: Camera functionality
- **Expo Image Picker**: Gallery integration
- **Linear Gradient**: Beautiful visual effects

## Project Structure

```
photo_story/
├── src/
│   ├── screens/          # Main app screens
│   │   ├── HomeScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── StoryScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/       # Reusable components
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── assets/              # Images, fonts, etc.
├── App.tsx              # Main app component
└── package.json         # Dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photo_story
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running the App

#### Web Development
```bash
npm run web
```

#### Android Development
```bash
npm run android
```

#### iOS Development (macOS only)
```bash
npm run ios
```

## App Screens

### 🏠 Home Screen
- Welcome card with gradient design
- Recent stories overview
- Quick action buttons
- Modern card-based layout

### 📸 Camera Screen
- Camera preview interface
- Photo capture functionality
- Gallery access
- Camera controls (flash, switch camera)

### 📚 Stories Screen
- Grid view of all stories
- Filter by categories
- Search functionality
- Story management options

### 👤 Profile Screen
- User profile information
- Statistics dashboard
- Settings and preferences
- Account management

## Development Roadmap

### Phase 1: Core Features ✅
- [x] Basic navigation structure
- [x] Home screen with welcome interface
- [x] Camera screen with basic UI
- [x] Stories screen with grid layout
- [x] Profile screen with user info

### Phase 2: Camera Integration 🔄
- [ ] Full camera functionality
- [ ] Photo capture and storage
- [ ] Image editing features
- [ ] Filters and effects

### Phase 3: Story Management 🔄
- [ ] Story creation workflow
- [ ] Photo organization
- [ ] Story templates
- [ ] Sharing functionality

### Phase 4: Advanced Features 🔄
- [ ] Cloud backup
- [ ] Social features
- [ ] Advanced editing tools
- [ ] Performance optimizations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using React Native and Expo** 