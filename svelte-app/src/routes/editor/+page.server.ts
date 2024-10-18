export const load = async ({ params, locals, url }) => {
    let project_id = url.searchParams.get("project_id");
    const project = await locals.pb.collection("projects").getFirstListItem(
        `id="${project_id}"`
    );

    return {
        project_name: project.name,
        project_id: project.id,
        project_data: project.project_data,
    }
}
