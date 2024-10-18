import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
    locals.pb.authStore.clear();
    locals.user = undefined;

    throw redirect(303, "/") 
}