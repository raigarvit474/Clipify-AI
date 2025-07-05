
# PodClipper-AI

>Convert full-length podcasts into **viral vertical clips** powered by AI.  
> Powered by **WhisperX**, **Gemini**, **FFmpegCV**, **Modal**, **FastAPI**, **Next.js**, and more.

## 📽 Overview

**AI Podcast Clipper** is a full-stack AI-powered SaaS tool designed to turn podcast videos into bite-sized, vertical, engaging shorts ready for platforms like TikTok, Instagram Reels, and YouTube Shorts.

---

## 🧠 Features

- 🎬 Auto-detection of viral moments (stories, jokes, questions)
- 📝 Accurate transcription via WhisperX
- 🎯 Speaker-focused face tracking
- 📱 Mobile-optimized vertical video rendering
- 🔤 Subtitle overlay
- ⚡ GPU-powered processing via Modal
- 📊 Queue system using Inngest
- 💳 Stripe-based credit packs
- 🧾 FastAPI-powered processing API
- 👤 Auth.js authentication
- 🌐 Modern responsive frontend using Next.js 15, ShadCN UI & Tailwind CSS
- ☁️ AWS S3 storage integration

---

## 🧩 Project Structure
```
├── PodClipper-AI-Backend (# FastAPI + AI pipeline (WhisperX, Gemini, FFmpegCV)
├── PodClipper-AI-Frontend (# Next.js 15 app with Inngest queue and dashboard)
```


---
# Setup
Follow these steps to install and set up the project.

## Clone the Repo

```bash
git clone https://github.com/raigarvit474/PodClipper-AI.git
```

## 🔧 Backend Setup

> Located in `/PodClipper-AI-Backend`

This is the core of the AI pipeline, powered by FastAPI and run on **Modal's GPU cloud**.

Move to the backend folder
```bash
cd PodClipper-AI-Backend
```

### Install Python
Download and install Python 3.12 if not already installed.

Create a virtual environment with Python 3.12.

### 📦 Dependencies
Run the following command to install the required python Libraries
```bash
pip install -r requirements.txt
```

Clone the LR-ASD repo into the backend folder and rename it
```bash
git clone https://github.com/Junhua-Liao/LR-ASD.git
mv LR-ASD asd
```

### 💼 Environment Variables (Modal)

Set these secrets in your Modal environment:

- `AUTH_TOKEN`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `GEMINI_API_KEY`

### 🚀 Modal Integration
Run and deploy your backend with Modal:

#### Modal Setup:
```bash
modal setup
```

#### Run on Modal:
```bash
modal run main.py
```

#### Deploy backend:
```bash
modal deploy main.py
```
Save the deployed link somewhere as this is the `PROCESS_VIDEO_ENDPOINT` environment variable on the frontend


## 💻 Frontend Setup

Located in `/ai-podcast-clipper-frontend`

Built with Next.js 15, TailwindCSS, ShadCN UI, Inngest, and Auth.js.

### Move to the Frontend folder
```bash
cd PodClipper-AI-Frontend
```

### 📁 Environment Variables
Refer to .env.example to set up your local .env file.

### 📦 Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 🔄 Start Development Server
```bash
npm run dev
```

### 🧃 Inngest Queue Dev Server
```bash
npm run inngest-dev
```
This queue handles all the long-running AI operations asynchronously in the background, using event-driven execution.

## AWS Setup

CORS policy for S3 bucket:

```bash
[
    {
        "AllowedHeaders": [
            "Content-Type",
            "Content-Length",
            "Authorization"
        ],
        "AllowedMethods": [
            "PUT"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ],
        "MaxAgeSeconds": 3600
    }
]
```

IAM user policy to upload, download and list bucket items:

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": "[S3 ARN here]"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "[S3 ARN here]/*"
        }
    ]
}
```

## 🧠LLM for viral moment identification

[Create an API key for Gemini](https://ai.google.dev/gemini-api/docs/quickstart?lang=python)

## 🎞Videos used for testing

[MI6 Secret Agent Talks About the World's Darkest Secrets](https://www.youtube.com/watch?v=-vMgbJ6WqN4)

[Janney Sanchez | Therapy saved my life, From Rivera to Sanchez , Living in my Moms Shadow | Ep.198](https://www.youtube.com/watch?v=SOG0GmKts_I)
