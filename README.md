# ContractFlow - Contract Management Platform

![Dashboard Preview](/public/dashboard-preview.png)

A robust, frontend-based Contract Management Platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This application enables users to design contract blueprints, generate contracts from templates, and manage the full lifecycle from drafting to final signature.

---

## 🚀 Key Features

* **Blueprint Builder:** Create reusable contract templates with dynamic fields (Text, Date, Checkbox, Signature).
* **Contract Generation:** Instantly instantiate new contracts from saved blueprints.
* **Lifecycle Management:** Strict state machine implementation (`Created` → `Approved` → `Sent` → `Signed` → `Locked`).
* **Smart Dashboard:** High-density grid view with status filtering and real-time metric cards.
* **Mock Persistence:** Data is persisted locally using `localStorage` to simulate a real backend environment.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
* **Language:** TypeScript (Strict typing for `Contract` and `Blueprint` interfaces)
* **Styling:** Tailwind CSS (Grid layouts, hover states, and responsive design)
* **State Management:** React Context API
    * *Decision:* Chosen over Redux to reduce boilerplate while maintaining a clean, centralized store (`AppContext`) for the contract lifecycle logic.

---

## 📂 Project Structure

The project follows a modular, component-based architecture:

```text
contract-platform/
├── app/
│   ├── blueprints/       # Blueprint creation routes
│   ├── contracts/        # Contract management routes
│   ├── layout.tsx        # Global layout (Navbar, Providers)
│   └── page.tsx          # Main Dashboard with metrics
├── components/
│   ├── ContractList.tsx  # Reusable grid table component
│   └── Navbar.tsx        # Global navigation
├── context/
│   └── AppContext.tsx    # Central store for Logic & State
├── types/
│   └── index.ts          # Shared TypeScript interfaces
└── public/
    └── dashboard-preview.png
```
---

## 🏃‍♂️ How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd contract-platform
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚠️ Assumptions & Design Decisions

* **Data Persistence:** The app uses `localStorage`. Clearing your browser cache will reset the app state.
* **Validation:** Basic field validation is implemented (e.g., ensuring a Blueprint has fields before saving).
* **Lifecycle Rules:** As per requirements, a contract cannot be edited once it reaches the `Locked` state.
* **UI/UX:** A high-density "Enterprise SaaS" design system was chosen over a simple layout to demonstrate product thinking.

---
*Built for Frontend Assessment Task*
