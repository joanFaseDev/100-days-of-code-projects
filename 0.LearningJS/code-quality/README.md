# Code quality

**Debugging** is the process of finding and fixing mistakes in a script.
Most modern browsers support debugging tools, a special UI dedicating to debugging.

A **breakpoint** is a point in code where the debugger will automatically pause the JavaScript execution.
**Conditional breakpoint** will only pause if a predefined expression (by the developer) return a truthy. That way, it's
possible to check for very specific conditions.
It's also possible to pause the code by using the **debugger** command in a script:

```javascript
console.log('Before debugger command'); // Will be executed.

debugger; // The browser's debugger will pause the execution here.

console.log('After debugger command'); // The user will have to unpause the execution for this statement to be executed. 

```
The debugger command will only works if the development tools are open. Otherwise the command will simply be ignored.

## Links
- [Chrome DevTools Manual](https://developers.google.com/web/tools/chrome-devtools.)