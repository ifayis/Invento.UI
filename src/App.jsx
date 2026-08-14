import AppRouter from "./routes/AppRouter";

import AuthInitializer from "@/features/auth/AuthInitializer";
import ProfileInitializer from "@/features/profile/ProfileInitializer";
import CompanyInitializer from "@/features/company/CompanyInitializer";

function App() {
    return (
        <AuthInitializer>
            <ProfileInitializer>
                <CompanyInitializer>
                    <AppRouter />
                </CompanyInitializer>
            </ProfileInitializer>
        </AuthInitializer>
    );
}

export default App;