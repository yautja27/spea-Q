# spea-Q – Google Meet Chrome Extension

Speak Queue is a Chrome extension designed to bring structure to discussions in Google Meet by introducing a real-time speaking queue.  

It helps avoid interruptions and confusion when multiple participants attempt to speak simultaneously.

This project was **conceptualized and developed independently around July–August 2025**, before Google Meet introduced any native speaking queue or hand-raise ordering features.  
It was built as an exploration of user experience challenges in virtual meetings and real-time collaboration systems.

---

## ✨ Features

- Join and leave a speaking queue
- First participant automatically becomes the host
- Host can remove participants or clear the entire queue
- Real-time synchronization across participants
- Visual indication of the current speaker
- UI appears only after joining an active Google Meet call
- Lightweight, non-intrusive interface

---

## 🧠 Motivation & Background

During frequent online meetings, a recurring issue was observed where multiple participants would unmute and speak at the same time, leading to interruptions and lost discussion flow.

Speak Queue was built to address this problem by:
- Introducing an explicit speaking order
- Giving participants clarity on when to speak
- Reducing hesitation and overlap during discussions

The implementation predates Google Meet’s later introduction of similar native capabilities and represents an **independent, user-driven solution** built without access to internal Google APIs.

---

## 🛠 Tech Stack

- **JavaScript**
- **Chrome Extension APIs**
- **Supabase** (Realtime database)
- **Vite** (Build tool)

---

## 📂 Project Structure

