import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Spin from "antd/lib/spin";

import PrivateRoute from "./PrivateRoute";

import { routes } from "./routes";

export default function AppRouter() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <Spin />
        </div>
      }
    >
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
