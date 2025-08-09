import {defineStore} from 'pinia';

export const useStore = defineStore('authentication', {
		state: () => ({
				profile: null,
		}),
		
  actions: {
			
			setProfile(profile) {
				this.profile = profile;
			},
			//add *chagen
			updateLocalStorage(payload) {
				Object.entries(payload).forEach(([key, val]) => {
						if (val === null || val === false) {
							localStorage.removeItem(key);
						} else {
							localStorage.setItem(key, JSON.stringify(val));
						}
				});
			},
			async login (payload) {
				await $fetch("https://diverta-oshima.g.kuroco.app/rcms-api/13/login", {
						method: "POST",
						body: JSON.stringify(payload),
						baseURL: useRuntimeConfig().public.apiBase,
						credentials: "include",
				});	
				
				const profileRes = await $fetch("https://diverta-oshima.g.kuroco.app/rcms-api/13/profile", {
						baseURL: useRuntimeConfig().public.apiBase,
						credentials: "include",
				});
				this.setProfile(profileRes)
				this.updateLocalStorage({ authenticated: true })
			},
			
			async restoreLoginState() {
				const authenticated = localStorage.getItem("authenticated");
				const isAuthenticated = authenticated ? JSON.parse(authenticated) : false;
				if (!isAuthenticated) {
					throw new Error("need to login");
				}
				try {
					const profileRes = await $fetch("https://diverta-oshima.g.kuroco.app/rcms-api/13/profile", {
							baseURL: useRuntimeConfig().public.apiBase,
							credentials: "include",
					});
					this.setProfile(profileRes);
				} catch {
					throw new Error("need to login");
				}
			},
			
		},
		getters: {
			authenticated: (state) => state.profile !== null,
		},
});
