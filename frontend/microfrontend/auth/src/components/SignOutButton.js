import '../index.css'

export default function SignOutButton() {
    function handleSignOut() {
        localStorage.removeItem("jwt");
        dispatchEvent(new CustomEvent("user-unlogged", {}));
    }
    return <button className="header__logout" onClick={handleSignOut}>Выйти</button>
}