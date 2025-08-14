# MarkEdit+

MarkEdit+ is an advanced, feature-rich Markdown editor built with React. It provides a seamless experience for writing and previewing Markdown content in real-time, along with powerful functionalities like image handling, table insertion, and export options.

## Features

*   **Real-time Editing & Preview:** Instantly see your Markdown rendered as you type.
*   **Resizable Panes:** Adjust the size of the editor and preview sections to suit your workflow.
*   **Comprehensive Toolbar:** Quickly apply common Markdown formatting such as bold, italic, headings, lists, links, and code blocks.
*   **Image Drag-and-Drop:** Easily insert images into your Markdown by dragging and dropping them into the editor.
*   **Table Insertion:** Generate and insert Markdown tables with a user-friendly modal.
*   **Content Persistence:** Your Markdown content is automatically saved to local storage, so you never lose your work.
*   **Export Options:**
    *   Download your Markdown content as a `.md` file.
    *   Export the rendered preview as a PDF document.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool that provides an extremely fast development experience.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Allotment:** A React component for creating resizable split views.
*   **jsPDF & html2canvas:** Used for generating PDF documents from the rendered Markdown preview.
*   **Local Storage:** For persisting user content across sessions.

## Project Structure

```
MarkEdit-/
├───public/
│   └───vite.svg
├───src/
│   ├───App.css
│   ├───App.jsx           // Main application component
│   ├───index.css
│   ├───main.jsx          // Entry point for the React application
│   ├───assets/
│   │   └───react.svg
│   ├───components/
│   │   ├───Editor.jsx    // Markdown editor component
│   │   ├───Preview.jsx   // Markdown preview component
│   │   ├───TableModal.jsx// Modal for inserting tables
│   │   └───Toolbar.jsx   // Toolbar with formatting and export options
│   └───hooks/
│       └───useLocalStorage.js // Custom hook for local storage
├───.gitignore
├───eslint.config.js
├───fav.png
├───index.html            // Main HTML file
├───package-lock.json
├───package.json          // Project dependencies and scripts
├───postcss.config.js
├───README.md             // This file
├───tailwind.config.js
├───vite.config.js
└───... (build artifacts, node modules, git)
```

## Installation and Setup

To get MarkEdit+ up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd MarkEdit-
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and you can access the application in your browser, usually at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This command will compile the application into the `dist` directory, ready for deployment.

5.  **Preview the production build:**
    ```bash
    npm run preview
    ```
    This will serve the production build locally for testing.

## Usage

*   **Editing:** Type your Markdown content directly into the left pane.
*   **Previewing:** The right pane will automatically update to show the rendered HTML.
*   **Formatting:** Use the toolbar buttons to apply various Markdown styles.
*   **Images:** Drag and drop image files into the editor.
*   **Tables:** Click the table icon in the toolbar to open the table insertion modal.
*   **Download Markdown:** Click the "Download MD" button in the toolbar to save your content as a `.md` file.
*   **Download PDF:** Click the "Download PDF" button in the toolbar to save the rendered preview as a PDF.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is open-sourced under the [MIT License](https://opensource.org/licenses/MIT).
