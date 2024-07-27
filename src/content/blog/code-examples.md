---
title: Code Examples
duration: 3min
date: 2024-07-25
toc: false
share: true
---

```ts
import { onMounted, onUnmounted, ref, watch } from 'vue'

export default defineAsyncComponent({
  async setup() {
    const counter = ref(0)

    watch(counter, () => console.log(counter.value))

    // OK!
    onMounted(() => console.log('Mounted'))

    // the await statement
    await someAsyncFunction() // <-----------

    // does NOT work!
    onUnmounted(() => console.log('Unmounted'))

    // still works, but does not auto-dispose
    // after the component is destroyed (memory leak!)
    watch(counter, () => console.log(counter.value * 2))
  },
})
```

## Syntax Highlighting

```js
console.log('This code is syntax highlighted!')
```

## Code editor frames

```js title="my-test-file.js"
console.log('Title attribute example')
```

```html
<!-- src/content/index.html -->
<div>File name comment example</div>
```

## Terminal frames

```bash
echo "This terminal frame has no title"
```

```powershell title="PowerShell terminal example"
Write-Output "This one has a title!"
```

## Marking full lines & line ranges

```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```

## Selecting line marker types (mark, ins, del)

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```

## Adding labels to line markers

```jsx {"1":5} del={"2":7-8} ins={"3":10-12}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

## Using diff-like syntax

```diff
+this line will be marked as inserted
-this line will be marked as deleted
this is a regular line
```

```diff
+ this line will be marked as inserted
- this line will be marked as deleted
  this is a regular line
```

## Plaintext search strings

```js "given text"
function demo() {
  // Mark any given text inside lines
  return 'Multiple matches of the given text are supported'
}
```

## Regular expressions

```ts /ye[sp]/
console.log('The words yes and yep will be marked.')
```

## Selecting inline marker types (mark, ins, del)

```js "return true;" ins="inserted" del="deleted"
function demo() {
  console.log('These are inserted and deleted marker types')
  // The return statement uses the default marker type
  return true
}
```

## Configuring word wrap per block

```js wrap
// Example with wrap
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

```js wrap=false
// Example with wrap=false
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

## Configuring indentation of wrapped lines

```js wrap preserveIndent
// Example with preserveIndent (enabled by default)
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

```js wrap preserveIndent=false
// Example with preserveIndent=false
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

## Collapsible sections

```js collapse={1-5, 12-14}
// All this boilerplate setup code will be collapsed
import { someBoilerplateEngine } from '@example/some-boilerplate'
import { evenMoreBoilerplate } from '@example/even-more-boilerplate'

const engine = someBoilerplateEngine(evenMoreBoilerplate())

// This part of the code will be visible by default
engine.doSomething(1, 2, 3, calcFn)

function calcFn() {
  // You can have multiple collapsed sections
  const a = 1
  const b = 2
  return a + b
}
```

## Line numbers

```js showLineNumbers
// This code block will show line numbers
console.log('Greetings from line 2!')
console.log('I am on line 3')
```

```js showLineNumbers=false
// Line numbers are disabled for this block
console.log('Hello?')
console.log('Sorry, do you know what line I am on?')
```
