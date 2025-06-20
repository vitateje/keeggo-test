
# 🚀 Automation Keeggo - Cypress and Cucumber

Automated end-to-end (E2E) testing project using **Cypress** with **Cucumber (BDD)** to ensure quality and reliability of web applications.

---

## ✅ Requirements

For development, you will only need **Node.js** and **Yarn** installed in your environment.

### 🔧 Node.js Installation

- #### Windows
- Download the installer from the [official Node.js website](https://nodejs.org/).
- Make sure to have `git` available in your PATH — [Download Git here](https://git-scm.com/).

- #### Ubuntu
```bash
sudo apt install nodejs
sudo apt install npm
```

- #### Other Operating Systems
Check the [Node.js official website](https://nodejs.org/) and the [NPM official website](https://npmjs.org/) for installation guides.

### ✅ Verify Installation
```bash
node --version
npm --version
```

### 🔄 Update NPM (if needed)
```bash
npm install -g npm
```

---

### 📦 Yarn Installation
```bash
npm install -g yarn
```

---

## 🚀 Install Project Dependencies

```bash
git clone <your-repository-url>
cd keeggo
npm install
```

---

## 🔧 Configure Environment Variables

- Set the environment variables in the `cypress.env.json` file.
- You can use the provided `cypress.env.json-sample` as a reference.

---

## ▶️ Run Tests

### 🧪 Run Tests with Default Settings

```bash
npm test
```

### 🧪 Run Tests with Report Generation

```bash
npm run test:e2e:report
```

---

## 📜 Testing Strategy

Our testing strategy focuses on ensuring high-quality, reliable testing by combining modern practices:

- ✅ **Behavior-Driven Development (BDD)**  
   Using **Cucumber** with `.feature` files written in **Gherkin syntax** for clear, business-readable scenarios. This enhances collaboration between technical and non-technical stakeholders.

- ✅ **Page Object Model (POM)**  
   Test code follows the **POM pattern**, encapsulating UI elements and interactions, improving maintainability and readability.

- ✅ **Comprehensive Reporting**  
   After execution, **Mochawesome HTML reports** are generated with detailed test results, execution time, and screenshots on failures.

- ✅ **Focus on User Flows**  
   Tests validate critical **end-to-end user journeys**, ensuring that main functionalities work as expected from the user's perspective.

---

## 🗂️ Project Structure (Example)

```
cypress/
├── e2e/
│   ├── tests/         # Test Scenarios (.feature files and step definitions)
│   ├── pages/         # Page Object Models
│   ├── support/
│   │   ├── commands.js
│   │   ├── e2e.js
│   │   └── utils/     # Utility functions (dateUtils, apiUtils, etc.)
│   └── fixtures/      # Test data
├── reports/           # Mochawesome reports
cypress.config.js      # Cypress configuration
package.json
```

---

## 🔥 Utils Pattern

To keep the project clean and reusable, common utilities are placed inside `cypress/support/utils`.

### 🔧 Examples of utils:

- **dateUtils.js** — Date manipulation helpers.
- **apiUtils.js** — API setup/cleanup helpers.
- **stringUtils.js** — String manipulation utilities.
- **fileUtils.js** — File read/write helpers.

These help maintain clean, DRY, and scalable code.

---