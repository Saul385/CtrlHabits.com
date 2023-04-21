# CtrlHabits.com - Goal Tracking Web Application

> CPSC 362 Project

CtrlHabits is a web application that enables users to set and track their daily
goals. The application is designed to help users build better habits and stay
accountable towards achieving their desired outcomes.

![image](https://user-images.githubusercontent.com/95833009/220467840-f696ee14-e148-4f1e-98d0-6927bf397f78.png)

## Features

- User accounts: Users can create an account and log in to the platform.
- Goal setting: Users can create goals for different areas of their life such as
  fitness, work, personal growth, and more. They can set the frequency, target,
  and deadline for each goal.
- Heatmap visualization: The platform generates a heatmap based on the user's
  daily progress towards their goals. The heat map will visually show the
  progress of each goal with darker colors representing more progress and
  lighter colors indicating less progress.
- Progress summary: Users can see a summary of their progress towards their
  goals, including the number of days they have completed their goal, their
  average progress, and their overall success rate.
- Notifications: The platform will also send notifications to users when they
  have completed their goals or when they are falling behind.

## Purpose

CtrlHabits is designed to help users stay motivated and accountable towards
their goals, providing them with a visual representation of their progress
towards achieving their desired outcomes. Technologies

CtrlHabits is built with modern web development technologies, including:

    TEMPORARY
    React for the user interface
    Node.js and Express for the server-side
    MongoDB for the database

## Development

[![Build](https://github.com/Saul385/CtrlHabits.com/actions/workflows/build.yaml/badge.svg)](https://github.com/Saul385/CtrlHabits.com/actions/workflows/build.yaml)
[![Check](https://github.com/Saul385/CtrlHabits.com/actions/workflows/check.yaml/badge.svg)](https://github.com/Saul385/CtrlHabits.com/actions/workflows/check.yaml)
[![Format](https://github.com/Saul385/CtrlHabits.com/actions/workflows/fmt.yaml/badge.svg)](https://github.com/Saul385/CtrlHabits.com/actions/workflows/fmt.yaml)
[![Lint](https://github.com/Saul385/CtrlHabits.com/actions/workflows/lint.yaml/badge.svg)](https://github.com/Saul385/CtrlHabits.com/actions/workflows/lint.yaml)

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installation

To install and run CtrlHabits, follow these steps:

    Clone the repository from GitHub: git clone https://github.com/[repository-name].git
    Install the dependencies: npm install
    Start the server: npm start

<!-- 1. Clone the repository
1. Run `npm install` to install the dependencies
1. Run `npm start` to start the development server -->

### Environment variables

Our application uses environment variables to store sensitive information. Make a new file called `.env` in the root directory of the project and add the following variables:

```sh
DEV_FLAG_ENABLED=1

GITHUB_PROD_CLIENT="😎"
GITHUB_PROD_SECRET="😎"

GITHUB_DEV_CLIENT="😎"
GITHUB_DEV_SECRET="😎"

FIRESTORE_PROD_PROJECT_ID="😎"
FIRESTORE_DEV_PROJECT_ID="😎"

FIRESTORE_PROD_CLIENT_EMAIL="😎"
FIRESTORE_DEV_CLIENT_EMAIL="😎"

FIRESTORE_PROD_PRIVATE_KEY="😎"
FIRESTORE_DEV_PRIVATE_KEY="😎"
```

### Deployment

The website is deployed to [Vercel](https://vercel.com/) and automatically
builds and deploys when changes are pushed to the `main` branch.

## Usage

Once the server is running, you can access CtrlHabits in your web browser at
http://localhost:3000. From there, you can create an account and start setting
and tracking your goals.

## License

CtrlHabits is released under the [MIT License](LICENSE).
