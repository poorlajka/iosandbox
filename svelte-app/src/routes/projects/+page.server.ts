import { redirect } from "@sveltejs/kit";

export const load = async ({ params, locals }) => {
    if (locals.user == undefined) {
        throw redirect(303, "/");
    }

    const projects = await locals.pb.collection("projects").getList(1, 50, {
        filter: `user="${locals.user.id}"`,
    });

    const project_names = projects.items.map((p) => [p.name, p.id]);
    return {
        project_names: project_names,
        user_name: locals.user?.username
    };
}

export const actions = {
    create_project: async ({ request, locals }) => {
        const formData = await request.formData();

        const project_name = formData.get("project_name");
        console.log(project_name)

        if (locals.user == undefined) {
            return;
        }

        const project = {
            name: project_name,
            project_data: {
                avail_device_id: 0,
                avail_processor_id: 0,
                connections: [],
                devices: [],
                processors: [],
            },
            user: locals.user?.id,
        };

        const record = await locals.pb.collection("projects").create(project);
        console.log(record);
    }
};