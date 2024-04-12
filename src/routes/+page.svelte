<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';

	const { data } = $props();

	const { form, errors, enhance } = superForm(data.form);
</script>

<div class="flex flex-col gap-4">
	<ol class="list-inside list-decimal">
		<li>Submit the form, it should focus on the error field (min value 2)</li>
		<li>Change the value to 2 and submit the form, no error and it should reset</li>
		<li>Change the value to 1</li>
		<li>Submit the form, it will show an error but it won't get focus again</li>
	</ol>

	<form method="POST" class="flex items-center gap-2" use:enhance>
		<span>$</span>
		<Input
			name="amount"
			type="number"
			class="w-[100px] {$errors.amount ? 'bg-red-200' : ''}"
			aria-invalid={$errors.amount ? 'true' : undefined}
			bind:value={$form.amount}
		/>
		<button class="rounded-md bg-green-400 p-2">Submit</button>
	</form>

	<p>
		Sometimes, blurring the input element before submitting is required to reproduce the problem.
	</p>

	<p>
		When debugging Superforms, it sometimes won't find the element (checking with <code
			>[aria-invalid="true"]</code
		>), other times it will, but it's like the element is removed from DOM before it can be focused.
	</p>
</div>
