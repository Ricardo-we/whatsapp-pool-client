import { createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
// CSS
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "bootswatch/dist/journal/bootstrap.min.css";
// VIEWS
import Login from "./views/Login";
import { UserHomepage } from "./views/UserHomepage";
import Redirect from "./components/Redirect";
import Categories from "./views/Categories";
import MyAccount from "./views/MyAccount";
export const AppContext = createContext({});

function App() {
	const [storedUser, setStoredUser] = useLocalStorage("user");

	useEffect(() => {
		if (
			(!storedUser.id || !storedUser.auth_token) &&
			window.location.pathname !== "/"
		)
			window.location.href = "/";
		if (
			(storedUser.id || storedUser.auth_token) &&
			window.location.pathname === "/"
		)
			window.location.href = "/home";
	}, [storedUser]);

	return (
		<AppContext.Provider value={{ storedUser, setStoredUser }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/my-account" element={<MyAccount />} />
					<Route
						path="/logout"
						element={<Redirect logout to="/" />}
					/>
					<Route path="/home" element={<UserHomepage />} />
					<Route path="/categories" element={<Categories />} />
				</Routes>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
