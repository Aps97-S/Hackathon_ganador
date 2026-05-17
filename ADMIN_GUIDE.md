# Stock & Cryptocurrency Tracker - Admin Guide

## Overview

This guide provides system administrators with instructions for deploying, maintaining, and managing the Stock & Cryptocurrency Tracker application. The application is a client-side solution built with HTML, CSS, and JavaScript.

## System Requirements

### Hardware Requirements
- Any modern computer or server capable of running a web browser
- Minimum 512MB RAM (recommended 1GB+)
- 10MB available disk space for application files

### Software Requirements
- Web server (Apache, Nginx, or simple HTTP server)
- Modern web browser for testing
- Git (for version control and updates)

## Installation Instructions

### Prerequisites
```bash
# Install a web server (example using Apache on Ubuntu/Debian)
sudo apt update
sudo apt install apache2

# Or use Node.js http-server for quick testing
npm install -g http-server
```

### Deployment Steps
1. **Download the Application**:
   ```bash
   # Clone or download the repository
   git clone <repository-url>
   cd stock-crypto-tracker
   ```

2. **Copy Files to Web Server Directory**:
   ```bash
   # Copy files to web server root (e.g., /var/www/html/)
   sudo cp -r ./* /var/www/html/
   
   # Or for local testing, simply place files in a folder
   ```

3. **Set Proper Permissions**:
   ```bash
   # Ensure web server can read files
   sudo chown -R www-data:www-data /var/www/html/
   sudo chmod -R 755 /var/www/html/
   ```

## Running the Application

### Local Testing
```bash
# Method 1: Using Python's built-in HTTP server (if available)
python3 -m http.server 8000

# Method 2: Using Node.js http-server
http-server

# Method 3: Using Apache/Nginx (configure virtual host as needed)
```

### Production Deployment
1. Configure your web server:
   ```apache
   # Example Apache configuration
   <VirtualHost *:80>
       DocumentRoot /var/www/html/
       ServerName stocktracker.example.com
       
       <Directory "/var/www/html/">
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

2. Restart web server:
   ```bash
   sudo systemctl restart apache2  # Ubuntu/Debian
   sudo systemctl restart nginx    # CentOS/RHEL
   ```

## File Structure

```
stock-crypto-tracker/
├── index.html          # Main application page
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── USER_GUIDE.md       # User documentation
└── ADMIN_GUIDE.md      # Admin documentation
```

## Configuration Options

### Browser Storage
The application uses browser's local storage to persist alerts between sessions. This requires no server-side configuration.

### Security Considerations
- Since this is a client-side application, there are no server-side security concerns
- All data processing happens in the user's browser
- No sensitive information is stored on servers

## Maintenance and Updates

### Regular Maintenance Tasks
1. **Monitor Application Performance**:
   ```bash
   # Check if web server is running
   sudo systemctl status apache2
   
   # Monitor disk space
   df -h
   ```

2. **Update Application Files**:
   ```bash
   git pull origin main
   # Or download updated files manually
   ```

3. **Backup Configuration** (if any):
   ```bash
   # No configuration files needed for this application
   ```

### Updating the Application
```bash
# Navigate to application directory
cd /var/www/html/

# Pull latest version from repository
git pull origin main

# Or replace files manually with updated versions
```

## Monitoring and Logging

### Application Monitoring
Since this is a client-side application:
- No server logs to monitor
- User interaction can be tracked through browser analytics if integrated
- Performance monitoring should focus on web server performance

### Performance Optimization
1. Ensure web server is configured for static file delivery
2. Consider enabling GZIP compression for CSS/JS files
3. Monitor browser console for JavaScript errors

## Troubleshooting

### Common Issues and Solutions

#### 1. Application Not Loading
**Symptoms**: Blank page or "File not found" error
**Solution**:
```bash
# Check file permissions
ls -la /var/www/html/

# Verify files exist
ls -la /var/www/html/index.html

# Restart web server
sudo systemctl restart apache2
```

#### 2. JavaScript Not Working
**Symptoms**: No live updates, alerts not working
**Solution**:
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled in the browser
- Verify all files are properly copied and accessible

#### 3. Alerts Not Persisting
**Symptoms**: Alerts disappear after page refresh
**Solution**:
```bash
# Check if local storage is enabled in browser
# This is a browser-level issue, not application issue
```

## Security Best Practices

### For Web Server Security
1. **Keep Web Server Updated**:
   ```bash
   sudo apt update && sudo apt upgrade
   ```

2. **Secure File Permissions**:
   ```bash
   # Make files readable but not executable
   sudo chmod 644 /var/www/html/*.html
   sudo chmod 644 /var/www/html/*.css
   sudo chmod 644 /var/www/html/*.js
   ```

3. **Enable HTTPS** (recommended):
   ```bash
   # Install Let's Encrypt certificate
   sudo apt install certbot python3-certbot-apache
   sudo certbot --apache -d stocktracker.example.com
   ```

## Backup and Recovery

### Application Backup
```bash
# Create backup of application files
tar -czf stock-tracker-backup-$(date +%Y%m%d).tar.gz /var/www/html/

# Or using rsync
rsync -avz /var/www/html/ backup-location/
```

### Recovery Process
1. Copy backup files to web server directory
2. Restore proper file permissions
3. Restart web server if needed

## Performance Tuning

### Web Server Optimization
1. **Enable Compression**:
   ```apache
   # Add to Apache configuration
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/css application/javascript
   </IfModule>
   ```

2. **Cache Static Files**:
   ```apache
   # Add to Apache configuration
   <FilesMatch "\.(css|js)$">
       Header set Cache-Control "max-age=31536000, public"
   </FilesMatch>
   ```

## Future Enhancements for Admins

### Integration Capabilities
1. **API Integration**:
   - Connect to real financial data feeds
   - Implement authentication and secure API calls

2. **Database Integration**:
   - Store user preferences in database
   - Implement user account management
   - Add analytics and reporting features

3. **Notification Systems**:
   - Email/SMS alert integrations
   - Push notification capabilities

## Compliance and Legal Considerations

### Data Privacy
- No personal data is collected or stored on servers
- All data processing happens in the user's browser
- No server-side logging of user activities

### Terms of Service
- The application is provided "as is"
- No warranty for accuracy of data or functionality
- Users are responsible for their own investment decisions

## Contact Information

For support and questions regarding this application, contact:

[Your Organization]
Email: admin@stocktracker.example.com