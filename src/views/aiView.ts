import * as vscode from 'vscode';

export class AIView {
    private panel: vscode.WebviewPanel | undefined;

    constructor(private context: vscode.ExtensionContext) {}

    public show(column: vscode.ViewColumn) {
        if (this.panel) {
            this.panel.reveal(column);
        } else {
            this.panel = vscode.window.createWebviewPanel(
                'geeAI',
                'GEE AI Assistant',
                column,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );

            this.panel.webview.html = this.getHtml();
            this.panel.onDidDispose(() => {
                this.panel = undefined;
            }, null, this.context.subscriptions);
        }
    }

    private getHtml() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>GEE AI</title>
                <style>
                    body { 
                        background: #1e1e1e; 
                        color: #d4d4d4; 
                        font-family: sans-serif;
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                        margin: 0;
                        padding: 10px;
                        box-sizing: border-box;
                    }
                    .chat-container { flex: 1; overflow-y: auto; margin-bottom: 10px; }
                    .input-container { display: flex; gap: 5px; }
                    input { 
                        flex: 1; 
                        background: #333; 
                        border: 1px solid #555; 
                        color: white; 
                        padding: 8px;
                        border-radius: 4px;
                    }
                    button { 
                        background: #007acc; 
                        color: white; 
                        border: none; 
                        padding: 8px 15px; 
                        cursor: pointer;
                        border-radius: 4px;
                    }
                    .msg { margin-bottom: 10px; padding: 8px; border-radius: 4px; font-size: 13px; }
                    .ai { background: #2d2d2d; border-left: 3px solid #007acc; }
                    .user { background: #3d3d3d; text-align: right; }
                </style>
            </head>
            <body>
                <div class="chat-container" id="chat">
                    <div class="msg ai">
                        <strong>GEE Pro Assistant</strong><br>
                        Hello! I am your GEE Pro geospatial assistant. I specialize in Google Earth Engine scripts and remote sensing analysis.<br><br>
                        How can I help you optimize your algorithms today?
                    </div>
                </div>
                <div class="input-container">
                    <input type="text" id="input" placeholder="e.g. How to calculate NDVI?..." />
                    <button id="send">Send</button>
                </div>
                <script>
                    const chat = document.getElementById('chat');
                    const input = document.getElementById('input');
                    const send = document.getElementById('send');

                    send.addEventListener('click', () => {
                        const text = input.value;
                        if (!text) return;
                        
                        const userMsg = document.createElement('div');
                        userMsg.className = 'msg user';
                        userMsg.textContent = text;
                        chat.appendChild(userMsg);
                        
                        input.value = '';
                        
                        // Mock Expert Response
                        setTimeout(() => {
                            const aiMsg = document.createElement('div');
                            aiMsg.className = 'msg ai';
                            aiMsg.innerHTML = "<strong>Assistant:</strong> Understood. I'm analyzing your request about <em>" + text + "</em>. <br><br>I will provide optimized code snippets and best practices for this task shortly.";
                            chat.appendChild(aiMsg);
                            chat.scrollTop = chat.scrollHeight;
                        }, 600);
                    });
                </script>
            </body>
            </html>
        `;
    }
}
