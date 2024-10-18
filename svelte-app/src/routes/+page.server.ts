import { error, redirect } from "@sveltejs/kit";

type LoginData = {
    username: string,
    password: string,
};

export const load = ({ locals }) => {
    if (locals.user) {
        //throw redirect(303, "/projects");
    }
}

export const actions = {
    login: async ({ request, locals }) => {

        const formData = await request.formData();

        const login_data: LoginData = {
            username: formData.get("username")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
        }
        console.log(login_data)

        try {
            await locals.pb.collection("users").authWithPassword(login_data.username, login_data.password);
            /*
            if (!locals.pb?.authStore?.model?.verified) {
                locals.pb.authStore.clear();
                return {
                    username: login_data.username,
                    password: "",
                    failed_login: true,
                    failedSignup: false,
                }
            }
                */
        }
        catch (e) {
            console.log("Error: ", e);
            return {
                username: login_data.username,
                password: "",
                failedLogin: true,
                failed_login: true,
                failedSignup: false,
            }
        }

        throw redirect(303, "/projects")
    },
    register: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());

        const user = {
            "username": body.username,
            "email": body.email, 
            "emailVisibility": true,
            "password": body.password,
            "passwordConfirm": body.password,
            "name": body.username
        };
        const record = await locals.pb.collection("users").create(user);

        const login_data: LoginData = {
            username: body.username.toString(),
            password: body.password.toString(),
        }

        await locals.pb
            .collection("users")
            .authWithPassword(body.username.toString(), body.password.toString());

        try {
            await locals.pb.collection("users").authWithPassword(login_data.username, login_data.password);
            /*
            if (!locals.pb?.authStore?.model?.verified) {
                locals.pb.authStore.clear();
                return {
                    username: login_data.username,
                    password: "",
                    failed_login: true,
                    failedSignup: true,
                }
            }
                */
        }
        catch (e) {
            console.log("Error: ", e);
            return {
                username: login_data.username,
                password: "",
                failedLogin: true,
                failedSignup: true,
            }
        }

        throw redirect(303, "/projects")
    }
}
