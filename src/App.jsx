import AppRouter from "./routes/AppRouter";

import AuthInitializer from "@/features/auth/AuthInitializer";

function App() {
    return (
        <AuthInitializer>
            <AppRouter />
        </AuthInitializer>
    );
}

export default App;