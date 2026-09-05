# AI Usage and Engineering Trade-offs

## AI Usage

AI was used as an engineering accelerator. Suggestions were reviewed
against requirements, API contracts, database behavior, and runtime test
results.

## Representative Prompts

> Design a production-style employee salary management application using
> Angular, Spring Boot, JPA/Hibernate, and Oracle for approximately
> 10,000 employees.

> Design server-side pagination, search, department filtering, and
> country filtering for an Angular frontend backed by a Spring Boot
> pageable REST endpoint.

> Design salary statistics without comparing monetary amounts across
> different currencies. Group statistics by country and currency and
> include minimum, average, maximum, employee count, and highest-paid
> employees.

> Review this Spring Boot exception handling and ensure validation,
> not-found, duplicate-record, and unexpected-error cases return
> appropriate HTTP status codes.

## Trade-offs

### Country + Currency

Chosen instead of currency conversion because conversion requires an
exchange-rate source, reference currency, and rate date. The assessment
does not require that complexity.

### Backend Aggregation

Statistics are calculated in the backend to keep business logic out of
Angular and reduce raw-data transfer.

### Authentication

Out of scope because the assessment focuses on employee/salary
management and engineering quality.

### Advanced Analytics

No fabricated salary trends or forecasts are shown when the underlying
requirements/data do not support them.
