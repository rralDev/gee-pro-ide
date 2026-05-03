# GEE Pro IDE: Google Earth Engine Professional IDE for VS Code

<p align="center">
  <img src="media/logo.png" width="128" alt="GEE Pro IDE Logo">
</p>

**GEE Pro IDE** is a high-performance, local development environment for Google Earth Engine. Stop fighting with browser tabs and start coding like a pro with the full power of Visual Studio Code.

## 🚀 Key Features

- **Interactive Map View**: Real-time Leaflet-based visualization. Add layers, set center, and inspect coordinates with one click.
- **GEE Shell (Linux-style)**: Manage your cloud assets using familiar terminal commands like `ls`, `cd`, `pwd`, `mkdir`, `cp`, and `mv`.
- **Smart Execution**: Run your full script or just the current selection with `Cmd + Enter`. Persistent context keeps your variables alive between runs.
- **Secure Authentication**: Your credentials are encrypted using VS Code's SecretStorage (System Keychain).
- **AI-Powered Coding**: Integrated chat assistant designed to help you write complex geospatial algorithms (Beta).

## 🛠️ Installation & Setup

1. Search for **GEE Pro** in the VS Code Marketplace and click **Install**.
2. Open the Command Palette (`Cmd+Shift+P`) and run **`GEE Pro: Start Environment`**.

### 🔑 Authentication & Setup

GEE Pro IDE makes connecting to Earth Engine simple and secure:

#### 1. Google OAuth (Standard Login)
1. Open the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`).
2. Search for **`GEE Pro IDE: Login with Google (Easy)`**.
3. A browser window will open. Authorize your Google account.
4. Copy the **Authorization Code** provided by Google.
5. Paste it back into the VS Code input box.
6. **Done!** Your session is saved securely. Thanks to refresh tokens, you won't need to log in again.

#### 2. Service Account (Pro/Automation)
If you prefer using a Service Account for automation:
1. Obtain your Service Account **JSON Key** from the Google Cloud Console.
2. Run the command **`GEE Pro IDE: Login with Service Account`**.
3. Select your JSON file.

---

### 🖥️ Starting the Environment
Once authenticated, run **`GEE Pro IDE: Start Environment`** to launch the 4-panel professional workspace.

## 📖 Quick Start

Create a `.js` file and start coding:

```javascript
// Set center and load data
Map.setCenter(-75, -10, 5);
const image = ee.Image('USGS/SRTMGL1_003');

// Add to interactive map
Map.addLayer(image, {min: 0, max: 3000}, 'Elevation');

print('GEE Pro is ready!');
```

## 🛡️ Privacy & Security
GEE Pro handles your credentials securely. We never store your JSON files in plain text. Everything is managed through the official Google Earth Engine API and VS Code's encrypted storage.

---
Developed with ❤️ for the Geospatial Community.
