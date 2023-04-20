import { observer } from "mobx-react-lite";

import AppRouter from "./routes/Router";
import PageLayout from "./components/common/PageLayout";
import { user } from "./store/User";

function App() {
  return user.profile.email ? (
    <PageLayout>
      <AppRouter />
    </PageLayout>
  ) : (
    <AppRouter />
  );
}

export default observer(App);
