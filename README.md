# linkify-svelte

A Svelte 5 component wrapper for [LinkifyJS](https://linkify.js.org/) that automatically converts URLs, emails, and hashtags in your text into clickable links.

This library inspired by [linkify-react](https://linkify.js.org/docs/linkify-react.html)

## Installation

```bash
npm install linkify-svelte linkifyjs
# or
pnpm add linkify-svelte linkifyjs
bun add linkify-svelte linkifyjs
```

## Usage

### Basic Usage

```svelte
<script>
	import Linkify from 'linkify-svelte';
</script>

<Linkify text="Check out https://example.com or email us at hello@example.com" />
```

### With Options

You can pass [LinkifyJS options](https://linkify.js.org/docs/options.html) to customize behavior:

```svelte
<script>
	import Linkify from 'linkify-svelte';
</script>

<Linkify
	text="Visit https://example.com"
	options={{
		target: '_blank',
		rel: 'noopener noreferrer',
		className: 'my-link-class'
	}}
/>
```

### Custom Rendering

Use the `render` snippet for full control over link rendering:

```svelte
<script>
	import Linkify from 'linkify-svelte';
</script>

<Linkify text="Check out https://example.com">
	{#snippet render({ tagName, attributes, content })}
		<a {...attributes} class="custom-link">
			{content}
		</a>
	{/snippet}
</Linkify>
```

## Props

| Prop      | Type                   | Description                                |
| --------- | ---------------------- | ------------------------------------------ |
| `text`    | `string`               | The text to linkify                        |
| `options` | `Omit<Opts, 'events'>` | LinkifyJS options (optional)               |
| `render`  | `Snippet`              | Custom render snippet for links (optional) |

## Requirements

- Svelte 5.0.0+
- LinkifyJS 4.3.2+

## License

MIT
