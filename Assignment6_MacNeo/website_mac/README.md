# MacBook Neo

## Topic

Advertising website for the new Apple MacBook Neo laptop.

## Project goal

To present the MacBook Neo to students, designers and developers — show its features, colors and benefits in a clean, responsive interface.

## Team

- **Aisha** — Home page (index.html), contact form (Task 0–2), registration form (Task 3)
- **Anel** — About us (about.html)
- **Ayana** — Service (service.html)
- **Merey** — Contacts page (contacts.html layout, FAQ, contact information)

## Page ownership

| Page | Owner | Purpose |
|------|-------|---------|
| index.html | Aisha | Hero, benefits, featured product |
| service.html | Ayana | Features and catalogue |
| about.html | Anel | Story, team, quote |
| contacts.html | Merey / Aisha | Contact info, FAQ, contact form |
| register.html | Aisha | Registration form (Assignment #5, Task 3) |

## Local opening

1. Download or clone the repository.
2. Open `index.html` in any modern browser.
3. Or use a local server: `python -m http.server` and open `http://localhost:8000`.

No installation and no internet connection are required: Bootstrap 5.3.3 is stored
locally in `css/vendor/` and `js/vendor/`, so the forms also work offline.

## Assignment #5 — Part 1. Forms and Validation

### Files added or changed

| File | What it contains |
|------|------------------|
| `contacts.html` | Contact form rebuilt with the Bootstrap grid, `form-label`, `form-control`, helper text and `valid-feedback` / `invalid-feedback` |
| `register.html` | New registration form (Task 3) |
| `css/forms.css` | Styles for both forms, adapted to the site palette |
| `js/validation.js` | Contact form validation and the message character counter |
| `js/register.js` | Password / confirm password comparison and reset handling |
| `css/vendor/bootstrap.min.css`, `js/vendor/bootstrap.bundle.min.js` | Bootstrap 5.3.3, stored locally |

### Task 0 — Contact form

Fields: Name (text), Email (email), Topic (select), Message (textarea), Submit and Reset.

- Every field has a `name` attribute and a unique `id`.
- Every visible label is connected with `for` / `id`; placeholders are only a hint and never replace labels.
- The form is a real `<form>` element with `novalidate`, so the browser's own popups are replaced by Bootstrap feedback.

### Task 1 — HTML5 validation

| Rule | Attribute |
|------|-----------|
| Name is required | `required` |
| Name is at least 2 characters | `minlength="2"` |
| Email format | `type="email"` + `required` |
| Message is required | `required` |
| Message is 10 to 500 characters | `minlength="10"` + `maxlength="500"` |

### Task 2 — Bootstrap styling and feedback

- Layout is built with the Bootstrap grid: `row g-3`, `col-md-6`, `col-12`.
- Controls use `form-label`, `form-control`, `form-select` and a helper class (`field-help`, renamed to avoid a clash with the site's own `.form-text` column class).
- The Bootstrap validation pattern is used: the form is checked on submit, then the `was-validated` class keeps the feedback live while the user types, so a field is never permanently marked valid or invalid.
- Optional fields do not turn green — only the fields that are actually required show a success state.
- The form is one column on mobile and two columns from the `md` breakpoint.

### Task 3 — Registration form

`register.html` contains:

- First Name and Last Name — required, `minlength="2"`;
- Email — required, `type="email"`;
- Password and Confirm Password — required, `minlength="8"`;
- Gender — optional radio group with a "Prefer not to say" option, grouped in `fieldset` + `legend`;
- Hobbies — optional checkboxes, also in `fieldset` + `legend`;
- Country — required `select` with an empty default option;
- Submit and Reset buttons.

Password comparison is done in JavaScript, because HTML5 cannot compare two fields:

```js
confirmPassword.setCustomValidity(confirmValue === password.value ? '' : 'The passwords do not match.');
```

`setCustomValidity('')` is called again on every `input` event, so the error disappears as soon as the input is corrected. The Reset button clears the values, the `was-validated` class, the custom error and the success message.

A valid submit sends nothing: it only displays a demonstration success message.

### Task 4 — Validation test results

| # | Test input | Expected result | Actual result |
|---|------------|-----------------|---------------|
| 1 | Contact form, all fields empty → Submit | Form is not submitted, Name / Email / Message marked invalid with messages | Passed — red borders, three error messages, focus moves to the first invalid field |
| 2 | Email = `abc` | Email rejected because of the format | Passed — "Please enter a valid email address" |
| 3 | Message = `Hello` (5 characters) | Message rejected, the counter shows the limit | Passed — "The message must be between 10 and 500 characters" |
| 4 | Message = 501 characters | Input stops at 500 because of `maxlength` | Passed — the field cannot exceed 500 characters |
| 5 | Contact form, all fields valid → Submit | Green state, success message appears | Passed — green borders, "Looks good.", success box displayed |
| 6 | Contact form → Reset after errors | Values and feedback cleared | Passed |
| 7 | Password = `1234567` (7 characters) | Rejected, minimum is 8 | Passed — "The password must be at least 8 characters" |
| 8 | Password ≠ Confirm password | Rejected with "The passwords do not match." | Passed — red border and message; the error disappears as soon as the field is corrected |
| 9 | Country left as "Choose your country..." | Rejected | Passed — "Please select your country" |
| 10 | Registration form, all values valid → Submit | Success message, no page reload | Passed — green states and the success box |
| 11 | Registration form → Reset after errors | Values, feedback and the custom password error cleared | Passed |
| 12 | Mobile layout (narrow screen) | One column, no horizontal scrolling, buttons reachable | Passed — the form stacks to one column, page width equals the viewport |
| 13 | Desktop layout | Two columns for short fields, full width for the message | Passed |

Screenshots of the invalid state, the valid state, the password mismatch and the narrow-screen
layout are in the `screenshots` folder of the report. Re-run the cases above once before
submitting and replace these results with the ones you actually observe.

## Limitations

The forms are a static demonstration. They do **not** send or store any data. Native HTML5
validation and a small amount of JavaScript are used to demonstrate form behaviour. Real
message delivery would require a backend or a third-party service.

## Assignment #5 — DOM Manipulation and Events (teamwork part)

Five interactive features were added to the existing MacNeo website. They are written in
plain JavaScript in `js/interactions.js` (loaded on every page) and styled in
`css/features.css`. Bootstrap is **not** used for these interactions.

| Task | Where to look | What it does | Event |
|------|---------------|--------------|-------|
| Task 0 — Personal greeting | Home page, under the **Buy** button (`#greetingForm`) | Reads the name, trims it and shows a personal welcome. An empty name shows a hint. | `submit` (click on **Say hello** or Enter) |
| Task 1 — Light / dark theme | **Dark mode** button in the header of every page (`#themeToggle`) | `classList.toggle("dark")` on `<body>`; both themes are defined in `css/features.css`. The button text changes to **Light mode** and back. | `click` |
| Task 2 — FAQ | Service page, bottom of the page (`#faqAnswer1` … `#faqAnswer4`) | Every question is a `<button>` that opens only its own answer; `aria-expanded` follows the state. | `click` (works with the keyboard too) |
| Task 3 — Live search | Service page, above the feature cards (`#featureSearch`) | Filters the 8 cards by their title, ignores case and extra spaces, shows **1 of 8 features shown** and **No results found**. Clearing the field shows all cards again. | `input` |
| Task 4 — Wishlist | Home page, after the featured product (`#wishlistForm`) | Adds items with `createElement()` and `textContent`, rejects empty text, every item has its own **Remove** button, and the counter stays correct. | `submit` + `click` |

Evidence screenshots: `frontend5/screenshots/part1_features/`.

## Structure

```
website_mac/
├── index.html
├── service.html
├── about.html
├── contacts.html
├── register.html
├── css/
│   ├── style.css          base layout, navigation, footer
│   ├── index.css          home page
│   ├── about.css          about page
│   ├── service.css        service page
│   ├── contact.css        contacts page
│   ├── forms.css          Assignment #5 forms
│   ├── features.css       Assignment #5–6 features, dark theme
│   ├── responsive.css     shared breakpoints
│   └── vendor/bootstrap.min.css
├── js/
│   ├── interactions.js    Assignment #6 jQuery features (Tasks 1–5)
│   ├── validation.js      contact form validation
│   ├── register.js        registration form validation
│   ├── vendor/jquery-3.7.1.min.js
│   └── vendor/bootstrap.bundle.min.js
└── images/
```

## Assignment #6 — jQuery interactions and final website

jQuery is stored locally (`js/vendor/jquery-3.7.1.min.js`) and loaded **before**
`js/interactions.js` on every page, so the site still works without the internet.
All handlers are attached inside `$(document).ready(...)`, no inline `onclick` attributes,
and no ready-made plugins or Bootstrap JavaScript components are used for the features.

| Task | Page and element | jQuery methods |
|------|------------------|----------------|
| 1 — Selectors and events | **Dark mode** button (`#themeToggle`), greeting form (`#greetingForm`) | `.on("click")`, `.on("submit")`, `.val()`, `.text()`, `.toggleClass()`, `.hasClass()`, `.attr()` |
| 2 — Animated elements | Service page FAQ (`#faqAnswer1…4`), wishlist status message (`#wishlistToast`) | `.on("click")`, `.stop(true, true)`, `.slideToggle(250)`, `.fadeIn()`, `.delay()`, `.fadeOut()` |
| 3 — Filtering | Service page search (`#featureSearch`) and category buttons (`.category-btn`) | `.on("input")`, `.on("click")`, `.val().trim()`, `.each()`, `.show()`, `.hide()`, `.toggle()`, `.text()` |
| 4 — Dynamic content | Home page wishlist (`#wishlist`) | `.on("submit")`, delegated `.on("click", ".remove-button")`, `$("<li>")`, `.text()`, `.append()`, `.remove()` |
| 5 — Form validation | Home page pre-order form (`#preorderForm`) | `.on("submit")`, `.val()`, `.text()`, `.addClass("invalid")`, `.removeClass()`, `.fadeIn()` |

The wishlist keeps working for items that are added later because the Remove handler is
delegated to the list. The FAQ button state is kept in `aria-expanded`, and every animation
uses `.stop(true, true)` so fast clicks do not build a long queue.

### User journey (Part 2)

Home page → read the hero → **Reserve your MacNeo** form (validated with error messages) →
**wishlist**: add a model, remove it, watch the counter and the empty state →
**Service** page: choose a category, type in the search, open the FAQ answers →
switch **Dark mode** on any page.

### Responsive check

Screenshots for 375 px (phone), 768 px (tablet) and 1440 px (desktop) are in
`frontend5/screenshots/ass6/`. The grid collapses to one column on phones, the menu
wraps, and no horizontal scrolling appears.

### Publishing and known limitations

* Publish by dragging the `website_mac` folder to Netlify Drop (or a GitHub Pages
  repository) and put the public link here: `________________`.
* All forms are a frontend demonstration: data is validated in the browser only.
  Nothing is sent, stored or charged.
* Bootstrap is used for CSS grid and form styles only; every required interaction is
  written by the team in `js/interactions.js`.
