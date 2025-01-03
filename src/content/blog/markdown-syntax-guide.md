---
title: Markdown Syntax Guide
description: Presentation of basic Markdown syntax in Astro AntfuStyle Theme
pubDate: 2022-03-04
lastModDate: ''
toc: true
share: true
ogImage: true
---

The post shows how basic Markdown syntax is displayed in the [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) (modified from :link[rt2zz/markdown-sample.md]{link=https://gist.github.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee style=github}). You can refer to the [original Markdown file](https://github.com/lin-stephanie/astro-antfustyle-theme/blob/main/src/content/blog/markdown-syntax-guide.md) for comparison. If you want to learn MDX, visit the [MDX Docs](https://mdxjs.com/docs/).


## An h1 header

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists look like:

- this one
- that one
- the other one

Note that --- not considering the asterisk --- the actual text content starts at 4-columns in.

> Block quotes are written like so.
>
> They can span multiple paragraphs, if you like.

Use 3 dashes for an em-dash. (ex., "she was late—traffic was terrible").

Use 2 dashes for ranges (ex., "it's all in chapters 12--14").

Three dots … will be converted to an ellipsis.

Unicode is supported. 😊

### An h2 header

Here's a numbered list:

1. first item
2. second item
3. third item

Note again how the actual text starts at 4 columns in (4 characters from the left side). 

Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of indenting the block, you can use delimited blocks, if you like:

```
define foobar() {
    print "Welcome to flavor country!";
}
```

(which makes copying & pasting easier). 

#### An h3 header

Now a nested list:

1. First, get these ingredients:

    - carrots
    - celery
    - lentils

2. Boil some water.
3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including that last line which continues item 3 above).

Here's a link to [google](https://www.google.com/) and to a [section heading in the current doc](#an-h2-header).

Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

| size | material    | color       |
| ---- | ----------- | ----------- |
| 9    | leather     | brown       |
| 10   | hemp canvas | natural     |
| 11   | glass       | transparent |

A horizontal rule follows.

***

Here's a image can be specified like so:

![example image](/og-images/og-image.png "An exemplary image")

Inline math equations go in like so: $\omega = d\phi / dt$. 

Display math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.

Here’s a final look at how the inline code appears: `console.log("hello world!")`. 👋
