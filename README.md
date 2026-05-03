# GEE Pro IDE: Google Earth Engine Professional IDE for VS Code

<p align="center">
  <img src="media/logo.png" width="128" alt="GEE Pro IDE Logo">
</p>

**GEE Pro IDE** is a high-performance, local development environment for Google Earth Engine. Stop fighting with browser tabs and start coding like a pro with the full power of Visual Studio Code and an RStudio-inspired workflow.

## 🚀 Key Features (Pro Edition)

- **Smart Block Execution (RStudio Style)**: Execute code blocks intelligently. Use `Cmd + Enter` and the IDE will automatically detect parentheses and brackets to run full statements, then jump to the next line.
- **Premium Map Experience**: Minimalist, glassmorphism-styled map interface with centered coordinates visor and integrated help menu.
- **GEE Shell (Linux-style)**: Manage your cloud assets using familiar terminal commands like `ls`, `cd`, `pwd`, `mkdir`, `cp`, and `mv` directly in the GEE Console.
- **Intelligent Session Management**: Built-in OAuth2 auto-refresh logic. Log in once and stay connected; the IDE handles token renewals silently in the background.
- **AI-Powered Geospatial Assistant**: Integrated chat assistant designed to help you write complex geospatial algorithms and optimize your code.
- **Professional Console**: Real-time script echoing with `>` prefix and a ready state `gee>` prompt for a true IDE feel.

## 🛠️ Installation & Setup

1. Search for **GEE Pro** in the VS Code Marketplace and click **Install**.
2. Open the Command Palette (`Cmd+Shift+P`) and run **`GEE Pro: Start Environment`**.

### 🔑 Authentication & Persistence

GEE Pro IDE makes connecting to Earth Engine simple and secure:

#### 1. Google OAuth (Standard Login)
- Run the command **`GEE Pro IDE: Login with Google (Easy)`**.
- Follow the browser flow and paste the authorization code.
- **Done!** Your session is saved securely. Thanks to the new **Auto-Refresh** system, you won't need to log in again for weeks.

#### 2. Service Account
- Run the command **`GEE Pro IDE: Login with Service Account`** and select your JSON key.

---

## 📖 Quick Start & Shortcuts

Create a `.js` file and start coding like an expert:

| Shortcut | Action |
| :--- | :--- |
| `Cmd + Enter` | **Run Selection / Smart Block** (Auto-detects multi-line code) |
| `Cmd + Shift + Enter` | **Run Entire Script** |
| `Cmd + Alt + R` | **Reset Environment** (Clears variables for a fresh start) |

```javascript
// 1. Set center and load data
Map.setCenter(-77.0428, -12.0464, 10);
const elevation = ee.Image('CGIAR/SRTM90_V4');

// 2. Add to interactive map with professional palette
Map.addLayer(elevation, {
    min: 0, 
    max: 4000, 
    palette: ['blue', 'green', 'red']
}, 'SRTM Elevation');

print('GEE Pro IDE is Ready!');
```

## 🛡️ Privacy & Security
GEE Pro handles your credentials securely using VS Code's encrypted **SecretStorage**. We never store your JSON files or tokens in plain text. Everything is managed through the official Google Earth Engine API.

---
Developed with ❤️ for the Geospatial Community by **Luis Robles**.

### ⚠️ Beta Version & Feedback
If you find a bug or have a feature request, please:
1. Report it via email to: **lroblesr@outlook.es**
2. Open an issue on our [GitHub Repository](https://github.com/rralDev/gee-pro-ide/issues).
