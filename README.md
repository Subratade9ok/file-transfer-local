# File Transfer Local

File Transfer Local is a simple, private, and lightweight file-sharing web application built for local network usage. You can upload, browse, and share files securely within your LAN without needing an internet connection. The app also supports drag-and-drop uploads, file renaming, file previews, and resumable uploads.

This project is ideal for quick file transfers between devices on the same local network.

## Features

- **Drag & Drop Upload**: Upload files with a simple drag-and-drop interface. No page refresh required.
- **File Rename**: Rename files and folders with a simple double-click (PIN protection enabled).
- **File Preview**: Preview images, videos, and PDFs directly in your browser.
- **Resumable Uploads**: Upload large files without worrying about network interruptions.
- **LAN QR Code**: Easily share the upload URL within your local network by scanning a QR code.
- **PIN Protection**: Secure file browsing and renaming with PIN authentication.

## Requirements

- **Node.js (LTS)**: The application runs on Node.js, and the latest LTS version is recommended.
- **Git**: Required for cloning the repository.
- **Express.js**: A fast and minimal web framework for Node.js.
- **EJS**: Templating engine for rendering dynamic HTML views.
- **Tailwind CSS**: A utility-first CSS framework for a lightweight, responsive UI.
- **Multer**: A middleware for handling multipart/form-data, used for file uploads.
- **Tus protocol**: For resumable uploads.

## Setup

### Prerequisites

- Node.js (LTS)
- Git (for cloning the repository)

### 1. Clone the repository

```bash
git clone https://github.com/Subratade9ok/file-transfer-local.git
cd file-transfer-local
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following:
```bash
PORT=3000
UPLOAD_DIR=./uploads  # Specify the default upload directory
BROWSE_PIN=your_secure_pin  # Set a PIN for browsing
```

### 4. Run the application

To start the server : 
```bash
npm start
```

You can now open the app on your system by visiting: 

```bash
http://localhost:3000
```

Scan the QR Code displayed on the upload page to access it from other devices on the same network.

### 5. Docker Setup (Optional)
If you prefer to run the application in Docker, follow these steps.

#### 1. Build Docker image
```bash
docker build -t subratade9ok/file-transfer-local .
```

#### 2. Run Docker container
```bash
docker run -p 3000:3000 -v $(pwd)/uploads:/app/uploads subratade9ok/file-transfer-local
```

#### 6. GitHub Actions (CI/CD)

The repository is set up with GitHub Actions for continuous integration and deployment. When a new tag is pushed, the Docker image will be built and published to Docker Hub. You can check out the .github folder for the action workflows.

---

# Usage

## 1. Upload Files:

* Open the app and drag-and-drop files into the drop zone.

* Alternatively, click the zone to browse for files.

## 2. PIN Authentication:

* To browse and rename files, enter the PIN that you configured in the .env file.

## 3. Browse Files:

* Once the PIN is authenticated, you can browse, download, and rename files.

## 4. File Preview:

* Click on a file to preview images, videos, and PDFs directly in your browser.

## 5. Resumable Upload:

* For large file uploads, the app uses the Tus protocol to allow resumable uploads.

---

# File Structure
```bash
/file-transfer-local
│
├── /src
│   ├── /controllers            # Contains controllers for file handling
│   ├── /routes                 # Contains route handlers for file transfer and authentication
│   ├── /views                  # EJS views for frontend rendering
│   ├── /utils                  # Utility functions (e.g., file renaming, network utility)
│   └── /public                 # Static files (CSS, JS)
│
├── .env                        # Environment configuration
├── Dockerfile                  # Docker setup
├── docker-compose.dev.yml      # Docker compose setup for development
├── docker-compose.prod.yml     # Docker compose setup for production
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

---

# Contributing

Contributions are welcome! Feel free to fork the repository, open an issue, or submit a pull request. Here are some guidelines for contributing:

1) Fork the repository.

2) Clone your fork to your local machine.

3) Create a new branch for your feature or fix.

4) Make your changes, then commit and push.

5) Open a pull request for review.

--- 
# License

This project is licensed under the GNU GPL License. See the [LICENSE](LICENSE) file for details.

---

# Troubleshooting

If you encounter any issues:

* Ensure your .env file is correctly configured, especially the BROWSE_PIN.

* Check if file permissions are correct for the upload directory.

* Look at the server logs for any detailed error messages if something goes wrong.

For further questions or help, feel free to open an issue on GitHub!