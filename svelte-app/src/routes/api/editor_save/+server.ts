import { json } from "@sveltejs/kit";

export const POST = async ({ locals, request, cookies }) => {
    const project = await request.json();

    if (locals.user == undefined) {
        return json(project.project_data);
    }

    try {
        const data = {
            "name": project.project_name,
            "project_data": project.project_data,
            "user": locals.user.id, 
        };
        await locals.pb.collection("projects").update(project.project_id, data);
    }
    catch(e) {
        console.log(e);

    }

    return json(project.project_data);
} 