# Q and A App - README

## Overview
The Q and A App is a feature-rich platform for managing questions and their lifecycle. It supports features such as creating, editing, assigning, fuzzy search based on question, description or answer and viewing question histories, all wrapped in a React front-end powered by Material-UI components. The app uses modern React patterns and practices to ensure scalability and ease of maintenance.

---

## Features

### Core Features:
- **Question Management**:
  - Create questions with fields like `question`, `answer`, `tags`, `asignee` and `description`.
  - Edit existing questions via a dedicated modal.
  - Assign questions to users through a standalone modal.
  - View question history, including `createdAt`, `updatedBy`, and `content`.

- **Search and Filter**:
  - Filter questions by `tags`, `text`, or `assignee` using a custom filter input component.
  - Live search with debounced queries for better performance.


---

## Technical Details

### Tech Stack
- **React**: For building the user interface.
- **Material-UI**: To ensure a consistent and modern design system.
- **Joi**: For form validation.
- **React Context**: Used where global data sharing was required (e.g., tags and properties).


### Search Techniques
- **Debounced Search**:
  - Implemented using `useDebouncedValue` to minimize API calls while the user is typing.
  - This technique balances performance and user experience by waiting briefly for the user to finish typing before sending requests.
- **Dynamic Filters**:
  - Filters are designed to update the question list based on user inputs for tags, text, or assignee fields.

#### Reasoning:
The choice of debounced search and dynamic filters was made to ensure real-time feedback while reducing unnecessary backend load. This approach is particularly effective for apps with frequently changing search criteria and datasets.

---

## Shortcuts Taken
1. **Frontend State Management**:
   - Instead of introducing a state management library like Redux, the app relies on React Context and hooks to manage global states (e.g., tags, properties).
   - This decision simplifies the codebase, given the current app size and complexity.

2. **Limited Backend Integration**:
   - while bulk updating questions, front end makes sequential calls to back end.

3. **Simplistic Styling**:
   - Material-UI's default styling was used extensively to speed up development without custom CSS.

---

## Future Improvements
1. **State Management**:
   - Introduce Redux Toolkit or Zustand if the app scales further.

2. **Backend Integration**:
   - Integrate fuzzy search scoring mechanism.

3. **Error Handling**:
   - Improve error feedback to the user for failed API requests.

4. **Testing**:
   - Add unit and integration tests for components and hooks using tools like Jest and React Testing Library.

5. **Authorizasion**:
   - Add role based authorizasion to limit and grand different access levels for resources.

---

## Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd q-and-a-platform
   ```
3. Install dependencies:
   ```bash
   cd front-end && npm install  
   cd .. && cd backend && npm install
   ```

### Running the App

Replace both `.env` files in `front-end` and `backend` folders with keys. 


#### Running backend
Start the development server:

run follwing command in `backend` folder
```bash
npm run start-dev
```
##### ( ulternative | Docker )
If you have docker installed and running. run following command
`docker-compose up`

#### Running frontend

run follwing command in `front-end` folder
```bash
npm start
```

The front end app will be available at `http://localhost:3000`.
---

## Project steps

1. Identifing and prioratizing feature requirements
 - `question` CRUD operations
    - Create a question in back end
    - Get a question in back end
    - List Questions
    - Update and delete operations for questions
- Integrating authentication 
    - Choose auth provider
        - Auth0
    - Create and setup auth0 application
    - Setup login from front end
    - authentication from back end
- Create `tags` CRUD operations
- Create back end searching strategy
    - search text for `question` , `description` and `answer`
    - list by asignee
    - list by tags
    - decide to go with `OR` conditions given that limited questions will be handled.
- Front end dashboard list view
- Front end question create view
    - validation
- Front end question update view
- Front end question history view
- Backend question history API
- Containerize app


---

## Folder Structure `backend`
- `routes/`: Contains routes for endpoints.
- `datastore/`: Airtable connection classes
- `middlewares/`: custom middlewares.
- `pages/`: conceptual pages
- `services/`: service classes 

---

## Folder Structure `front-end`
- `components/`: Contains modular components.
- `hooks/`: Reusable hooks like `useDebouncedValue` and `useFiltersAndData`.
- `providers/`: Shared state management using React Context.
- `pages/`: conceptual pages
- `schemas/`: validation schemas

---

## Conclusion
This app demonstrates a robust architecture for managing questions in a scalable and user-friendly way. The codebase remains flexible for future enhancements.

## Video Demo
[![Video Demo](https://i.ytimg.com/vi/FD7_w2KpXvk/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBeXo04AjNhE2o_eGi_ll_5Agk9jg)](https://www.youtube.com/watch?v=FD7_w2KpXvk)

