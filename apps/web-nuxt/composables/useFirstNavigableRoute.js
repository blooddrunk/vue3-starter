import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useFirstNavigableMenu } from './useFirstNavigableMenu'; // make sure to import useFirstNavigableMenu

export const useFirstNavigableRoute = (routeName) => {
  const currentRoute = useRoute();
  const router = useRouter();

  watch(
    () => currentRoute.name,
    (value) => {
      if (!routeName || routeName === value) {
        const { targetRoute } = routeName
          ? useFirstNavigableMenu(routeName, {
              excludedRoutes: [value],
            })
          : useFirstNavigableMenu({
              excludedRoutes: [value],
            });

        if (targetRoute) {
          router.push(targetRoute);
        } else {
          console.warn(
            '[useFirstNavigableRoute] Failed to find any navigable route to redirect to' +
              (routeName ? `, source route '${routeName}'` : ''),
          );
        }
      }
    },
    { immediate: true },
  );
};
