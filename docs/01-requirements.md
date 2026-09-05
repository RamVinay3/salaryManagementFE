# Salary Management System --- Requirements

## Goal

Build a web-based salary management system for an HR Manager responsible
for approximately 10,000 employees across multiple countries, replacing
spreadsheet-based salary management with a centralized application.

## Scope

-   Employee list with search, department/country filters, and
    server-side pagination.
-   Add, edit, view, and delete employees.
-   View current salary and maintain effective-dated salary history.
-   Dashboard with employee and salary statistics.
-   Salary Insights with employee count, minimum, average, maximum, and
    highest-paid employees.
-   Light/dark theme.

## Currency Rule

Salary amounts are never compared across currencies. Salary statistics
are grouped by **country + currency**. No exchange-rate assumption is
introduced.

## Deliberately Out of Scope

-   Authentication/authorization
-   Payroll processing
-   Tax calculation
-   Benefits management
-   Currency conversion
-   Salary forecasting
-   Full employee-field audit history
-   Real-time notifications

## Success Criteria

The application is fully functional end-to-end, maintainable,
deployable, and suitable for the target 10,000-employee dataset.
