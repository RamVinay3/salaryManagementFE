# Architecture

## High-Level Architecture

``` mermaid
flowchart LR
    User[HR Manager] --> FrontEnd[Angular UI]
    FrontEnd -->|HTTP / JSON| API[Spring Boot REST API]
    API --> SVC[Service Layer]
    SVC --> JPA[JPA / Hibernate]
    JPA --> DB[(Oracle)]
```

## Frontend

``` text
Angular
├── Core
│   ├── Models
│   └── Services
├── Layout
├── Dashboard
├── Employees
│   ├── List
│   ├── Details
│   ├── Form
│   └── Salary
└── Salary Insights
```

## Backend

``` text
Spring Boot
├── Controller
├── Service
├── Repository
├── Entity
├── DTO
└── Global Exception Handler
```

## Statistics Flow

``` text
Dashboard / Salary Insights
          |
          v
 GET /api/statistics
          |
          v
 StatisticsController
          |
          v
 StatisticsService
       /             v         v
EmployeeRepo  SalaryRepo
       \       /
        \     /
         Oracle
```

Business rules and organization-level aggregation remain in the backend;
Angular focuses on presentation and interaction.
