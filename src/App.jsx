import AppRouter from "./routes/AppRouter";

import AuthInitializer from "@/features/auth/AuthInitializer";
import ProfileInitializer from "@/features/profile/ProfileInitializer";

function App() {
    return (
        <AuthInitializer>
            <ProfileInitializer>
                <AppRouter />
            </ProfileInitializer>
        </AuthInitializer>
    );
}

export default App;