# Blockchain Fundamentals

A comprehensive web-based documentation viewer for learning blockchain development, focusing on Hedera, Ethereum, and Solidity.

## 🌐 Live Demo

**Deployed Application:** [https://blockchain-fundamentals.vercel.app/](https://blockchain-fundamentals.vercel.app/)

## 📚 Overview

This application provides an interactive interface to explore blockchain learning materials, including:

- **Documentation**: Core concepts covering blockchain basics, cryptography, consensus mechanisms, tokens, wallets, and platform-specific guides
- **Code Examples**: Working code snippets for Hedera, Ethereum, and Solidity development
- **Resources**: Curated links, tools, and faucets for blockchain development

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blockchain-fundamentals
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

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
blockchain-fundamentals/
├── public/
│   ├── docs/              # Markdown documentation files
│   ├── code-examples/     # Code examples (Hedera, Ethereum, Solidity)
│   ├── resources/         # Resource markdown files
│   ├── blockchainlogo.png
│   ├── README.md
│   └── LEARNING_PATH.md
├── src/
│   ├── components/        # React components
│   │   ├── Sidebar.jsx    # Navigation sidebar
│   │   ├── MarkdownViewer.jsx
│   │   └── CodeViewer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── *.css
├── package.json
└── vite.config.js
```

## 🛠️ Technologies

- **React** - UI framework
- **Vite** - Build tool and dev server
- **react-markdown** - Markdown rendering
- **react-syntax-highlighter** - Code syntax highlighting
- **remark-gfm** - GitHub Flavored Markdown support

## 📖 Features

- 📄 Interactive markdown documentation viewer
- 💻 Syntax-highlighted code examples
- 🎨 Clean, modern UI with collapsible sidebar
- 🔍 Easy navigation through documentation and code examples
- 📱 Responsive design

## 📝 Content

The application includes comprehensive documentation on:

- Blockchain fundamentals
- Cryptography basics
- Consensus mechanisms
- Tokens and wallets
- Hedera Hashgraph platform
- Ethereum platform
- Solidity smart contract development
- Advanced topics (Nonce, Merkle Trees)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

See the LICENSE file for details.

## 👤 Author

**Abhay Agarwal**

- LinkedIn: [iamabhayagarwal](https://www.linkedin.com/in/iamabhayagarwal/)
- GitHub: [iamabhay121](https://github.com/iamabhay121)

---

Built with ❤️ using React and Vite
