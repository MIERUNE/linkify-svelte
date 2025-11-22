<script lang="ts">
	import Linkify from 'linkify-svelte';
	import type { Opts } from 'linkifyjs';

	type Props = {
		text: string;
		options?: Omit<Opts, 'events'>;
	};

	let { text, options }: Props = $props();
</script>

<Linkify {text} {options}>
	{#snippet render({ tagName, attributes, content })}
		{#if tagName === 'a' && attributes.href?.startsWith('/users')}
			<span class="mention" data-href={attributes.href}>{content}</span>
		{:else}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={attributes.href}>{content}</a>
		{/if}
	{/snippet}
</Linkify>
