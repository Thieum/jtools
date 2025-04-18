title: Inline JavaScript Calendar
keywords: Javascript, calendar, date, datetime, date picker, datetime picker, examples, inline javascript date picker.
description: Create nice applications with the jSuites inline javascript calendar picker.
canonical: https://jsuites.net/docs/v4/javascript-calendar/inline

{.white}
> A new version of the jSuites **JavaScript Calendar** plugin is available here.
> <br><br>
> [jSuites Calendar v5](/docs/javascript-calendar){.button .main target="_top"}

{.breadcrumb}
- [JavaScript Calendar](/docs/v4/javascript-calendar)
- Examples

# Inline JavaScript Calendar

## Inline mode

You can define the DOM element as a DIV to activate the calendar inline mode as below.  

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<p>Date: <strong id='calendar-value'>Click in the calendar to get a date</strong></p>
<div id='calendar'></div>

<script>
// Create a new calendar
jSuites.calendar(document.getElementById('calendar'), {
    format: 'YYYY-MM-DD',
    onupdate: function(a,b) {
        document.getElementById('calendar-value').innerText = b;
    }
});
</script>
</html>
```

