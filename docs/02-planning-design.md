# Planning and Design Notes

## Incremental Implementation

1.  Project and repository foundation.
2.  Angular application shell and theme.
3.  Employee CRUD, search, filtering, and pagination.
4.  Salary management and history.
5.  Dashboard and backend statistics.
6.  Currency-aware Salary Insights.
7.  Exception handling, test hardening, and production build
    verification.

## Key Decisions

-   Employee pagination/search/filtering is server-side.
-   Current salary is the salary record with the latest effective date.
-   Salary statistics use country + currency grouping.
-   Organization-wide statistics are calculated by the backend.
-   Git commits are used as incremental checkpoints.

## Future Improvement

The dashboard's recent-employee salary data currently uses a small
employee page plus current-salary requests. A production optimization
could provide one aggregate endpoint to avoid multiple requests.
