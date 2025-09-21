# System Designs & Architecture Documentation

This repository contains the source files for the Foodhub System Designs documentation site, built with [MkDocs](https://www.mkdocs.org/) and the Material theme.

## 🚀 How to Run the Documentation Site Locally

To view the site, you need Python and MkDocs installed.

1.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt 
    ```

2.  **Start the local server:**
    ```bash
    mkdocs serve
    ```
    The site will be available at `http://127.0.0.1:8000`. The server will automatically reload when you make changes to the documentation files.

## 📝 How to Contribute

All documentation is located in the `docs/` directory. To keep the content organized, please follow these guidelines:

### Directory Structure

All new system designs or documentation should be placed within a new subfolder inside `docs/categories/`.

For example, to add a new design for a "Payment Gateway", you would create:
`docs/categories/payment-gateway/`

### Required Files

Each documentation folder **must** contain the following three files:

1.  **`README.md`**
    *   This is the main content file.
    *   It should contain a detailed explanation of the system, architecture, or process.
    *   Use Markdown to structure the content with headings, lists, tables, and code blocks.
    *   The file **must** reference the `diagram.png` to display the visual aid, like this: `![Architecture Diagram](diagram.png)`

2.  **`diagram.png`**
    *   A high-resolution PNG export of your diagram.
    *   This is the image that will be displayed on the documentation site.
    *   Ensure it is clear, readable, and up-to-date with the `.drawio` source.

3.  **`[diagram-name].drawio`**
    *   The editable source file for your diagram, created with [draw.io](https://app.diagrams.net/) (or the desktop app).
    *   This allows other team members to easily view and edit the diagram in the future.

By following this structure, your new documentation will be automatically included in the site navigation.
