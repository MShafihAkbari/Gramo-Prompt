# GramoPrompt - AI Grammar Checker

A modern, mobile-friendly AI-powered grammar checker that provides real-time text correction while maintaining your original writing style and English level.

## Features

- **Real-time Grammar Correction**: Powered by Azure AI (GPT-4.1) for accurate grammar, spelling, and punctuation fixes
- **Style Preservation**: Maintains your original tone, style, and English level
- **Modern UI**: Clean, responsive design that works seamlessly on desktop and mobile
- **Correction History**: Track your recent corrections with timestamps
- **Copy to Clipboard**: Easy one-click copying of corrected text
- **Mobile-First Design**: Optimized for all screen sizes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gramoprompt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Input Text**: Paste or type your text in the "Original Text" area
2. **Correct Grammar**: Click the "Correct Grammar" button or use Ctrl/Cmd + Enter
3. **Review Results**: View the corrected text in the "Corrected Text" section
4. **Copy Results**: Use the copy button to copy the corrected text to your clipboard
5. **View History**: Check your recent corrections in the history section below

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Azure AI Inference API (GPT-4.1)
- **Icons**: Lucide React
- **Build Tool**: Vite

## API Configuration

The application uses Azure AI Inference API with the following configuration:
- **Endpoint**: `https://models.github.ai/inference`
- **Model**: `openai/gpt-4.1`
- **Authentication**: Azure Key Credential

## Project Structure

```
src/
├── components/
│   ├── GrammarCorrector.tsx    # Main grammar correction component
│   ├── Header.tsx              # Application header
│   └── CorrectionHistory.tsx   # History of corrections
├── utils/
│   └── azureClient.ts          # Azure AI client configuration
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](#license) file for details.

## License

MIT License

Copyright (c) 2025 GramoPrompt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

## Acknowledgments

- Powered by Azure AI and OpenAI GPT-4.1
- Built with React and Tailwind CSS
- Icons by Lucide React