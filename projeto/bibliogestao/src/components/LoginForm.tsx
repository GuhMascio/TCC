import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import logonova from '../assets/logonova.png';

function LoginForm() {
    return (
        <div 
            className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: "#1A335B" }}
        >
            <div className="text-center text-white mb-4">
                <img 
    src={logonova} 
    alt="Logo BiblioGestão" 
    style={{ width: "90px", marginBottom: "20px", borderRadius: "22px" }} 
/>
                
                <h1 className="fw-bold">BiblioGestão</h1>
                <p className="text-secondary" style={{ color: "#A0AEC0" }}>
                    Sistema de Controle de Acervo
                </p>
            </div>

            <div
                className="bg-light p-5 shadow-lg"
                style={{
                    width: "700px",
                    maxWidth: "95%",
                    borderRadius: "30px"
                }}
            >
                <h2 className="fw-bold mb-2">
                    Entrar na conta
                </h2>

                <p className="text-secondary mb-4">
                    Acesso exclusivo aos funcionários autorizados
                </p>

                <div className="mb-4">
                    <label className="form-label fw-semibold">
                        E-mail institucional
                    </label>
                    <input
                        type="email"
                        className="form-control form-control-lg rounded-4"
                        placeholder="seu@biblioteca.gov.br"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-semibold">
                        Senha
                    </label>
                    <input
                        type="password"
                        className="form-control form-control-lg rounded-4"
                        placeholder="Digite sua senha"
                    />
                </div>

                <button 
                    className="btn btn-lg w-100 rounded-4 text-white"
                    style={{ backgroundColor: "#1A335B" }}
                >
                    Entrar
                </button>

                <div className="text-center mt-3">
                    <a href="#" className="text-decoration-none text-secondary">
                        Esqueceu a senha?
                    </a>
                </div>
            </div>
        </div>
    );      
}

export default LoginForm;
