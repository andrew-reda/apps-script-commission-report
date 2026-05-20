# Executive Commission Report Dashboard

A professional, high-contrast B2B analytics dashboard built using **Google Apps Script** integrated directly into **Google Sheets**. This tool processes structured commission data, tracks agent performance, and monitors revenue leakage in real-time.

## Features
* **Live KPI Cards:** Displays Total Commission, Total Payroll, Book of Business, New Business, and Revenue Leakage.
* **Interactive Filtering:** Filter metrics instantly by Agent, Carrier, and Classification.
* **Visual Analytics:** Breakdown of commissions by carrier and business mix using dynamic chart visualizations.
* **Performance Ranking:** Automated leaderboard tracking individual agent production and share percentage.

## Tech Stack
* **Backend:** Google Apps Script (`Code.gs`)
* **Frontend:** HTML5, CSS3, JavaScript (`Index.html`)
* **Data Source:** Google Sheets

## Data Structure Requirements
To ensure the analytics tracking engine parses your data properly without runtime syntax errors, your underlying Google Sheet tab **must** be named `Sheet1` and must match these case-sensitive column headers exactly:

| Column Header | Data Type | Sample Entry |
| :--- | :--- | :--- |
| **Agent Name** | Text | Jonathan Wood |
| **Carrier** | Text | BlueCross |
| **Plan Type** | Text | Gold PPO |
| **Commission Action** | Text | New Business |
| **Classification** | Text | Advance |
| **Client Full Name** | Text | John Doe LLC |
| **Duration Months** | Number | 12 |
| **Commission** | Currency ($) | 694400 |
| **Agent Payroll** | Currency ($) | 25000 |

### Excel Template
A starter spreadsheet with this exact required framework and clean example mock rows is included directly in this repository. You can download and import it directly into your own Google Drive to get started immediately.

## Installation & Setup

1. **Prepare Spreadsheet Data:** Create a new Google Sheet and import the provided template file layout into a tab named `Sheet1`.
2. **Open Script Editor:** Go to the top menu and select **Extensions** > **Apps Script**.
3. **Add Script Logic:** Delete any default code block inside `Code.gs` and copy-paste the entire contents of the `Code.gs` file from this repository.
4. **Create Frontend UI:** Click the `+` sign icon next to Files in the Apps Script editor, create a new **HTML** file, name it exactly `Index.html`, and paste the contents of `Index.html`.
5. **Deploy App:** Click **Deploy** > **New deployment**. Select **Web app** from the settings gear icon. Set execution access to **"Me"** and permissions access to **"Anyone"**.
6. **Authorize:** Execute the script deployment and follow the standard Google security clearance prompt to run your standalone application interface URL.

## Preview
<img width="1536" height="864" alt="Executive Dashboard" src="https://github.com/user-attachments/assets/aa550e42-21d2-436d-af0d-101c4a5202ee" />

