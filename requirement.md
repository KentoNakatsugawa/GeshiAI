# Requirements Definition: Geshi AI

**Project Name:** Geshi AI (Virtual Seating & Sales Visualization System)
**Target UI Language:** Japanese (All labels, menus, and data content must be in Japanese)
**Version:** 1.0

---

## 1. Project Overview
Development of "Geshi AI," a system that replicates an office or venue layout to visualize real-time sales discussion statuses.

**Core Objective:**
Enable managers to grasp the overall situation at a glance (via Virtual Seating) and access detailed metrics (via Matrix View) through an intuitive interface.

---

## 2. Functional Requirements

### 2.1 Top Page (Virtual Seating Dashboard)
**Overview:**
A visual dashboard mimicking the physical seating arrangement of the office/venue.

**UI Elements (Per Seat Card):**
The interface must use the following Japanese labels:

* **Customer Name (顧客名):** Name of the client company or representative.
* **Meeting Time (商談時間):** Start time and elapsed duration.
* **Representative Name (担当者名):** Internal sales staff assigned.
* **Customer Hotness (HOT度):** Visual indicator of customer interest/temperature (S, A, B, C, D, E).
* **Status (行動):** Current phase of the negotiation.

**Interaction:**
* **Click Event:** Clicking a specific seat card transitions the user to the **Sales Detail Page** (or opens a detailed modal).

### 2.2 Sales Detail Page (Matrix View)
**Overview:**
A detailed analytical view for individual sales discussions based on a specific matrix structure.

**UI Elements:**
* **Matrix Visualization (商談マトリックス):**
    * **Vertical Axis (Y-Axis):** **HOT度** (Hotness)
        * Levels: **S, A, B, C, D, E**
    * **Horizontal Axis (X-Axis):** **行動** (Action/Status)
    * **Columns (Ordered from Left to Right as per UI layout):**
        1.  **クロージング** (Closing)
        2.  **入金確認** (Payment Confirmation)
        3.  **納車流れ** (Vehicle Delivery Flow)
        4.  **初期スコア車両提示** (Initial Score Vehicle Presentation)
        5.  **スコアプレゼン** (Score Presentation)
        6.  **ヒアリング** (Hearing)
        * *Note: Visual layout lists these columns left-to-right. Logical process flow typically moves from Hearing to Closing.*
    * **Cell Data:** Displays the count of customers (e.g., "15人", "3人") in each intersection.

* **Detailed Information Area:**
    * Meeting history, notes, and next actions.

**Features:**
* View negotiation history.
* Update status (行動) and hotness level (HOT度).

---

## 3. Design Guidelines

### 3.1 Concept & Reference
* **Reference Website:** "Daredemo Noreru" (Service Website).
* **Keywords:** Accessible, Clear, Modern, Trustworthy.
* **Style:** Modern UI based on established design systems (Google Material Design, Apple HIG), prioritizing whitespace and readability.

### 3.2 Color Palette
Based on the reference site ("Daredemo Noreru"):

| Type | Color | Usage |
| :--- | :--- | :--- |
| **Corporate Color** | **Vivid Blue** | Main visuals, primary action buttons, highlights. |
| **Support Color 1** | **White** | Backgrounds, card bases (cleanliness, whitespace). |
| **Support Color 2** | **Black / Dark Grey** | Main text, headings (readability). |
| **Support Color 3** | **Light Grey** | Sub-text, borders, background accents. |

### 3.3 Typography
* **Font Family:** **Noto Sans JP** (Google Fonts).
* **Characteristics:** Round, modern, and highly legible Gothic script to ensure a friendly yet professional tone.

### 3.4 UI Components
* **Buttons:**
    * **Shape:** Rounded Rectangles or Pill-shaped (emphasizing accessibility).
    * **Style:** Flat design or subtle drop shadows.
* **Icons:**
    * **Style:** Simple, flat SVG icons. Medium stroke width.
* **Layout:**
    * **Whitespace:** Generous margins and padding to prevent information overload.
