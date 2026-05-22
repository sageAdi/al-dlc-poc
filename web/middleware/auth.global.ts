export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth();
  await auth.init();

  if (to.path === '/dashboard' && auth.status.value !== 'authenticated') {
    return navigateTo('/auth/signin');
  }
});
