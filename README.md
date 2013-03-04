[![Build Status](https://travis-ci.org/nathan7/damka-changelog.png?branch=master)](https://travis-ci.org/nathan7/damka-changelog)

# damka-changelog
damka-changelog takes two state objects and logs messages.

State objects are objects of any of the following forms:
```javascript
{ '1.2.3.4': { http: <Error> } }
{ '1.2.3.4': <Error> }
<Error>
null
```

All possible state forms and their matching log messages are documented in [spec.js](https://github.com/nathan7/damka-changelog/blob/master/spec.js).

## damkaChangelog(log, oldSystemState, systemState)
log is expected to be an object with .info(message) and .error(message) methods.
