// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase from "pocketbase";

type User = {
	id: number,
	email: string,
	username: string,
};

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			user: User | undefined,
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { User };
