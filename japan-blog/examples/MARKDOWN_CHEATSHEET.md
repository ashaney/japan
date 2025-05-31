# Markdown Cheatsheet for JST Life Journal

This is a quick reference for writing your journal entries using Markdown/MDX formatting.

## Basic Formatting

### Headers

```markdown
# Main Title (H1)
## Section Title (H2)
### Sub-section (H3)
#### Minor section (H4)
```

### Text Styling

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
```

**Bold text**  
*Italic text*  
~~Strikethrough~~

### Lists

Unordered list:
```markdown
- Item 1
- Item 2
  - Nested item
```

- Item 1
- Item 2
  - Nested item

Ordered list:
```markdown
1. First item
2. Second item
3. Third item
```

1. First item
2. Second item
3. Third item

### Links

```markdown
[Link text](https://example.com)
```

[Link text](https://example.com)

## Images

### Using Images from the Web

```markdown
![Alt text](https://example.com/image.jpg)
```

### Using Local Images

Place your images in the `/public/images` directory, then reference them as:

```markdown
![Alt text](/images/your-image.jpg)
```

For better organization, you can create subdirectories:

```markdown
![Alt text](/images/tokyo/shibuya-crossing.jpg)
```

## Blockquotes

```markdown
> This is a blockquote. Great for memorable quotes or highlighting important thoughts.
```

> This is a blockquote. Great for memorable quotes or highlighting important thoughts.

## Code

Inline code: 
```markdown
`inline code`
```

`inline code`

Code block with syntax highlighting:
````markdown
```javascript
const greeting = "こんにちは!";
console.log(greeting);
```
````

```javascript
const greeting = "こんにちは!";
console.log(greeting);
```

## Tables

```markdown
| Name    | Location | Food          |
|---------|----------|---------------|
| Tokyo   | Kanto    | Monjayaki     |
| Osaka   | Kansai   | Takoyaki      |
| Sapporo | Hokkaido | Miso Ramen    |
```

| Name    | Location | Food          |
|---------|----------|---------------|
| Tokyo   | Kanto    | Monjayaki     |
| Osaka   | Kansai   | Takoyaki      |
| Sapporo | Hokkaido | Miso Ramen    |

## Horizontal Rule

```markdown
---
```

---

## Footnotes

```markdown
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.
```

## MDX Frontmatter

Each journal entry should include frontmatter at the top:

```markdown
---
title: "Your Entry Title"
date: "YYYY-MM-DD"
preview: "A short preview of your entry..."
tags: ["Tag1", "Tag2", "Tag3"]
---
```

Happy journaling!
