# FBI Wanted API – Test URL Guide

This document provides a list of testable endpoints for a local NestJS API proxying the FBI Wanted API. Each URL demonstrates how to use various filters and parameters supported by the API.

---

## Pagination & Search
```txt
// Basic pagination
http://localhost:3000/api/wanted?page=1

// Pagination with search keyword
http://localhost:3000/api/wanted?page=2&title=ali
http://localhost:3000/api/wanted?page=1&title=murder
```

---

## Field Office Filters
```txt
// Filter by FBI field office
http://localhost:3000/api/wanted?field_offices=miami
http://localhost:3000/api/wanted?field_offices=newyork
http://localhost:3000/api/wanted?page=1&field_offices=losangeles&title=john
```

---

## Appearance Filters
```txt
// Hair color
http://localhost:3000/api/wanted?hair=black

// Eye color
http://localhost:3000/api/wanted?eyes=blue

// Race
http://localhost:3000/api/wanted?race=white

// Sex
http://localhost:3000/api/wanted?sex=male
http://localhost:3000/api/wanted?sex=female&race=black&hair=brown
```

---

## Nationality
```txt
http://localhost:3000/api/wanted?nationality=american
http://localhost:3000/api/wanted?nationality=iraqi
```

---

## Age Filters
```txt
http://localhost:3000/api/wanted?age_min=30&age_max=50
http://localhost:3000/api/wanted?age_min=20
```

---

## Status and Classification Filters
```txt
// Status
http://localhost:3000/api/wanted?status=captured
http://localhost:3000/api/wanted?status=escaped

// Poster type and classification
http://localhost:3000/api/wanted?poster_classification=wanted
http://localhost:3000/api/wanted?person_classification=main
```

---

## Combined Filters (Full example)
```txt
http://localhost:3000/api/wanted?page=1&title=terrorist&field_offices=miami&sex=male&hair=black&eyes=brown&race=white
```

---

## Usage
Paste any of the URLs into your browser or API client like Postman while your NestJS server is running at `localhost:3000`. These requests will be handled by your backend and forwarded to the FBI API with proper headers.

---

**Note:** Make sure your NestJS service includes a `User-Agent` header to avoid `403` errors from the FBI API.

---

For more filters or customization, refer to your `FBIQueryParams` interface and FBI data schema.
