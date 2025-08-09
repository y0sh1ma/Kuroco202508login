import { useStore } from '~/stores/authentication';

export default defineNuxtRouteMiddleware(async (to, from) => {
		const store = useStore();
		const publicPaths = ['/login'];
		
		if (publicPaths.some(path => to.path.startsWith(path))) {
			return;
		}
		if (!store.authenticated) {
			try {
				await store.restoreLoginState();
			} catch (err) {
				return navigateTo('/login');
			}
		}
});