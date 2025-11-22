<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>linkify-svelte - Svelte component for Linkify</title>
	<meta
		name="description"
		content="Svelte component for LinkifyJS - automatically convert URLs, emails, and more into clickable links"
	/>
</svelte:head>

<header class="bg-linear-to-r from-blue-600 to-indigo-700 text-white">
	<div class="mx-auto max-w-4xl px-4 py-16 text-center">
		<h1 class="mb-4 text-5xl font-bold">linkify-svelte</h1>
		<p class="mb-8 text-xl opacity-90">
			Svelte component for LinkifyJS - automatically convert URLs, emails, and more into clickable
			links
		</p>
		<div class="flex justify-center gap-4">
			<a
				href="https://github.com/mierune/linkify-svelte"
				class="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
			>
				GitHub
			</a>
			<a
				href="https://www.npmjs.com/package/linkify-svelte"
				class="rounded-lg border-2 border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-blue-600"
			>
				npm
			</a>
		</div>
	</div>
</header>

<main class="mx-auto prose max-w-4xl px-4 py-12 prose-slate">
	{@render children()}
</main>
