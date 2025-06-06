import { supabase } from "./supabase";

export async function signInWithGoogle() {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: window.location.origin, // redirect obbligatorio per OAuth2
		}
	})
	if (error) {
		throw error
	}
}

export async function signOut() {
	const { error } = await supabase.auth.signOut({
		scope: "global"
	})

	if (error) {
		throw error
	}
}

export async function getName() {
	const { data: { user } } = await supabase.auth.getUser()
	if (user && user.user_metadata && user.user_metadata.full_name)
		return user.user_metadata.full_name as string;
	return "Accedi con Google"
}

export async function getId() {
	const { data: { user } } = await supabase.auth.getUser()
	if (user)
		return user.id as string;
	else
		return "";
}

export async function isLoggedIn() {
	const { data } = await supabase.auth.getSession()
	return !!data.session
}