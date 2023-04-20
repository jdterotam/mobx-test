import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import { routes } from "./routes";
import { Suspense } from "react";

export default function AppRouter() {
  return (
    <Suspense fallback={<p>Loading....</p>}>
      <Routes>
        {routes.map(({ path, key, component, isPrivate }) => {
          const Component = component;
          return (
            <Route
              key={key}
              path={path}
              index
              element={
                isPrivate ? (
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}
