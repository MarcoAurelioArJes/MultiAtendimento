using AutoMapper;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Enums;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository;
using System.Net;

namespace MultiAtendimento.API.Services
{
    public class UsuarioService
    {
        private readonly IMapper _mapper;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IEmpresaRepository _empresaRepository;
        private readonly SetorService _setorService;
        private readonly IHttpContextAccessor _httpContext;

        public UsuarioService(IMapper mapper, IUsuarioRepository usuarioRepository, IEmpresaRepository empresaRepository, SetorService setorService, IHttpContextAccessor httpContext)
        {
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
            _empresaRepository = empresaRepository;
            _setorService = setorService;
            _httpContext = httpContext;
        }

        public void Criar(UsuarioInput usuarioInput)
        {
            LancarExcecaoCasoEmailJaExista(usuarioInput.Email);

            var usuario = _mapper.Map<Usuario>(usuarioInput);
            
            var cnpjEmpresa = _httpContext.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "empresaCnpj")?.Value;
            usuario.EmpresaCnpj = _empresaRepository.ObterEmpresaPorCnpj(cnpjEmpresa).Cnpj;
            
            var setor = _setorService.ObterPorId(usuarioInput.SetorId);
            usuario.SetorId = setor.Id;
            
            usuario.Senha = HashDeSenhaService.ObterSenhaHash(usuarioInput.Senha);
            _usuarioRepository.Criar(usuario);
        }
        
        public void CriarUsuarioNoCadastroEmpresa(UsuarioCadastroEmpresaInput usuarioInput)
        {
            LancarExcecaoCasoEmailJaExista(usuarioInput.Email);

            var usuario = _mapper.Map<Usuario>(usuarioInput);
            usuario.Senha = HashDeSenhaService.ObterSenhaHash(usuarioInput.Senha);

            _usuarioRepository.Criar(usuario);
        }

        public void Atualizar(int id, AtualizarUsuarioInput usuarioInput)
        {
            LancarExcecaoCasoEmailJaExista(usuarioInput.Email);

            var usuarioRegister = _usuarioRepository.ObterPorId(id);
            if (usuarioRegister is null)
                throw new BadHttpRequestException($"Usuário com ID {id} não encontrado", (int)HttpStatusCode.NotFound);
            if (usuarioRegister.AdministradorPrincipal && usuarioInput.Cargo != CargoEnum.ADMIN)
                throw new BadHttpRequestException($"Administrador principal não pode ter o cargo alterado", (int)HttpStatusCode.Forbidden);

            usuarioRegister.Nome = usuarioInput.Nome;
            usuarioRegister.Cargo = usuarioInput.Cargo;
            usuarioRegister.SetorId = usuarioInput.SetorId;

            _usuarioRepository.Atualizar(usuarioRegister);
        }

        public Usuario ObterPorId(int id)
        {
            var usuario = _usuarioRepository.ObterPorId(id);
            if (usuario is null)
                throw new BadHttpRequestException($"Usuário com ID {id} não encontrado", (int)HttpStatusCode.NotFound);
            return usuario;
        }

        public void LancarExcecaoCasoEmailJaExista(string email)
        {
            var usuario = _usuarioRepository.ObterPorEmail(email);
            if (usuario is not null)
                throw new BadHttpRequestException($"Email já cadastrado", (int)HttpStatusCode.BadRequest);
        }

        public Usuario ObterPorEmail(string email)
        {
            var usuario = _usuarioRepository.ObterPorEmail(email);
            if (usuario is null)
                throw new BadHttpRequestException($"Não há nenhum usuario associdado e esse email", (int)HttpStatusCode.NotFound);
            return usuario;
        }

        public List<Usuario> ObterTodosOsUsuariosPorCnpjDaEmpresa(string cnpj)
        {
            return _usuarioRepository.ObterTodosPorCnpjDaEmpresa(cnpj);
        }

        public EntrarView Entrar(EntrarInput entrarInput)
        {
            var usuario = _usuarioRepository.ObterPorEmail(entrarInput.Email);
            if (usuario != null && HashDeSenhaService.ObterSeASenhaEhValida(entrarInput.Senha, usuario.Senha))
                return TokenService.ObterInformacoesDoLogin(usuario);

            throw new BadHttpRequestException("As credenciais de acesso do usuário são inválidas", StatusCodes.Status401Unauthorized);
        }
    }
}
