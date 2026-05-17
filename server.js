// Server script with MariaDB connection check
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');

// Check if MariaDB is running
function checkMariaDB() {
    return new Promise((resolve) => {
        // Simple check to see if the mariadb process is running
        exec('pgrep -f mariadbd > /dev/null 2>&1', (error, stdout, stderr) => {
            if (error) {
                console.log('⚠️  MariaDB service not detected');
                console.log('MariaDB appears to be stopped or not installed');
                console.log('This is not required for the frontend application.');
                resolve(false);
            } else {
                console.log('✅ MariaDB service is running');
                // Try a simple connection test
                exec('mysql -u root -e "SELECT 1;" 2>/dev/null', (error, stdout, stderr) => {
                    if (error) {
                        console.log('⚠️  MariaDB is running but connection failed');
                        console.log('This might be due to configuration issues (password requirements)');
                        console.log('For frontend-only operation, MariaDB is not required.');
                        resolve(false);
                    } else {
                        console.log('✅ MariaDB is running and accessible');
                        resolve(true);
                    }
                });
            }
        });
    });
}

// Simple HTTP server to serve the static files
function startServer() {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url);
        let pathname = parsedUrl.pathname;
        
        // Default to index.html
        if (pathname === '/') {
            pathname = '/index.html';
        }
        
        const filepath = path.join(__dirname, pathname);
        
        fs.readFile(filepath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
                return;
            }
            
            // Set appropriate content type based on file extension
            let contentType = 'text/html';
            if (pathname.endsWith('.css')) {
                contentType = 'text/css';
            } else if (pathname.endsWith('.js')) {
                contentType = 'application/javascript';
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
    
    server.listen(8080, () => {
        console.log('🚀 Server running at http://localhost:8080/');
        console.log('📁 Serving files from:', __dirname);
        console.log('');
        console.log('💡 Note: This is a frontend-only application');
        console.log('   MariaDB connection is not required for basic functionality');
        console.log('   The application works completely in the browser');
    });
    
    return server;
}

// Main execution
async function main() {
    console.log('🔍 Checking system status...');
    console.log('📦 Project: Stock & Crypto Tracker');
    console.log('');
    
    const isMariaDBRunning = await checkMariaDB();
    
    if (isMariaDBRunning) {
        console.log('✅ MariaDB is available for database operations');
    } else {
        console.log('ℹ️  MariaDB is not required for frontend operation');
        console.log('   The application works completely in the browser');
    }
    
    console.log('\n📋 Available npm scripts:');
    console.log('  npm run server    - Start the development server');
    console.log('  npm run dev       - Start http-server on port 8080');
    console.log('  npm install     - Install dependencies');
    console.log('');
    
    // Start the server
    const server = startServer();
    
    // Handle server errors
    server.on('error', (err) => {
        console.error('❌ Server error:', err);
    });
}

// Run main function
main().catch(console.error);