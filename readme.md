# Salary Management System — Requirements

## 1. Goal

Build a web-based salary management system for ACME's HR team to replace the current Excel-based process for managing salary information across approximately 10,000 employees in multiple countries.

The system should allow an HR Manager to efficiently manage employee salary data and answer common questions about how the organization compensates its employees.

## 2. Primary User

**HR Manager**

The initial version is designed for HR users who need to view, search, analyze, and update employee salary information.

## 3. Scope

### Employee Management

* View a paginated list of employees.
* Search employees by name, employee ID, or other relevant identifying information.
* Filter employees by country and department.
* View detailed employee information and current salary.
* Update an employee's salary information.
* Validate salary inputs before saving changes.

### Salary Insights

**Provide** HR with useful organization-level salary information, including:

* Total number of employees.
* Average salary.
* Minimum and maximum salary.
* Salary information by country.
* Salary information by department.
* Identification of the highest-paid employees.
* Filtering salary insights based on available employee attributes.

The system should perform aggregation at the database level where appropriate rather than loading all employee records into the application.

### Data & Performance

* Provide seed data for approximately 10,000 employees.
* Use Oracle Database as the relational persistence layer, accessed through Hibernate/JPA.
* Use pagination for employee lists.
* Add appropriate database indexes for frequently searched or filtered fields.
* Ensure common operations remain responsive as the dataset grows.

### Quality

* Maintain a clean separation between controllers, business logic, persistence, and data-transfer models.
* Add unit tests covering important business logic.
* Handle validation and application errors consistently.
* Maintain incremental Git commits that demonstrate the development process.

## 4. Out of Scope

The following are deliberately excluded from the initial version:

**Authentication and authorization**
The assessment focuses on salary-management functionality rather than implementing a complete identity-management system. The initial application assumes an authenticated HR Manager.

**Payroll processing**
The system manages salary information but does not calculate payroll, deductions, taxes, benefits, or generate payslips.

**Employee self-service**
Employees will not have their own portal or ability to modify their salary information.

**Salary history and audit workflow**
The first version focuses on current salary management. A full salary-history/audit workflow can be added later if required.

**Complex approval workflows**
Salary changes will not require multi-level approval in the initial version.

**Notifications**
Email, SMS, and other notifications are outside the initial scope.

**Advanced analytics and reporting**
The system will provide practical salary insights but will not initially include a full business-intelligence or reporting platform.

## 5. Key Engineering Decisions

The application will use a straightforward end-to-end architecture appropriate for the problem size:

** Angular + TypeScript → Spring Boot → Hibernate/JPA → Oracle Database

The design will favor simplicity and maintainability over unnecessary distributed-system complexity. The dataset of 10,000 employees is large enough to require pagination, indexing, and efficient queries, but does not justify introducing microservices or other distributed infrastructure for this assessment.

AI tools will be used throughout development to accelerate implementation, identify potential bugs and code-quality issues, generate or improve tests, and assist with design exploration. AI-generated output will be reviewed for correctness, performance, maintainability, and security before being accepted.
