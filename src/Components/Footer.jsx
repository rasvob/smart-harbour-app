const Footer = () => {
    return (
        <footer className='p-4 footer bg-transparent fixed bottom-0 footer-center'>
        <div>
            <p>Created by <a href='https://github.com/rasvob' rel="noreferrer" target="_blank" className='link-secondary'>Radek Svoboda</a>&<a href='https://github.com/petr-prokop' rel="noreferrer" target="_blank" className='link-secondary'>Petr Prokop</a> with React, FastAPI and PyTorch ✌️ <br/>Have you found a bug? Feel free to <a className='link-secondary' href='mailto:radek.svoboda@vsb.cz?subject=HyperFace Bug'>contact me</a>!</p>
        </div>
        </footer>
    );
};

export default Footer;