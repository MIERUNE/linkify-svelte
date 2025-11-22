import Linkify from 'linkify-svelte';
import { reset } from 'linkifyjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

// Helper to remove Svelte comment nodes from innerHTML
function cleanHtml(html: string): string {
	return html.replace(/<!--.*?-->/g, '');
}

describe('linkify-svelte', () => {
	const tests: [string, string][] = [
		['Test with no links', 'Test with no links'],
		[
			'The URL is google.com and the email is test@example.com',
			'The URL is <a href="http://google.com">google.com</a> and the email is <a href="mailto:test@example.com">test@example.com</a>'
		],
		[
			'Super long maps URL https://www.google.ca/maps/@43.472082,-80.5426668,18z?hl=en, a #hash-tag, and an email: test.wut.yo@gmail.co.uk!\n',
			'Super long maps URL <a href="https://www.google.ca/maps/@43.472082,-80.5426668,18z?hl=en">https://www.google.ca/maps/@43.472082,-80.5426668,18z?hl=en</a>, a #hash-tag, and an email: <a href="mailto:test.wut.yo@gmail.co.uk">test.wut.yo@gmail.co.uk</a>!\n'
		],
		[
			'Link with @some.username\nshould not work as a link',
			'Link with @some.username\nshould not work as a link'
		]
	];

	it('Works with default options', () => {
		for (const [input, expected] of tests) {
			const { container } = render(Linkify, { text: input });
			expect(cleanHtml(container.innerHTML)).toBe(expected);
		}
	});

	it('Works with overridden options', () => {
		const options = {
			target: '_blank',
			rel: 'noopener noreferrer',
			className: 'my-linkify-class',
			defaultProtocol: 'https'
		};

		const { container } = render(Linkify, {
			text: 'Check out google.com',
			options
		});

		expect(cleanHtml(container.innerHTML)).toBe(
			'Check out <a href="https://google.com" class="my-linkify-class" target="_blank" rel="noopener noreferrer">google.com</a>'
		);
	});

	it('Renders with nl2br option', () => {
		const options = { nl2br: true };
		const { container } = render(Linkify, {
			text: 'Line 1\nLine 2\nhttps://example.com',
			options
		});

		expect(cleanHtml(container.innerHTML)).toBe(
			'Line 1<br>Line 2<br><a href="https://example.com">https://example.com</a>'
		);
	});

	it('Works with format option', () => {
		const options = {
			format: (value: string) => (value.length > 20 ? value.slice(0, 20) + '…' : value)
		};

		const { container } = render(Linkify, {
			text: 'Visit https://www.google.ca/maps/@43.472082,-80.5426668,18z',
			options
		});

		expect(cleanHtml(container.innerHTML)).toBe(
			'Visit <a href="https://www.google.ca/maps/@43.472082,-80.5426668,18z">https://www.google.c…</a>'
		);
	});

	it('Works with formatHref option', () => {
		const options = {
			formatHref: {
				email: (href: string) => href + '?subject=Hello%20from%20Linkify'
			}
		};

		const { container } = render(Linkify, {
			text: 'Contact us at test@example.com',
			options
		});

		expect(cleanHtml(container.innerHTML)).toBe(
			'Contact us at <a href="mailto:test@example.com?subject=Hello%20from%20Linkify">test@example.com</a>'
		);
	});

	it('Works with validate option', () => {
		const options = {
			validate: {
				url: (value: string) => /^https:/.test(value)
			}
		};

		const { container } = render(Linkify, {
			text: 'Only https://secure.com not http://insecure.com',
			options
		});

		expect(cleanHtml(container.innerHTML)).toBe(
			'Only <a href="https://secure.com">https://secure.com</a> not http://insecure.com'
		);
	});

	it('Works with truncate option', () => {
		const options = {
			truncate: 15
		};

		const { container } = render(Linkify, {
			text: 'Visit https://www.example.com/very/long/path',
			options
		});

		expect(cleanHtml(container.innerHTML)).toBe(
			'Visit <a href="https://www.example.com/very/long/path">https://www.exa…</a>'
		);
	});

	it('Handles multiple links in text', () => {
		const { container } = render(Linkify, {
			text: 'Contact support@example.com or visit example.com for help@test.org'
		});

		expect(cleanHtml(container.innerHTML)).toBe(
			'Contact <a href="mailto:support@example.com">support@example.com</a> or visit <a href="http://example.com">example.com</a> for <a href="mailto:help@test.org">help@test.org</a>'
		);
	});

	it('Handles text with no links', () => {
		const { container } = render(Linkify, { text: 'This is plain text with no links' });

		expect(cleanHtml(container.innerHTML)).toBe('This is plain text with no links');
	});

	it('Handles empty text', () => {
		const { container } = render(Linkify, { text: '' });

		expect(cleanHtml(container.innerHTML)).toBe('');
	});

	describe('Custom render', () => {
		beforeEach(() => {
			reset();
		});

		it('Renders with custom render snippet', async () => {
			await import('linkify-plugin-mention');

			const { default: LinkifyWithCustomRender } = await import(
				'./LinkifyCustomRender.test.svelte'
			);

			const { container } = render(LinkifyWithCustomRender, {
				text: 'Check out linkify.js.org or contact @nfrasser',
				options: {
					formatHref: {
						mention: (href: string) => `/users${href}`
					}
				}
			});

			expect(cleanHtml(container.innerHTML)).toBe(
				'Check out <a href="http://linkify.js.org">linkify.js.org</a> or contact <span class="mention" data-href="/users/nfrasser">@nfrasser</span>'
			);
		});
	});
});
