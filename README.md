# Webapp

## Rulebook

1. Modular Design: Each element on the dashboard should be a self-contained Svelte component. Aim to make components reusable and decoupled.
2. Configurable Properties: Components should accept props for configuration, such as text, enabling them to be reused in different contexts with different data.
3. Scoped Styling: Each component should have its own scoped CSS using Tailwind. Styles should be isolated to prevent any unintended side-effects in other components.
4. CSS Classes: Define common styles using Tailwind utility classes. Once the styling is done, create custom classes that encapsulate these styles and apply them to the relevant components.
5. Testing: Use the Svelte Testing Library to write tests for each component. Ensure that the tests cover the functionality of the component and any edge cases.
6. Page Composition: Pages should be created using the pre-designed and tested components. Pages are high-level components and should be placed in a separate directory named pages.
7. Directory Structure: Keep a clean directory structure that separates components, pages, styles, utilities, stores, and tests. This will make the project easier to navigate and maintain.
8. Documentation: Document each component with comments explaining its purpose, accepted props, and usage examples.
9. State Management: Utilize Svelte’s store for managing state that needs to be shared across components. This helps in creating a single source of truth for your application’s state.
10. Error Handling and Loading States: For components that fetch data, handle loading states and errors gracefully. Display loaders when fetching data and provide feedback when an error occurs.
11. Responsive Design: Make components responsive using media queries and Tailwind’s responsive design utilities. Ensure that the dashboard looks and functions well on all screen sizes.
12. Lazy Loading: To improve performance, especially in large applications, use Svelte’s dynamic imports to lazy load components. This means loading components only when they are actually needed, which can significantly reduce initial loading times. Use svelte:component with dynamic expressions to accomplish this.
13. Debouncing and Throttling: When handling events, especially input or scroll events, debounce or throttle them to improve performance. This prevents excessive function calls in a very short period of time.
14. Performance Monitoring: Continuously monitor the performance of the application. Tools like Lighthouse can help in analyzing the performance and suggesting improvements.
15. Avoid Logic Inside Components: Components should primarily be responsible for rendering UI. Keep any complex logic outside of the components, preferably in utility functions or services. This will keep the components clean and focused on presentation, making them easier to maintain and test.

## Directory structure

```
app/
├── src/
│   ├── components/
│   │   ├── Card/
│   │   │   ├── Card.svelte
│   │   │   ├── Card.module.css
│   │   │   └── Card.test.js
│   │   ├── Chart/
│   │   │   ├── Chart.svelte
│   │   │   ├── Chart.module.css
│   │   │   └── Chart.test.js
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.svelte
│   │   │   └── Dashboard.module.css
│   │   └── ...
│   ├── utils/
│   │   ├── api.js
│   │   ├── helpers.js
│   │   └── ...
│   ├── store/
│   │   ├── index.js
│   │   └── ...
│   └── main.js
├── public/
│   └── ...
├── package.json
├── tailwind.config.js
└── ...
```

## Set up environment variables

- Create a `.env` file in the root directory and paste below environemt variable value in that file, otherwise app wouldn't run as it will have no backend API url

```
VITE_ONE_BACKEND_API="https://app-api.one-track.io/"
```

## Build

```
npm install
npm build
```

# Run

Development:

```
npm run preview
```

Production:

```
npm start
```

## To pick up file name case changes

```
git config core.ignorecase false
```
