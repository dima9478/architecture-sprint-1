# Sprint 1 Project

## Task 1 - Mesto project
### Overview
To break the monolithic frontend into micro-frontends, the **Webpack Module Federation** framework was chosen for composition. The decision was based on the assumption that using only React would be sufficient to ensure a seamless user experience. Module Federation allows full management of individual components while controlling shared dependencies, preventing potential library conflicts. This approach enables each team to work with familiar versions of dependencies without disruptions.

### Micro-Frontend Strategy
A total of **three micro-frontends (MFEs)** with functional components were developed, along with a **host application** that integrates them into a unified experience. The primary design strategy applied was **vertical slicing**, based on **Domain-Driven Design (DDD)** principles. Also isolation principe was applied

**Points**
- Each team focuses on its own business process and maintains completed functionality.
- Every MFE interacts only with its specific API endpoints, reducing interdependencies.
- Teams can perform comprehensive CRUD cycle testing on their own components.
- For isolation terms teams maintain separate styling, even if shared styling rules exist and all library dependencies.
- Some business processes may have higher loads (e.g., card management). This approach enables targeted scaling to optimize performance.
- Extracting popups to separate MFE is not good as it violates DDD patterns, making API interdependencies and testing challenges, base popup component can be used as shared dependency instead
- Union of auth and profile processes can lead to deterioration of organizational flexibility and app resilience
- Further MFE splitting can lead to logic and api dependencies
- Likes are depend on card and are its inner components, they don't have a lot of logic. Extracting Likes MFE can just complicate system

---

## Micro-Frontends

### **1. Host Application**
- **Port**: `8080`
- **Purpose**: The host serves as the **entry point** for the frontend and does not interact with the backend API to avoid unnecessary dependencies with server-side changes. Other MFEs are not aware of routing so potential conflicts can be avoided
- **Components**:
    - `Header`
    - `Footer`
    - `ProtectedRoute`
    - `Main`
- **Peculiarities**:
    - Manages global routing, ensuring that individual MFEs remain route-agnostic, preventing conflicts.
    - Manages all components that are common for all frontend application and are not functionally specific
    - Stores global user data, accessible by multiple MFEs to streamline component coordination**.

#### **Run Command**
```sh
$ cd frontend/microfrontend/host && npm start
```

---

### **2. Authentication Micro-Frontend**
- **Port**: `8081`
- **Purpose**: Manages all authentication and authorization processes.
- **Components**:
    - Login Component
    - Registration Component
    - Info Tooltip (displays login/registration status based on user actions)
    - `SignOutButton` (encapsulates JWT removal logic, was extracted from header as it is closely related to these business processes)
- **Extracting prerequisites**:
    - The authentication/registration processes can be tested independently.
    - The system remains operational even if this MFE fails (after login).
    - Components use separate part of API in `auth.js` file, and this functionality doesn't touch profile management and user data (only jwt)
    - Components are displayed similarly (have similar styles)
    - Isolating this MFE allows the team to focus on the access algorithms

#### **Run Command**
```sh
$ cd frontend/microfrontend/auth && npm start
```

---

### **3. Profile Management Micro-Frontend**
- **Port**: `8082`
- **Purpose**: Manages user data, including profile editing and display.
- **Components**:
    - `ProfilePanel` (displays user data & avatar)
    - Profile Edit Popup
    - Avatar Edit Popup
- **Extracting prerequisites**:
    - MFE fully encapsulates the user profile management business process.
    - Uses a dedicated backend API for user data.
    - Despite the fact that user data have to be shared among other MFE (cards), this issue was solved by using event bus.An event-based communication layer prevents redundant API calls and allows for simple communications between components while keeping them isolated
    - Enables isolated testing of user data interactions.
    - All components are closely related, profile panel interaction can lead to editing popups opening

#### **Run Command**
```sh
$ cd frontend/microfrontend/profile && npm start
```

---

### **4. Cards Management Micro-Frontend**
- **Port**: `8083`
- **Purpose**: Handles **image card management** as a standalone business process. Uses user data for internal logic provided by host application
- **Components**:
    - `Card` (single image card)
    - `CardList` (displays and manages multiple cards)
    - Image Popup (for viewing enlarged images)
    - New Card Popup
    - `AddPlacePanel` (triggers the new card popup, displayed nearby profile information in host)
- **Extracting prerequisites**:
    - Can implement targeted scaling due to potentially high processing demands.
    - Uses only the card-related backend API, ensuring business process isolation.
    - Despite the fact that the button for adding a card in the monolith (and therefore the popup itself) was part of the profile panel, it was decided to separate it to match the new structure with DDD patterns. Its allocation to this MFE allows to test the entire business process, and also eliminates the dependence of the profile management MFE on a backend API that is not associated with it.

#### **Run Command**
```sh
$ cd frontend/microfrontend/cards && npm start
```

---

- The application has configured routing, but development is not yet complete.
- Only the first two implementation levels have been fully completed.

---

## Task 2 
[Microservice Diagram File](https://drive.google.com/file/d/1g9u9eSK02Uyo1VqzHHHZyuVGdma6pPuu/view?usp=sharing)

[Open in draw.io viewer](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=arch_template_task2%20(1).drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1g9u9eSK02Uyo1VqzHHHZyuVGdma6pPuu%26export%3Ddownload)