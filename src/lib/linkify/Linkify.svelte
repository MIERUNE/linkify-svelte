<script lang="ts">
	import { Options, type Opts, tokenize } from 'linkifyjs';
	import { type Snippet } from 'svelte';

	type Props = {
		text: string;
		options?: Omit<Opts, 'events'>;
		render?: Snippet<
			[
				{
					tagName: string;
					attributes: Record<string, string>;
					content: string;
				}
			]
		>;
	};

	let { text, options, render }: Props = $props();

	let opts = $derived(new Options(options));

	let tokens = $derived(tokenize(text));
</script>

{#each tokens as token (token)}
	{#if token.t === 'nl' && opts.get('nl2br')}
		<br />
	{:else if !token.isLink || !opts.check(token)}
		{token.toString()}
	{:else}
		{@const rendered = opts.render(token)}
		{#if render}
			{@render render(rendered)}
		{:else}
			<svelte:element this={rendered.tagName} {...rendered.attributes}>
				{rendered.content}
			</svelte:element>
		{/if}
	{/if}
{/each}
