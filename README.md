# Email Automation Tool

## Overview

The Email Automation Tool is a Node.js application that connects to Gmail using OAuth2, reads incoming emails, categorizes them based on content, and sends automated replies using OpenAI. The tool utilizes BullMQ for task scheduling and is built using TypeScript.

## Features

- Connect to Google email accounts using OAuth2.
- Read incoming emails.
- Categorize emails based on content into categories such as:
  - Interested
  - Not Interested
  - More Information
- Automatically generate and send appropriate replies using OpenAI.

## Prerequisites

- Node.js v14.x or later
- TypeScript
- Google API credentials (`credentials.json`)
- OpenAI API key

## Installation

1. Clone the repository:

```
git clone https://github.com/Rishikarathore0601/email-automation-tool.git
cd email-automation-tool
```
## Install the dependencies:
```
npm install
```
#### Create a credentials.json file in the root directory with your Google API credentials:
```
{
  "installed": {
    "client_id": "YOUR_CLIENT_ID",
    "project_id": "YOUR_PROJECT_ID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uris": ["YOUR_REDIRECT_URI"]
  }
}
```
### Create a .env file in the root directory with the following content:
```
OPENAI_API_KEY=your_openai_api_key
```
## Configuration

Update src/googleAuth.ts with your OAuth2 configuration for Google.

## Building the Project

Compile the TypeScript code to JavaScript:

```
npx tsc
```
Running the Project
Start the server:


```
node dist/server.js
```
## Usage

Open your browser and navigate to http://localhost:3000.
Use the /add-email endpoint to add an email to the processing queue.
Example:

```
curl -X POST http://localhost:3000/add-email \
  -H "Content-Type: application/json" \
  -d '{
        "emailContent": "Hi, I am interested in your product.",
        "emailProvider": "google",
        "authCode": "your_google_auth_code"
      }'
```


## Acknowledgements

Express
BullMQ
Google APIs Node.js Client
OpenAI API
## License

This project is licensed under the MIT License.
```

This `README.md` file focuses on the setup, configuration, and usage of the tool with Google Gmail and OpenAI, leaving out the Outlook implementation. Adjust paths and URLs as necessary for your specific project setup.
```
