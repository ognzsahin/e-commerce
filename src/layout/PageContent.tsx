import { Outlet } from "react-router-dom";

function PageContent() {
    return (
        <main className="flex-1">
            <Outlet />
        </main>
    );
}

export default PageContent;