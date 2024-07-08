import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Data/AuthStore';
import { getAccessToken, getCurrentUser } from '../../API/RestApi';
import toast from 'react-hot-toast';

const Loader = () => {
    return (
        <span className="loading loading-spinner"></span>
    );
};

export const LoginPage = () => {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [loginInProgress, setLoginInProgress] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginErrorMessage('')
        setLoginFailed(false);
        setLoginInProgress(true);
        const [success, data] = await getAccessToken(username, password);
        if (success) {
            setToken(data);
            const user = await getCurrentUser(data);
            
            if (user === null) {
                toast.error("Nepodařilo se načíst uživatele");
                setLoginFailed(true);
                setLoginErrorMessage(data);
                setLoginInProgress(false);
                return;
            }

            setCurrentUser(user);
            toast.success("Přihlášení proběhlo úspěšně");
            navigate('/');
        } else {
            toast.error(data);
            setLoginFailed(true);
            setLoginErrorMessage(data);
            setLoginInProgress(false);
        }
    };

    return (
        <div className="container mx-auto flex justify-center mt-2">
            <form onSubmit={handleSubmit}>
                <label className="form-control w-full max-w-sm">
                <div className="label">
                    <span className="label-text">Uživatelské jméno</span>
                </div>
                <input type="text" placeholder="Uživatelské jméno" className={`input input-bordered w-full ${loginFailed ? 'input-error' : ''}`} value={username} onChange={e => setUsername(e.target.value)} />
                </label>

                <label className="form-control w-full max-w-sm">
                <div className="label">
                    <span className="label-text">Heslo</span>
                </div>
                <input type="password" placeholder="Heslo" className={`input input-bordered w-full ${loginFailed ? 'input-error' : ''}`} value={password} onChange={e => setPassword(e.target.value)} />
                </label>

                <button className={`btn btn-success text-white mt-4 w-full ${loginInProgress ? 'btn-disabled' : ''}`} type="submit">
                {loginInProgress ? <Loader /> : ''}
                {loginInProgress ? '' : 'Přihlásit se'}
                </button>

                <label className="form-control max-w-sm">
                <div className="label">
                    <span className="label-text text-error">{loginErrorMessage}</span>
                </div>
                </label>
            </form>
        </div>
    );
}