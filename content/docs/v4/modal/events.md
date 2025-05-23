title: Javascript Modal Events with Jsuites 4
keywords: Javascript modal plugin, responsive modal, popup modal, events
description: Learn how to use the events available on the jsuites javascript modal plugin.

{.white}
> A new version of the jSuites **JavaScript Modal** events page is available.
> <br><br>
> [JavaScript Modal Events](/docs/modal/events){.button .main target="_top"}

# Javascript modal events with Version 4

The following example loads a content from a remote URL and defines basic events to the modal

```html
<html>
<script src="https://jsuites.net/v4/jsuites.js"></script>
<link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

<div id='modal' title='Remote content'></div>

<input type='button' value='Click here to open the modal' class='plain' id="btn">

<script>
var modal = jSuites.modal(document.getElementById('modal'), {
    url: '/docs/content',
    width:'600px',
    height:'480px',
    closed:true,
    onclose:function() {
        console.log('Modal is closed');
    },
    onopen:function() {
        console.log('Modal is opened');
    },
});

btn.addEventListener('click', function() {
    modal.open()
})
</script>
</html>
```

