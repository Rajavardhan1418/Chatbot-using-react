React Chatbot Application
A modern, responsive React-based chatbot web application powered by the Groq API. The app features a sleek, dark, neon-themed UI with glassmorphic elements, smooth animations, and intuitive functionality for chatting, uploading files/images, managing chat sessions, and auto-generating session titles.
Features

Chat Interface: Send text messages to interact with the Groq AI model (llama3-70b-8192) and receive responses.
File/Image Upload: Upload images (displayed inline) or other files (shown as filenames) in the chat.
Session Management:
Create new chat sessions with a styled "New Chat" button featuring a plus icon.
Delete chat sessions with a smooth, hover-activated delete button.
Rename chat sessions by clicking their titles in the sidebar.
Auto-generate session titles based on the first user message using the Groq API.


UI Design:
Dark theme with neon cyan/magenta accents and glassmorphic effects (translucent backgrounds with blur).
Smooth animations for messages (fade and scale), sidebar items (slide and scale), and buttons (hover glow, active scale).
Uses Roboto font for a futuristic, clean look.


Error Handling: Displays error messages for API failures (e.g., invalid key, server issues).
Local Storage: Persists chat sessions across page reloads using localStorage.

Prerequisites

Node.js: Version 14 or higher.
npm: Version 6 or higher.
Groq API Key: Obtain from Groq's console.

Installation

Clone the Repository:
git clone <repository-url>
cd react-chatbot


Install Dependencies:
npm install

Ensure react-markdown is installed for rendering markdown in messages:
npm install react-markdown


Set Up Environment Variables:

Create a .env file in the project root.
Add your Groq API key:REACT_APP_GROQ_API_KEY=your-groq-api-key


Add .env to .gitignore to avoid committing the key:echo ".env" >> .gitignore



Note: The current ChatUtils.js uses a hardcoded API key for testing. For security, update it to use process.env.REACT_APP_GROQ_API_KEY after setting up .env.

Run the Application:
npm start

The app will open at http://localhost:3000.


Usage

Start a Chat:

Click the "➕ New Chat" button in the sidebar to create a new session.
Type a message in the input field and press Enter or click the send button (➤).
Upload files/images using the paperclip button (📎) in the input area.


Manage Sessions:

Select: Click a session title in the sidebar to switch chats.
Rename: Click a session title to edit it; press Enter or click away to save.
Delete: Hover over a session to reveal the delete button (✕) and click to remove.
Auto-Title: The first message in a new session generates a title via the Groq API.


File Upload:

Click the 📎 button to select a file (images, PDFs, text, Word documents).
Images appear inline in the chat; other files display as "File: [name]".
Combine files with text messages if desired.


Error Handling:

API errors (e.g., invalid key, server issues) appear as red messages in the chat.
Check the browser console (F12 > Console) for detailed logs.



File Structure
react-chatbot/
├── src/
│   ├── App.js              # Main component managing sessions and file uploads
│   ├── Chat.js             # Chat window with input, file upload, and message rendering
│   ├── Sidebar.js          # Sidebar for session list and new chat button
│   ├── chatUtils.js        # API calls to Groq for chat responses and titles
│   ├── App.css             # Styles for chat window, input, and messages
│   ├── Sidebar.css         # Styles for sidebar and new chat button
│   ├── index.js            # Entry point rendering the app
│   └── App.test.js         # Basic test file (update for meaningful tests)
├── .env                    # Environment variables (API key)
├── .gitignore              # Ignores .env and node_modules
├── package.json            # Dependencies and scripts
└── README.md               # This file

Styling and Animations

Theme: Dark navy background (#0a0e1a) with neon cyan (#06b6d4) and magenta (#d946ef) accents. Glassmorphic elements use translucent backgrounds with blur.
Typography: Roboto font for a clean, futuristic look.
Buttons:
Gradient backgrounds (cyan to blue) with glowing hover effects and active scale animations.
File upload (📎) and send (➤) buttons in the chat input.
"New Chat" button with a plus icon (➕).


Animations:
Messages: Fade and scale (fadeScale).
Sidebar items: Slide and scale (scaleIn).
Chat input: Slide up (slideUp).
Buttons: Scale and glow on hover, shrink on click.
Uses cubic-bezier(0.4, 0, 0.2, 1) for smooth, elastic transitions.



Known Limitations

File Upload: Images are encoded as base64, which may impact performance for large files. Non-image files display as filenames; downloading requires a backend.
API Key: The hardcoded key in chatUtils.js is insecure for production. Use .env or a backend proxy.
API Errors: If the Groq API key is invalid or the server is down, errors appear in the chat. Test the key with:curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
-H "Authorization: Bearer your-groq-api-key" \
-H "Content-Type: application/json" \
-d '{"messages": [{"role": "user", "content": "Hello"}], "model": "llama3-70b-8192"}'


Mobile: The sidebar may not be fully responsive. Add a toggle for mobile support if needed.

Troubleshooting

"Failed to fetch" Error:
Check console logs for status codes (e.g., 401 for invalid key, 500 for server issues).
Verify the API key in .env or chatUtils.js.
Test the key using the cURL command above.


Chat Deletion Issues:
Ensure logs in App.js (Deleting chat with ID) and Sidebar.js (Delete button clicked) appear.
Verify key={s.id} in Sidebar.js for proper rendering.


File Upload:
Ensure images display inline and other files show as text.
Check console for FileReader errors.


Animations:
Test in modern browsers (Chrome, Firefox) for best performance.
Disable browser extensions if animations lag.



Future Enhancements

Add a backend to store and serve files for downloads.
Implement mobile responsiveness with a collapsible sidebar.
Add a loading spinner for file uploads.
Use an icon library (e.g., Font Awesome) for custom icons.
Enhance error UI with retry buttons.
Add tests in App.test.js for chat and file functionality.

Dependencies

react: ^18.2.0
react-dom: ^18.2.0
react-markdown: ^8.0.0 (for markdown rendering)
node: >=14
No external icon libraries (uses Unicode icons).

License
MIT License. Feel free to modify and distribute.
Contact
For issues or feature requests, open a GitHub issue or contact the developer.