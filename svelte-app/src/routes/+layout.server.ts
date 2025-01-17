import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {

    if (locals.user) {
        return {
            user: locals.user,
        }
    }
    return {
        user: undefined,
    }
}