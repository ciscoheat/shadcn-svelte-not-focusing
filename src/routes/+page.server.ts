import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const schema = z.object({
	amount: z.number().min(2)
});

export const load = (async () => {
	return { form: await superValidate(zod(schema)) };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);
		if (!form.valid) return fail(400, { form });
		return { form };
	}
};
